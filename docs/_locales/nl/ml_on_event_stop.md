# op ML stop

Start een [event handler](/reference/event-handler) (deel van het programma dat wordt uitgevoerd wanneer er iets gebeurt). Deze handler werkt wanneer de ingeschatte actie van het ML-model verandert in de actie die je selecteert.

```sig
ml.onStop(ml.event.Unknown, function () {
})
```

Als een actie verandert, wordt de stop event handler voor de vorige actie uitgevoerd, gevolgd door de start event handler voor de volgende actie.

Bijvoorbeeld, als je start event-handler zorgt voor een actie die muziek afspeelt op de achtergrond kun je een stop-event-handler gebruiken om deze te stoppen.

## Parameters

- **gebeurtenis**: een van de acties waarop het machine-learning is getraind. De speciale waarde `unknown` vertegenwoordigt het geval waar geen actie een zekerheid heeft boven het herkenningspunt.

## Voorbeeld

Dit voorbeeld stopt met het spelen van een muzikale melodie wanneer de geschatte actie verandert van `klappen` naar een andere actie.

```blocks
ml.onStop(ml.event.Clapping, function () {
    music.stopMelody(MelodyStopOptions.All))
})
```

```package
machine-learning-help-stubs=github:microbit-foundation/pxt-microbit-ml-stubs#v0.0.1
machine-learning=github:microbit-foundation/pxt-microbit-ml#v1.0.4
```
