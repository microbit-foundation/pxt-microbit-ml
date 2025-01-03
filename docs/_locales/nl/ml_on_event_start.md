# op ML start

Start een [event handler](/reference/event-handler) (deel van het programma dat wordt uitgevoerd wanneer er iets gebeurt). Deze handler werkt wanneer de ingeschatte actie van het ML-model verandert in de actie die je selecteert.

```sig
ml.onStart(ml.event.Unknown, function () {
})
```

Het ML-model update zijn geschatte actie meerdere keren per seconde, maar deze event handler wordt alleen uitgevoerd wanneer de geschatte actie verandert.

## Parameters

- **gebeurtenis**: een van de acties waarop het machine-learning is getraind. De speciale waarde `unknown` vertegenwoordigt het geval waar geen actie een zekerheid heeft boven het herkenningspunt.

## Voorbeeld

Dit voorbeeld speelt een muzikale melodie op de achtergrond wanneer de actie `klappen` een zekerheid boven het herkenningspunt heeft.

```blocks
ml.onStart(ml.event.Clapping, function () {
    music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Dadadum), music.PlaybackMode.InBackground)
})
```

```package
machine-learning-help-stubs=github:microbit-foundation/pxt-microbit-ml-stubs#v0.0.1
machine-learning=github:microbit-foundation/pxt-microbit-ml#v1.0.2
```
