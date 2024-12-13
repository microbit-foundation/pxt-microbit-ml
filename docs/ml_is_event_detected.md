# is ML detected

Checks if an ML action is the estimated action.

```sig
ml.isDetected(ml.event.Unknown)
```

The ML model updates its estimated action several times a second. This function compares the latest value of the estimated value to the action you choose. Use the boolean value to make logical decisions in your program.

Some programs will be easier to write using the “on ML start” and “on ML stop” event handlers instead.

## Parameters

- **event**: one of the actions the machine learning model was trained on. The special value `unknown` represents the case where no action has a certainty above the recognition point.

## Returns

- a [boolean](/types/boolean) value that is `true` if the ML action is the estimated action, `false` if the ML action is not the estimated action.

## Example

This example will show a tick icon on the LED display if the estimated action is `unknown` at the time the conditional statement is checked.

```blocks
basic.forever(function () {
    if (ml.isDetected(ml.event.Unknown)) {
        basic.showIcon(IconNames.Yes)
    }
})
```

```package
machine-learning=github:microbit-foundation/pxt-microbit-ml
```