# on ML stop

Start an [event handler](/reference/event-handler) (part of the program that will run when something happens). This handler works when when the ML model’s estimated action changes to the action you select.

```sig
ml.onStop(ml.event.Unknown, function () {
})
```

When an action changes, the stop event handler for the previous action will run, followed by the start event handler for the next action.

For example, if your start event handler for an action starts music playing in the background, you could use a stop event handler to stop it.

## Parameters

- **event**: one of the actions the machine learning model was trained on. The special value `unknown` represents the case where no action has a certainty above the recognition point.

## Example

This example stops playing a musical melody when the estimated action changes from `clapping` to any other action.

```blocks
ml.onStop(ml.event.Clapping, function () {
    music.stopMelody(MelodyStopOptions.All)
})
```

```package
machine-learning-help-stubs=github:microbit-foundation/pxt-microbit-ml-help-stubs#v0.0.1
machine-learning=github:microbit-foundation/pxt-microbit-ml#v1.0.2
```
