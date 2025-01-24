# certainty (%) ML

Gets the latest certainty value for an ML action.

```sig
ml.getCertainty(ml.event.Unknown)
```

The ML model runs several times a second and calculates a certainty value for each action. The estimated action is the action with the highest certainty. An action cannot be the estimated action when its certainty is below the recognition point. Some programs may need to use the certainty values directly, for example to display or log them. Most programs can use the estimated action instead of certainty values.

## Parameters

- **event**: one of the actions the machine learning model was trained on.

## Returns

- a percentage as a [number](/types/number) from 0 to 100, representing the ML model’s certainty that this is the action being performed. The certainty for `unknown` is always 0.

## Example

This example displays the ML model's certainty, in percent, that the current action is `clapping` every second.

```blocks
loops.everyInterval(1000, function () {
    basic.showNumber(ml.getCertainty(ml.event.Clapping))
})
```

```package
machine-learning-help-stubs=github:microbit-foundation/pxt-microbit-ml-help-stubs#v0.0.1
machine-learning=github:microbit-foundation/pxt-microbit-ml#v1.0.8
```
