let timeStill = 0
input.onButtonPressed(Button.A, function () {
    basic.clearScreen()
    serial.writeLine("Total time still: " + timeStill + "\n")
})
input.onButtonPressed(Button.B, function () {
    if (mlrunner.isRunning()) {
        mlrunner.stopRunning()
    } else {
        mlrunner.startRunning()
    }
})
mlrunner.Action.Shake.onEvent(function () {
    basic.showString("S")
})
mlrunner.Action.Still.onEvent(function () {
    basic.showIcon(IconNames.Asleep)
})
mlrunner.Action.Circle.onEvent(function () {
    basic.showString("C")
})
mlrunner.Action.None.onEvent(function () {
    basic.clearScreen()
})
mlrunner.Action.Still.onStop(function (duration) {
    timeStill += duration
})
basic.forever(function () {
    serial.writeLine("Is Shake: " + mlrunner.Action.Shake.isEvent() + "\n")
    basic.pause(10000)
})
