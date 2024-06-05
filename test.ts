input.onButtonPressed(Button.A, function () {
    basic.clearScreen()
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
mlrunner.Action.Circle.onEvent( function () {
    basic.showString("C")
})
mlrunner.Action.None.onEvent(function () {
    basic.clearScreen()
})
basic.forever(function () {
	
})
