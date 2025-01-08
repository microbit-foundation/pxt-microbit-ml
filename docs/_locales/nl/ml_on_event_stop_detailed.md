# op ML stop

Start een [event handler](/reference/event-handler) (deel van het programma dat wordt uitgevoerd wanneer er iets gebeurt). Deze handler werkt wanneer de ingeschatte actie van het ML-model verandert in de actie die je selecteert.

```sig
ml.onStopDetailed(ml.event.Unknown, function (duration) {
})
```

Als een actie verandert, wordt de stop event handler voor de vorige actie uitgevoerd, gevolgd door de start event handler voor de volgende actie.

Bijvoorbeeld, als je start event-handler zorgt voor een actie die muziek afspeelt op de achtergrond kun je een stop-event-handler gebruiken om deze te stoppen.

Aan de event handler wordt een 'tijdsduur' (duration) parameter doorgegeven. De tijdsduur is het [aantal](/types/nummer) milliseconden sinds deze actie de geschatte actie werd. Je kunt de tijdsduur parameter gebruiken in je code, bijvoorbeeld om deze weer te geven of om een variabele te gebruiken om het totaal te bij te houden.

## Parameters

- **gebeurtenis**: een van de acties waarop het machine-learning is getraind. De speciale waarde `unknown` vertegenwoordigt het geval waar geen actie een zekerheid heeft boven het herkenningspunt.

## Voorbeeld

Dit voorbeeld laat zien op het LED-display, in seconden, hoe lang de geschatte actie `klappen` was, wanneer de ingeschat actie verandert van `klappen` naar een andere actie.

```blocks
ml.onStopDetailed(ml.event.Clapping, function (duration) {
    basic.showNumber(duration / 1000)
})
```

```package
machine-learning-help-stubs=github:microbit-foundation/pxt-microbit-ml-stubs#v0.0.1
machine-learning=github:microbit-foundation/pxt-microbit-ml#v1.0.4
```
