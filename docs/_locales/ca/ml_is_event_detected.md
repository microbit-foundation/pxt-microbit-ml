# S'ha detectat ML

Comprova si una acció ML és l'acció estimada.

```sig
ml.isDetected(ml.event.Unknown)
```

El model ML actualitza la seva acció estimada diverses vegades per segon. Aquesta funció retorna "cert" si l'acció escollida està estimada actualment. Fes servir el valor booleà per prendre decisions lògiques al teu programa.

Alguns programes seran més fàcils d'escriure utilitzant els controladors d'esdeveniments "al iniciar ML" i "al aturar ML".

## Paràmetres

- **esdeveniment**: una de les accions en què es va entrenar el model d'aprenentatge automàtic. El valor especial "desconegut" representa el cas en què cap acció té una certesa per sobre del punt de reconeixement.

## Retorns

- un valor [boolean](/types/boolean) que és "cert" si l'acció ML és l'acció estimada, "fals" si l'acció ML no és l'acció estimada.

## Exemple

Aquest exemple mostrarà una icona de marca a la pantalla LED si l'acció estimada és "aplaudir" en el moment en què es comprova la declaració condicional.

```blocks
basic.forever(function () {
    if (ml.isDetected(ml.event.Clapping)) {
        basic.showIcon(IconNames.Yes)
    }
})
```

```package
machine-learning-help-stubs=github:microbit-foundation/pxt-microbit-ml-help-stubs#v0.0.1
machine-learning=github:microbit-foundation/pxt-microbit-ml#v1.0.8
```
