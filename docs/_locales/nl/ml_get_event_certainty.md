# zekerheid (%) ML

Haalt de laatste zekerheidswaarde op voor een ML actie.

```sig
ml.getCertainty(ml.event.Unknown)
```

Het ML-model loopt meerdere keren per seconde en berekent een zekerheidswaarde voor elke actie. De geschatte actie is de actie met de hoogste zekerheid. Een actie kan niet de geschatte actie zijn als de zekerheid onder het herkenningspunt ligt. Sommige programma's moeten mogelijk de zekerheidswaarden direct gebruiken, bijvoorbeeld om ze weer te geven of te loggen. De meeste programma's kunnen de geschatte actie gebruiken in plaats van de zekerheidswaarden.

## Parameters

- **gebeurtenis**: een van de acties waarop het machine-learning is getraind.

## Retourneert

- een percentage als een [getal](/types/number) van 0 tot 100, dat de zekerheid van het ML-model weergeeft dat dit de actie is die wordt uitgevoerd. De zekerheid voor `unknown` is altijd 0.

## Voorbeeld

Dit voorbeeld toont de zekerheid van het ML-model in procenten, dat de huidige actie elke seconde 'klappen' is.

```blocks
loops.everyInterval(1000, function () {
    basic.showNumber(ml.getCertainty(ml.event.Clapping))
})
```

```package
machine-learning-help-stubs=github:microbit-foundation/pxt-microbit-ml-stubs#v0.0.1
machine-learning=github:microbit-foundation/pxt-microbit-ml#v1.0.4
```
