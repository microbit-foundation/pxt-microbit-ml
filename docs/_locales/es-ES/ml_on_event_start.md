# on ML start

Inicia un [manejador de eventos](/reference/event-handler) (parte del programa que se ejecutará cuando algo suceda). Este manejador funciona cuando la acción estimada del modelo ML cambia a la acción que tú seleccionas.

```sig
ml.onStart(ml.event.Unknown, function () {
})
```

El modelo ML actualiza su acción estimada varias veces por segundo, pero este controlador de eventos solo se ejecuta cuando cambia la acción estimada.

## Parámetros

- **evento**: una de las acciones en las que se ha entrenado el modelo de aprendizaje automático. El valor especial `unknown` representa el caso en que ninguna acción tiene una certeza superior al punto de reconocimiento.

## Ejemplo

Este ejemplo reproduce una melodía musical de fondo cuando la acción «aplaudir» tiene una certeza superior al punto de reconocimiento.

```blocks
ml.onStart(ml.event.Clapping, function () {
    music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Dadadadum), music.PlaybackMode.InBackground)
})
```

```package
machine-learning-help-stubs=github:microbit-foundation/pxt-microbit-ml-help-stubs#v0.0.1
machine-learning=github:microbit-foundation/pxt-microbit-ml#v1.0.2
```
