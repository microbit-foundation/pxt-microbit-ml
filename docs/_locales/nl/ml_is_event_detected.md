# is ML gedetecteerd

Controleert of een ML-actie de geschatte actie is.

```sig
ml.isDetected(ml.event.Unknown)
```

Het ML-model actualiseert zijn geschatte actie meerdere keren per seconde. Deze functie retourneert `true` als de gekozen actie momenteel is ingeschat. Gebruik de booleaanse waarde om logische beslissingen te nemen in je programma.

Sommige programma's zullen gemakkelijker te schrijven zijn met behulp van de "on ML start" en "on ML stop" event handlers .

## Parameters

- **gebeurtenis**: een van de acties waarop het machine-learning is getraind. De speciale waarde `unknown` vertegenwoordigt het geval waar geen actie een zekerheid heeft boven het herkenningspunt.

## Retourneert

- een [boolean](/types/boolean) waarde die 'true' is als de ML actie de geschatte actie is, `false` als de ML actie niet de geschatte actie is.

## Voorbeeld

Dit voorbeeld toont een vinkje pictogram op het LED display als de geschatte actie 'klappen' is op het moment dat de voorwaardelijke opdracht is gecontroleerd.

```blocks
basic.forever(function () {
    if (ml.isDetected(ml.event.Clapping)) {
        basic.showIcon(IconNames.Yes)
    }
})
```

```package
machine-learning-help-stubs=github:microbit-foundation/pxt-microbit-ml-help-stubs#v0.0.1
machine-learning=github:microbit-foundation/pxt-microbit-ml#v1.0.4
```
