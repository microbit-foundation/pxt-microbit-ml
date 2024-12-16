# on ML stop

Start an [event handler](/reference/event-handler) (part of the program that will run when something happens). This handler works when the ML model’s estimated action changes to the action you select.

```sig
ml.onStopDetailed(ml.event.Unknown, function (duration) {
})
```

When an action changes, the stop event handler for the previous action will run, followed by the start event handler for the next action.

For example, if your start event handler for an action starts music playing in the background, you could use a stop event handler to stop it.

The event handler is passed a `duration` parameter. The duration is the [number](/types/number) of milliseconds since this action became the estimated action. You can use the duration parameter in your code, for example displaying it or using a variable to keep a running total.

## Parameters

- **event**: one of the actions the machine learning model was trained on. The special value `unknown` represents the case where no action has a certainty above the recognition point.

## Example

This example shows on the LED display, in seconds, how long the estimated action was `clapping`, when the estimated action changes from `clapping` to any other action.

```blocks
ml.onStopDetailed(ml.event.Clapping, function (duration) {
    basic.showNumber(duration / 1000)
})
```

```package
machine-learning-help-stubs=github:microbit-foundation/pxt-microbit-ml-help-stubs#v0.0.1
machine-learning=github:microbit-foundation/pxt-microbit-ml#v1.0.2
```
