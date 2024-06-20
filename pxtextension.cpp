#include <pxt.h>
#include "mlrunner.h"
#include "mldataprocessor.h"

enum MlRunnerIds {
    MlRunnerInference = 71,
    MlRunnerTimer = 72,
};

enum MlRunnerError {
    ErrorModelNotPresent = 800,
    ErrorSamplesLength,
    ErrorSamplesDimension,
    ErrorSamplesPeriod,
    ErrorInputLength,
    ErrorOutputLength,
    ErrorArenaSize,
    ErrorActions,
    ErrorMemAlloc,
    ErrorModelInference,
    ErrorDataProcessing,
};

// Enable/disable debug print to serial, can be set in pxt.json
#ifndef ML_DEBUG_PRINT
#define ML_DEBUG_PRINT 0
#endif
#if ML_DEBUG_PRINT
#define DEBUG_PRINT(...) uBit.serial.printf(__VA_ARGS__)
#else
#define DEBUG_PRINT(...)
#endif

// Configure the period between ML runs, can be set in pxt.json
#ifndef ML_INFERENCE_PERIOD_MS
#define ML_INFERENCE_PERIOD_MS 250
#endif

// Configure the default flags for the model event listeners, can be set in pxt.json
#ifndef ML_EVENT_LISTENER_DEFAULT_FLAGS
#define ML_EVENT_LISTENER_DEFAULT_FLAGS MESSAGE_BUS_LISTENER_DROP_IF_BUSY
#endif

namespace mlrunner {

    static const uint16_t ML_CODAL_TIMER_VALUE = 1;
    static const int ML_EVENT_NONE_ID = 1;

    static bool initialised = false;
    static int mlSampleCountsPerInference = 0;
    static int lastPredictionEventId = -1;
    static ml_actions_t *actions = NULL;
    static ml_predictions_t *predictions = NULL;

    // Order is important for the outputData as set in:
    // https://github.com/microbit-foundation/ml-trainer/blob/v0.6.0/src/script/stores/mlStore.ts#L122-L131
    static const MlDataFilters_t mlTrainerDataFilters[] = {
        {1, filterMax},
        {1, filterMean},
        {1, filterMin},
        {1, filterStdDev},
        {1, filterPeaks},
        {1, filterTotalAcc},
        {1, filterZcr},
        {1, filterRms},
    };
    static const int mlTrainerDataFiltersLen = sizeof(mlTrainerDataFilters) / sizeof(mlTrainerDataFilters[0]);

    void runModel() {
        if (!initialised) return;
        unsigned int time_start = uBit.systemTime();

        float *modelData = mlDataProcessor.getProcessedData();
        if (modelData == NULL) {
            DEBUG_PRINT("Failed to processed data for the model\n");
            uBit.panic(MlRunnerError::ErrorDataProcessing);
        }

        bool success = ml_predict(
            modelData, mlDataProcessor.getProcessedDataSize(), actions, predictions);
        if (!success) {
            DEBUG_PRINT("Failed to run model\n");
            uBit.panic(MlRunnerError::ErrorModelInference);
        }

        DEBUG_PRINT("Prediction (%d ms): ", uBit.systemTime() - time_start);
        if (predictions->index >= 0) {
            DEBUG_PRINT("%d - %s\n",
                        predictions->index,
                        actions->action[predictions->index].label);
        } else {
            DEBUG_PRINT("None\n");
        }
        DEBUG_PRINT("\tIndividual:");
        for (size_t i = 0; i < actions->len; i++) {
            DEBUG_PRINT(" %s[%d]",
                        actions->action[i].label,
                        (int)(predictions->prediction[i] * 100));
        }
        DEBUG_PRINT("\n\n");

        // Model prediction events start after the None event ID
        uint16_t predictionEventId = predictions->index + ML_EVENT_NONE_ID + 1;
        lastPredictionEventId = predictionEventId;
        MicroBitEvent evt(MlRunnerIds::MlRunnerInference, predictionEventId);
    }

    void recordAccData(MicroBitEvent) {
        if (!initialised) return;

        const Sample3D accSample = uBit.accelerometer.getSample();
        const float accData[3] = {
            accSample.x / 1000.0f,
            accSample.y / 1000.0f,
            accSample.z / 1000.0f,
        };
        MldpReturn_t recordDataResult = mlDataProcessor.recordData(accData, 3);
        if (recordDataResult != MLDP_SUCCESS) {
            DEBUG_PRINT("Failed to record accelerometer data\n");
            return;
        }

        // Run model every mlSampleCountsPerInference number of samples
        static unsigned int samplesTaken = 0;
        if (!(++samplesTaken % mlSampleCountsPerInference) && mlDataProcessor.isDataReady()) {
            runModel();
        }
    }

    /**
     * Execute a function from TypeScript land.
     *
     * @param e The event data is ignored 
     * @param action TypeScript function to run without any arguments.
     */
    void runHandler(MicroBitEvent e, void *action) {
        runAction0((Action)action);
    }

    /*************************************************************************/
    /* TypeScript exported functions                                         */
    /*************************************************************************/
    /**
     * Register a TypeScript function to run when an event is raised.
     *
     * This custom version of the MakeCode onEvent function is needed due to:
     * https://github.com/microsoft/pxt-microbit/issues/5709
     * 
     * @param src The ID of the component to listen to.
     * @param value The event value to listen to from that component.
     * @param handler The function to call when the event is detected.
     * @param flags The specified event flags are ignored and configured via
     *              pxt.json.
     */
    //%
    void customOnEvent(int src, int value, Action handler, int flags = 0) {
        uBit.messageBus.ignore(src, value, runHandler);
        uBit.messageBus.listen(src, value, runHandler, handler, ML_EVENT_LISTENER_DEFAULT_FLAGS);
        pxt::incr(handler);
        pxt::registerGCPtr(handler);
    }

    //% blockId=mlrunner_init
    void init(Buffer model_str) {
#if MICROBIT_CODAL != 1
        target_panic(PANIC_VARIANT_NOT_SUPPORTED);
#endif
        if (initialised) return;

        DEBUG_PRINT("Using embedded model...\n");
        if (model_str == NULL || model_str->length <= 0 || model_str->data == NULL) {
            DEBUG_PRINT("Model string not present\n");
            uBit.panic(MlRunnerError::ErrorModelNotPresent);
        }
        void *model_address = (void *)model_str->data;

        const bool setModelSuccess = ml_setModel(model_address);
        if (!setModelSuccess) {
            DEBUG_PRINT("Model magic invalid\n");
            uBit.panic(MlRunnerError::ErrorModelNotPresent);
        }

        const int samplesLen = ml_getSamplesLength();
        DEBUG_PRINT("\tModel samples length: %d\n", samplesLen);
        if (samplesLen <= 0) {
            DEBUG_PRINT("Model samples length invalid\n");
            uBit.panic(MlRunnerError::ErrorSamplesLength);
        }

        const int sampleDimensions = ml_getSampleDimensions();
        DEBUG_PRINT("\tModel sample dimensions: %d\n", sampleDimensions);
        if (sampleDimensions != 3) {
            DEBUG_PRINT("Model sample dimensions invalid\n");
            uBit.panic(MlRunnerError::ErrorSamplesDimension);
        }

        const int samplesPeriodMillisec = ml_getSamplesPeriod();
        DEBUG_PRINT("\tModel samples period: %d ms\n", samplesPeriodMillisec);
        if (samplesPeriodMillisec <= 0) {
            DEBUG_PRINT("Model samples period invalid\n");
            uBit.panic(MlRunnerError::ErrorSamplesPeriod);
        }

        const int modelInputLen = ml_getInputLength();
        DEBUG_PRINT("\tModel input length: %d\n", modelInputLen);
        if (modelInputLen <= 0) {
            DEBUG_PRINT("Model input length invalid\n");
            uBit.panic(MlRunnerError::ErrorInputLength);
        }

        const int modelOutputLen = ml_getOutputLength();
        DEBUG_PRINT("\tModel output length: %d\n", modelOutputLen);
        if (modelOutputLen <= 0) {
            DEBUG_PRINT("Model output length invalid\n");
            uBit.panic(MlRunnerError::ErrorOutputLength);
        }

        const int modelArenaSize = ml_getArenaSize();
        DEBUG_PRINT("\tModel arena size: %d bytes\n", modelArenaSize);
        if (modelArenaSize <= 0) {
            DEBUG_PRINT("Model arena size length invalid\n");
            uBit.panic(MlRunnerError::ErrorArenaSize);
        }

        mlSampleCountsPerInference = ML_INFERENCE_PERIOD_MS / samplesPeriodMillisec;
        DEBUG_PRINT("\tModel inference period: %d ms\n", ML_INFERENCE_PERIOD_MS);

        if (actions != NULL) {
            free(actions);
        }
        actions = ml_allocateActions();
        if (actions == NULL) {
            DEBUG_PRINT("Failed to allocate memory for actions\n");
            uBit.panic(MlRunnerError::ErrorMemAlloc);
        }
        const bool actionsSuccess = ml_getActions(actions);
        if (!actionsSuccess) {
            DEBUG_PRINT("Failed to retrieve actions\n");
            uBit.panic(MlRunnerError::ErrorActions);
        }
        DEBUG_PRINT("\tActions (%d):\n", actions->len);
        for (size_t i = 0; i < actions->len; i++) {
            DEBUG_PRINT("\t\tAction '%s' ", actions->action[i].label);
            DEBUG_PRINT("threshold = %d %%\n", (int)(actions->action[i].threshold * 100));
        }

        predictions = ml_allocatePredictions();
        if (predictions == NULL) {
            DEBUG_PRINT("Failed to allocate memory for predictions\n");
            uBit.panic(MlRunnerError::ErrorMemAlloc);
        }

        const MlDataProcessorConfig_t mlDataConfig = {
            .samples = samplesLen,
            .dimensions = sampleDimensions,
            .output_length = modelInputLen,
            .filter_size = mlTrainerDataFiltersLen,
            .filters = mlTrainerDataFilters,
        };
        MldpReturn_t mlInitResult = mlDataProcessor.init(&mlDataConfig);
        if (mlInitResult != MLDP_SUCCESS) {
            DEBUG_PRINT("Failed to initialise ML data processor (%d)\n", mlInitResult);
            // TODO: Check error type and set panic value accordingly
            uBit.panic(MlRunnerError::ErrorMemAlloc);
        }

        // Set up background timer to collect data and run model
        uBit.messageBus.listen(MlRunnerIds::MlRunnerTimer, ML_CODAL_TIMER_VALUE, &recordAccData, MESSAGE_BUS_LISTENER_DROP_IF_BUSY);
        uBit.timer.eventEvery(samplesPeriodMillisec, MlRunnerIds::MlRunnerTimer, ML_CODAL_TIMER_VALUE);

        initialised = true;

        DEBUG_PRINT("\tModel loaded\n\n");
    }

    //% blockId=mlrunner_stop_model_running
    void deinit() {
#if MICROBIT_CODAL != 1
        target_panic(PANIC_VARIANT_NOT_SUPPORTED);
#endif
        if (!initialised) {
            DEBUG_PRINT("Attempting to stop running ML, but was already stopped.\n");
            return;
        }
        DEBUG_PRINT("Stop running the ML model... ");

        initialised = false;

        // Stop timer event
        uBit.messageBus.ignore(MlRunnerIds::MlRunnerTimer, ML_CODAL_TIMER_VALUE, &recordAccData);
        uBit.timer.cancel(MlRunnerIds::MlRunnerTimer, ML_CODAL_TIMER_VALUE);

        // Clean up
        mlDataProcessor.deinit();
        free(actions);
        free(predictions);
        mlSampleCountsPerInference = 0;
        lastPredictionEventId = -1;

        DEBUG_PRINT("Done\n\n");
    }

    //% blockId=mlrunner_is_running
    bool isModelRunning() {
        return initialised;
    }

    //%
    int currentEventId() {
        if (lastPredictionEventId == -1) {
            return ML_EVENT_NONE_ID;
        }
        return lastPredictionEventId;
    }
}
