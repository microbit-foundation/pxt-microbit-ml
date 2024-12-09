# on ML start

Start an [event handler](https://makecode.microbit.org/---docs#doc:reference/event-handler) (part of the program that will run when something happens) This handler works when when the ML model’s estimated action changes to the action you select.

```sig
ml.onStart(ml.event.Unknown, function () {
})
```

The ML model updates its estimated action several times a second, but this block only runs when the estimated action changes.

## Parameters

- **action**: action one of the actions the machine learning model was trained on. The special value unknown represents the case where no action has a certainty above the recognition point.

## Example

This example reads from a file on disk and prints the contents to the console.

```blocks
ml.onStart(ml.event.Unknown, function () {
    music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Dadadadum), music.PlaybackMode.InBackground)
})
```

```package
machine-learning=github:microbit-foundation/pxt-microbit-ml
```
