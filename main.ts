let timeStill = 0;
input.onButtonPressed(Button.A, function () {
  basic.clearScreen();
  serial.writeLine("Total time still: " + timeStill + "\n");
});
input.onButtonPressed(Button.B, function () {
  if (mlrunner.isRunning()) {
    mlrunner.stopRunning();
  } else {
    mlrunner.startRunning();
  }
});
mlactions.onStart(mlactions.shake, function () {
  basic.showString("S");
});
mlactions.onStart(mlactions.still, function () {
  basic.showIcon(IconNames.Asleep);
});
mlactions.onStart(mlactions.drawCircle, function () {
  basic.showString("C");
});
mlactions.onStart(mlactions.unknown, function () {
  basic.clearScreen();
});
mlactions.onStop(mlactions.still, function (duration) {
  timeStill += duration;
});
basic.forever(function () {
  serial.writeLine("Is Shake: " + mlactions.isAction(mlactions.shake) + "\n");
  basic.pause(10000);
});
