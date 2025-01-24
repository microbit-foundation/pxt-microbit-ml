# a aturada de ML

Inicieu un [gestor d'esdeveniments](/reference/event-handler) (part del programa que s'executarà quan passi alguna cosa). This handler works when the ML model’s estimated action changes from the action you select.

```sig
ml.onStop(ml.event.Unknown, function () {
})
```

Quan una acció canvia, s'executarà el controlador d'esdeveniments d'aturada de l'acció anterior, seguit del controlador d'esdeveniments d'inici per a l'acció següent.

Per exemple, si el teu gestor d'esdeveniments d'inici d'una acció comença a reproduir música en segon pla, pots utilitzar un gestor d'esdeveniments d'aturada per aturar-la.

## Paràmetres

- **esdeveniment**: una de les accions en què es va entrenar el model d'aprenentatge automàtic. El valor especial "desconegut" representa el cas en què cap acció té una certesa per sobre del punt de reconeixement.

## Exemple

Aquest exemple deixa de reproduir una melodia musical quan l'acció estimada canvia de "aplaudir" a qualsevol altra acció.

```blocks
ml.onStop(ml.event.Clapping, function () {
    music.stopMelody(MelodyStopOptions.All)
})
```

```package
machine-learning-help-stubs=github:microbit-foundation/pxt-microbit-ml-help-stubs#v0.0.1
machine-learning=github:microbit-foundation/pxt-microbit-ml#v1.0.4
```
