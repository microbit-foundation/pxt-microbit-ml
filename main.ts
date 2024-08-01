let timeStill = 0;
input.onButtonPressed(Button.A, function () {
  basic.clearScreen();
  serial.writeLine("Total time still: " + timeStill + "\n");
});
ml.onDetected(ml.action.Shake, function () {
  basic.showString("S");
});
ml.onDetected(ml.action.Still, function () {
  basic.showIcon(IconNames.Asleep);
});
ml.onDetected(ml.action.DrawCircle, function () {
  basic.showString("C");
});
ml.onDetected(ml.action.Unknown, function () {
  basic.clearScreen();
});
ml.onDetectedEnd(ml.action.Still, function (detectionDuration) {
  timeStill += detectionDuration;
});
basic.forever(function () {
  serial.writeLine("Is Shake: " + ml.isDetected(ml.action.Shake) + "\n");
  basic.pause(10000);
});
