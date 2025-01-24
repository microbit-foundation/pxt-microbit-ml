# a l'inici de ML

Inicia un [gestor d'esdeveniments](/reference/event-handler) (part del programa que s'executarà quan passi alguna cosa). Aquest controlador funciona quan l'acció estimada del model ML canvia a l'acció que seleccionis.

```sig
ml.onStart(ml.event.Unknown, function () {
})
```

El model ML actualitza la seva acció estimada diverses vegades per segon, però aquest controlador d'esdeveniments només s'executa quan l'acció estimada canvia.

## Paràmetres

- **esdeveniment**: una de les accions en què es va entrenar el model d'aprenentatge automàtic. El valor especial "desconegut" representa el cas en què cap acció té una certesa per sobre del punt de reconeixement.

## Exemple

Aquest exemple reprodueix una melodia musical de fons quan l'acció "aplaudir" té una certesa per sobre del punt de reconeixement.

```blocks
ml.onStart(ml.event.Clapping, function () {
    music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Dadadadum), music.PlaybackMode.InBackground)
})
```

```package
machine-learning-help-stubs=github:microbit-foundation/pxt-microbit-ml-help-stubs#v0.0.1
machine-learning=github:microbit-foundation/pxt-microbit-ml#v1.0.8
```
