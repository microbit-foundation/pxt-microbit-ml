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
static const int filterSize = sizeof(filters) / sizeof(filters[0]);


static float **input_samples = NULL;
static int sample_dimensions = 0;
static int sample_length = 0;
static int sample_index = 0;
static float *output_data = NULL;
static bool initialised = false;


static bool pxtDataProcessor_init(const int samples, const int dimensions, const int output_length);
static void pxtDataProcessor_deinit();
static bool pxtDataProcessor_recordAccData(const float *sample, const int sample_dimensions);
static bool pxtDataProcessor_isDataReady();
static float* pxtDataProcessor_getModelInputData();


bool pxtDataProcessor_init(const int samples, const int dimensions, const int output_length) {
    if (samples <= 0 || dimensions <= 0 || output_length <= 0) {
        pxtDataProcessor_deinit();
        return false;
    }
    if (output_length != (filterSize * dimensions)) {
        pxtDataProcessor_deinit();
        return false;
    }

    if (initialised) {
        pxtDataProcessor_deinit();
    }

    input_samples = (float**)malloc(dimensions * sizeof(float*));
    if (input_samples == NULL) {
        pxtDataProcessor_deinit();
        return false;
    }
    for (int i = 0; i < dimensions; i++) {
        input_samples[i] = (float*)malloc(samples * sizeof(float));
        if (input_samples[i] == NULL) {
            pxtDataProcessor_deinit();
            return false;
        }
    }
    output_data = (float*)malloc(output_length * sizeof(float));
    if (output_data == NULL) {
        pxtDataProcessor_deinit();
        return false;
    }
    sample_dimensions = dimensions;
    sample_length = samples;
    sample_index = 0;
    initialised = true;
    return true;
}

void pxtDataProcessor_deinit() {
    initialised = false;
    for (int i = 0; i < sample_dimensions; i++) {
        free(input_samples[i]);
    }
    free(input_samples);
    free(output_data);
    input_samples = NULL;
    output_data = NULL;
    sample_dimensions = 0;
    sample_length = 0;
    sample_index = 0;
}

bool pxtDataProcessor_recordAccData(const float* sample, const int dimensions) {
    if (!initialised) return false;
    if (sample_dimensions != dimensions) return false;

    for (int i = 0; i < sample_dimensions; i++) {
        input_samples[i][sample_index] = sample[i];
    }
    sample_index++;
    if (sample_index >= sample_length) {
        sample_index = 0;
    }
    return true;
}

bool pxtDataProcessor_isDataReady() {
    if (!initialised) return false;

    return sample_index == 0;
}

float* pxtDataProcessor_getModelInputData() {
    if (!initialised) return NULL;

    // Run all filters and save their output to output_data
    for (int i = 0; i < filterSize; i++) {
        for (int j = 0; j < sample_dimensions; j++) {
            output_data[i*sample_dimensions + j] = filters[i](input_samples[j], sample_length);
        }
    }
    return output_data;
}

MlDataProcessor_t mlDataProcessor = {
    .init = pxtDataProcessor_init,
    .deinit = pxtDataProcessor_deinit,
    .recordAccData = pxtDataProcessor_recordAccData,
    .isDataReady = pxtDataProcessor_isDataReady,
    .getModelInputData = pxtDataProcessor_getModelInputData
};

#endif // DEVICE_MLRUNNER_USE_EXAMPLE_MODEL
