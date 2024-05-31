input.onButtonPressed(Button.A, function () {
  basic.clearScreen();
});
input.onButtonPressed(Button.B, function () {
  if (mlrunner.isRunning()) {
    mlrunner.stopRunning();
  } else {
    mlrunner.startRunning();
  }
});
mlrunner.onMlEvent(MlRunnerLabels.Shake, function () {
  basic.showString("S");
});
mlrunner.onMlEvent(MlRunnerLabels.Still, function () {
  basic.showIcon(IconNames.Asleep);
});
mlrunner.onMlEvent(MlRunnerLabels.Circle, function () {
  basic.showString("C");
});
basic.forever(function () {});
