# on ML start

Gets the latest certainty value for an ML action.

```sig
ml.getCertainty(ml.event.Unknown)
```

The ML model runs several times a second and calculates a certainty value for each action. The estimated action is the action with the highest certainty (an action is not considered when its certainty is below the recognition point). Some programs may want to access the certainty values directly, for example to display or log them. Most programs can use the estimated action instead of certainty values.

## Parameters

- **event**: one of the actions the machine learning model was trained on.

## Returns

- a percentage as a [number](/types/number) from 0 to 100, representing the ML model’s certainty that this is the action being performed. The certainty for `unknown` is always 0.

## Example

This example displays the ML model's certainty that the current action is `unknown` every second.

```blocks
loops.everyInterval(1000, function () {
    basic.showNumber(ml.getCertainty(ml.event.Unknown))
})
```

```package
machine-learning=github:microbit-foundation/pxt-microbit-ml
```
