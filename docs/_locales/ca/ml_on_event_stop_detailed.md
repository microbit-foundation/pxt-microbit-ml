# a aturada de ML

Inicia un [gestor d'esdeveniments](/reference/event-handler) (part del programa que s'executarà quan passi alguna cosa). Aquest controlador funciona quan l'acció estimada del model ML canvia de l'acció que seleccionis.

```sig
ml.onStopDetailed(ml.event.Unknown, function (duration) {
})
```

Quan una acció canvia, s'executarà el controlador d'esdeveniments d'aturada de l'acció anterior, seguit del controlador d'esdeveniments d'inici per a l'acció següent.

Per exemple, si el teu gestor d'esdeveniments d'inici d'una acció comença a reproduir música en segon pla, pots utilitzar un gestor d'esdeveniments d'aturada per aturar-la.

Al gestor d'esdeveniments se li passa un paràmetre de "durada". La durada és el [nombre](/types/number de mil·lisegons des que aquesta acció es va convertir en l'acció estimada. Pots utilitzar el paràmetre de durada al teu programa, per exemple, mostrant-lo o utilitzant una variable per mantenir un total acumulat.

## Paràmetres

- **esdeveniment**: una de les accions en què es va entrenar el model d'aprenentatge automàtic. El valor especial "desconegut" representa el cas en què cap acció té una certesa per sobre del punt de reconeixement.

## Exemple

Aquest exemple mostra a la pantalla LED, en segons, quant de temps va estar l'acció estimada "aplaudiment", quan l'acció estimada canvia de "aplaudiment" a qualsevol altra acció.

```blocks
ml.onStopDetailed(ml.event.Clapping, function (duration) {
    basic.showNumber(duration / 1000)
})
```

```package
machine-learning-help-stubs=github:microbit-foundation/pxt-microbit-ml-help-stubs#v0.0.1
machine-learning=github:microbit-foundation/pxt-microbit-ml#v1.0.8
```
