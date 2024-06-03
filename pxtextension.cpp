#include <pxt.h>
#include "mlrunner.h"
#include "mldataprocessor.h"
#include "example_model1.h"

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
    ErrorMemAlloc,
    ErrorModelInference,
    ErrorDataProcessing,
};

static bool initialised = false;

static const uint16_t ML_CODAL_TIMER_VALUE = 1;

// Enable/disable debug print to serial, can be set in pxt.json
#ifndef ML_DEBUG_PRINT
#define ML_DEBUG_PRINT 1
#endif
#if ML_DEBUG_PRINT
#define DEBUG_PRINT(...) uBit.serial.printf(__VA_ARGS__)
#else
#define DEBUG_PRINT(...)
#endif

namespace mlrunner {

    // Order is important for the outputData as set in:
    // https://github.com/microbit-foundation/ml-trainer/blob/v0.6.0/src/script/stores/mlStore.ts#L122-L131
    static const MlDataFilters_t mlDataFilters[] = {
        {1, filterMax},
        {1, filterMean},
        {1, filterMin},
        {1, filterStdDev},
        {1, filterPeaks},
        {1, filterTotalAcc},
        {1, filterZcr},
        {1, filterRms},
    };
    static const int mlDataFiltersLen = sizeof(mlDataFilters) / sizeof(mlDataFilters[0]);

    void runModel() {
        if (!initialised) return;

        float *modelData = mlDataProcessor.getProcessedData();
        if (modelData == NULL) {
            DEBUG_PRINT("Failed to processed data for the model\n");
            uBit.panic(MlRunnerError::ErrorDataProcessing);
        }
        ml_prediction_t* predictions = ml_predict(modelData);
        if (predictions == NULL) {
            DEBUG_PRINT("Failed to run model\n");
            uBit.panic(MlRunnerError::ErrorModelInference);
        }

        DEBUG_PRINT("Max prediction: %d %s\nPredictions: ",
                    predictions->max_index,
                    predictions->labels[predictions->max_index]);
        for (size_t i = 0; i < predictions->num_labels; i++) {
            DEBUG_PRINT(" %s[%d]",
                        predictions->labels[i],
                        (int)(predictions->predictions[i] * 100));
        }
        DEBUG_PRINT("\n\n");

        MicroBitEvent evt(MlRunnerIds::MlRunnerInference, predictions->max_index + 1);
    }

    void recordAccData(MicroBitEvent) {
        if (!initialised) return;

        const float accData[3] = {
            uBit.accelerometer.getX() / 1000.0f,
            uBit.accelerometer.getY() / 1000.0f,
            uBit.accelerometer.getZ() / 1000.0f,
        };
        MldpReturn_t recordDataResult = mlDataProcessor.recordAccData(accData, 3);
        if (recordDataResult != MLDP_SUCCESS) {
            DEBUG_PRINT("Failed to record accelerometer data\n");
            return;
        }

        if (mlDataProcessor.isDataReady()) {
            // Stop firing timer events while running model and resume after
            uBit.messageBus.ignore(MlRunnerIds::MlRunnerTimer, ML_CODAL_TIMER_VALUE, &recordAccData);
            runModel();
            uBit.messageBus.listen(MlRunnerIds::MlRunnerTimer, ML_CODAL_TIMER_VALUE, &recordAccData, MESSAGE_BUS_LISTENER_DROP_IF_BUSY);
        }
    }

    /*************************************************************************/
    /* Exported functions                                                    */
    /*************************************************************************/
    //% blockId=mlrunner_init
    void init(Buffer model_str) {
#if MICROBIT_CODAL != 1
        target_panic(PANIC_VARIANT_NOT_SUPPORTED);
#endif
        if (initialised) return;

#if DEVICE_MLRUNNER_USE_EXAMPLE_MODEL != 0
        DEBUG_PRINT("Using example model... ");
        void *model_address = (void *)example_model;
#else
        DEBUG_PRINT("Using embedded model...\n");
        if (model_str == NULL || model_str->length <= 0 || model_str->data == NULL) {
            DEBUG_PRINT("Model string not present\n");
            uBit.panic(MlRunnerError::ErrorModelNotPresent);
        }
        void *model_address = (void *)model_str->data;
#endif

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

        const MlDataProcessorConfig_t mlDataConfig = {
            .samples = samplesLen,
            .dimensions = sampleDimensions,
            .output_length = modelInputLen,
            .filter_size = mlDataFiltersLen,
            .filters = mlDataFilters,
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

        DEBUG_PRINT("\tModel loaded\n");
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

        // Stop timer event
        uBit.messageBus.ignore(MlRunnerIds::MlRunnerTimer, ML_CODAL_TIMER_VALUE, &recordAccData);
        uBit.timer.cancel(MlRunnerIds::MlRunnerTimer, ML_CODAL_TIMER_VALUE);

        // Clean up
        mlDataProcessor.deinit();
        initialised = false;

        DEBUG_PRINT("Done\n\n");
    }

    //% blockId=mlrunner_is_running
    bool isModelRunning() {
        return initialised;
    }
}
