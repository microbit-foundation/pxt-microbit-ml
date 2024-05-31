/**
 * @brief Data Processor for the Model Example included in mlrunner.
 *
 * @copyright
 * Copyright 2024 Micro:bit Educational Foundation.
 * SPDX-License-Identifier: MIT
 *
 * TODO: Need to double buffer this so that a model can be run while the
 * next data is being collected.
 */
#include "mlrunner/mldataprocessor.h"

#if DEVICE_MLRUNNER_USE_EXAMPLE_MODEL != 2

// To represent the accelerometer data x, y, z
static const int DATA_AXIS = 3;

// Order is important for the outputData as set in:
// https://github.com/microbit-foundation/ml-trainer/blob/v0.6.0/src/script/stores/mlStore.ts#L122-L131
static float (*filters[])(float*, int) = {
    filterMax,
    filterMean,
    filterMin,
    filterStdDev,
    filterPeaks,
    filterTotalAcc,
    filterZcr,
    filterRms,
};

static float *accDataX;
static float *accDataY;
static float *accDataZ;
static float *outputData;
static int filterSize;
static int accSamples;
static int accDataIndex;
static bool initialised = false;

bool pxtDataProcessor_init(int samples) {
    initialised = false;
    accDataX = (float*)malloc(samples * sizeof(float));
    if (accDataX == NULL) {
        return false;
    }
    accDataY = (float*)malloc(samples * sizeof(float));
    if (accDataY == NULL) {
        free(accDataX);
        return false;
    }
    accDataZ = (float*)malloc(samples * sizeof(float));
    if (accDataZ == NULL) {
        free(accDataX);
        free(accDataY);
        return false;
    }
    accSamples = samples;
    accDataIndex = 0;
    filterSize = sizeof(filters) / sizeof(filters[0]);
    outputData = (float*)malloc(filterSize * DATA_AXIS * sizeof(float));
    if (outputData == NULL) {
        free(accDataX);
        free(accDataY);
        free(accDataZ);
        return false;
    }
    initialised = true;
    return true;
}

void pxtDataProcessor_deinit() {
    free(accDataX);
    free(accDataY);
    free(accDataZ);
    free(outputData);
}

void pxtDataProcessor_recordAccData(int x, int y, int z) {
    if (!initialised) return;

    accDataX[accDataIndex] = x / 1000.0f;
    accDataY[accDataIndex] = y / 1000.0f;
    accDataZ[accDataIndex] = z / 1000.0f;
    accDataIndex++;
    if (accDataIndex >= accSamples) {
        accDataIndex = 0;
    }
}

bool pxtDataProcessor_isDataReady() {
    if (!initialised) return false;

    return accDataIndex == 0;
}

float* pxtDataProcessor_getModelInputData() {
    if (!initialised) return NULL;

    // Apply all filter to outputData
    for (int i = 0; i < filterSize; i++) {
        outputData[i*DATA_AXIS + 0] = filters[i](accDataX, accSamples);
        outputData[i*DATA_AXIS + 1] = filters[i](accDataY, accSamples);
        outputData[i*DATA_AXIS + 2] = filters[i](accDataZ, accSamples);
    }
    return outputData;
}

MlDataProcessor_t mlDataProcessor = {
    .init = pxtDataProcessor_init,
    .deinit = pxtDataProcessor_deinit,
    .recordAccData = pxtDataProcessor_recordAccData,
    .isDataReady = pxtDataProcessor_isDataReady,
    .getModelInputData = pxtDataProcessor_getModelInputData
};

#endif // DEVICE_MLRUNNER_USE_EXAMPLE_MODEL