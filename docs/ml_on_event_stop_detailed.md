# on ML stop

Start an [event handler](/reference/event-handler) (part of the program that will run when something happens) This handler works when when the ML model’s estimated action changes to the action you select.

```sig
ml.onStopDetailed(ml.event.Unknown, function (duration) {
})
```

When an action changes, the stop event handler for the previous action will run, followed by the start event handler for the next action.

The event handler is passed a `duration` parameter. The duration is the number of milliseconds since this action became the estimated action. You can use the duration parameter in your code, for example displaying it or using a variable to keep a running total.

## Parameters

- **event**: one of the actions the machine learning model was trained on. The special value `unknown` represents the case where no action has a certainty above the recognition point.
- **duration**: the [number](/types/number) of milliseconds the action was the estimated action.

## Example

This example uses the special `unknown` option and stops playing a musical melody when any other action has a certainty above the recognition point.

```blocks
ml.onStopDetailed(ml.event.Unknown, function (duration) {
    basic.showNumber(duration / 1000)
})
```

```package
machine-learning=github:microbit-foundation/pxt-microbit-ml
```
