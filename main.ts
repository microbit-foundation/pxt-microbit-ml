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
mlactions.onStart(mlactions.Shake, function () {
  basic.showString("S");
});
mlactions.onStart(mlactions.Still, function () {
  basic.showIcon(IconNames.Asleep);
});
mlactions.onStart(mlactions.Circle, function () {
  basic.showString("C");
});
mlactions.onStart(mlactions.None, function () {
  basic.clearScreen();
});
mlactions.onStop(mlactions.Still, function (duration) {
  timeStill += duration;
});
basic.forever(function () {
  serial.writeLine(
    "Is Shake: " + mlactions.isAction(mlactions.Shake) + "\n"
  );
  basic.pause(10000);
});
