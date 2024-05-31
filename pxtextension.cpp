#include <pxt.h>
#include "mlrunner/mlrunner.h"
#include "mlrunner/mldataprocessor.h"
#include "mlrunner/example_model1.h"

enum MlRunnerIds {
    MlRunnerInference = 71,
    MlRunnerTimer = 72,
};

enum MlRunnerError {
    ErrorModelNotPresent = 800,
    ErrorInputLength = 801,
    ErrorMemAlloc = 802,
    ErrorModelInference = 803,
};

static bool initialised = false;

static const CODAL_TIMESTAMP ML_CODAL_TIMER_PERIOD = 25;
static const uint16_t ML_CODAL_TIMER_VALUE = 1;

// Enable/disable debug print to serial, can be set in pxt.json
#ifndef ML_DEBUG_PRINT
#define ML_DEBUG_PRINT 0
#endif
#if ML_DEBUG_PRINT
#define DEBUG_PRINT(...) uBit.serial.printf(__VA_ARGS__)
#else
#define DEBUG_PRINT(...)
#endif

namespace mlrunner {

    void runModel() {
        if (!initialised) return;

        ml_prediction_t* predictions = ml_predict(mlDataProcessor.getModelInputData());
        if (predictions == NULL) {
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

        mlDataProcessor.recordAccData(
            uBit.accelerometer.getX(), uBit.accelerometer.getY(), uBit.accelerometer.getZ());

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

        const int inputLen = ml_getInputLength();
        if (inputLen <= 0) {
            DEBUG_PRINT("Model input length invalid\n");
            uBit.panic(MlRunnerError::ErrorInputLength);
        }
        if (inputLen % 3 != 0) {
            DEBUG_PRINT("Model input length not divisible by 3\n");
            uBit.panic(MlRunnerError::ErrorInputLength);
        }
        DEBUG_PRINT("\tModel input length: %d\n", inputLen);

        bool success = mlDataProcessor.init(inputLen / 3);
        if (!success) {
            uBit.panic(MlRunnerError::ErrorMemAlloc);
        }

        // Set up background timer to collect data and run model
        uBit.messageBus.listen(MlRunnerIds::MlRunnerTimer, ML_CODAL_TIMER_VALUE, &recordAccData, MESSAGE_BUS_LISTENER_DROP_IF_BUSY);
        uBit.timer.eventEvery(ML_CODAL_TIMER_PERIOD, MlRunnerIds::MlRunnerTimer, ML_CODAL_TIMER_VALUE);

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