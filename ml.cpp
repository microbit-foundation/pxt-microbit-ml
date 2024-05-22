#include "pxt.h"

// Hard coded for now.
enum class MlAction {
    wave,
    twist,
    still,
};

//% block="Machine Learning"
namespace machineLearningPoc {

  //% block="on|%NAME|action estimated"
  //% icon="\uf192" blockGap=8
  void onActionEstimated(MlAction action, Action body) {
    uBit.display.scroll("Shim works!");
  }
} // namespace machineLearningPoc