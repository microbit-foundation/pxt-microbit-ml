# certesa (%) ML

Obté el valor de certesa més recent per a una acció de ML.

```sig
ml.getCertainty(ml.event.Unknown)
```

El model ML s'executa diverses vegades per segon i calcula un valor de certesa per a cada acció. L'acció estimada és l'acció amb més certesa. Una acció no pot ser l'acció estimada quan la seva certesa està per sota del punt de reconeixement. És possible que alguns programes hagin d'utilitzar els valors de certesa directament, per exemple per mostrar-los o registrar-los. La majoria dels programes poden utilitzar l'acció estimada en lloc dels valors de certesa.

## Paràmetres

- **esdeveniment**: una de les accions en què es va entrenar el model d'aprenentatge automàtic.

## Retorns

- un percentatge com a [número](/types/number) de 0 a 100, que representa la certesa del model ML que aquesta és l'acció que s'està realitzant. La certesa per a "desconegut" sempre és 0.

## Exemple

Aquest exemple mostra la certesa del model ML, en percentatge, que l'acció actual està "aplaudint" cada segon.

```blocks
loops.everyInterval(1000, function () {
    basic.showNumber(ml.getCertainty(ml.event.Clapping))
})
```

```package
machine-learning-help-stubs=github:microbit-foundation/pxt-microbit-ml-help-stubs#v0.0.1
machine-learning=github:microbit-foundation/pxt-microbit-ml#v1.0.8
```
