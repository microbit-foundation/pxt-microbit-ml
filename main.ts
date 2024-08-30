let timeStill = 0;
input.onButtonPressed(Button.A, function () {
  basic.clearScreen();
  serial.writeLine("Total time still: " + timeStill + "\n");
});
input.onButtonPressed(Button.B, function () {
  basic.clearScreen();
  serial.writeLine(
    "Probability of shake: " + ml.getCertainty(ml.event.Shake) + "\n"
  );
});
ml.onStart(ml.event.Shake, function () {
  basic.showString("S");
});
ml.onStart(ml.event.Still, function () {
  basic.showIcon(IconNames.Asleep);
});
ml.onStart(ml.event.DrawCircle, function () {
  basic.showString("C");
});
ml.onStart(ml.event.Unknown, function () {
  basic.clearScreen();
});
ml.onStop(ml.event.Still, function (duration) {
  timeStill += duration;
});
basic.forever(function () {
  serial.writeLine("Is Shake: " + ml.isDetected(ml.event.Shake) + "\n");
  basic.pause(10000);
});
