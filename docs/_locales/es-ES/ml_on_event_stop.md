# al detenerse el ML

Inicia un [manejador de eventos](/reference/event-handler) (parte del programa que se ejecutará cuando algo suceda). Este controlador funciona cuando la acción estimada del modelo ML cambia respecto a la acción que seleccionaste.

```sig
ml.onStop(ml.event.Unknown, function () {
})
```

Cuando cambie una acción, se ejecutará el controlador de eventos de parada de la acción anterior, seguido del controlador de eventos de inicio de la acción siguiente.

Por ejemplo, si el controlador de eventos de inicio de una acción inicia la reproducción de música en segundo plano, puedes utilizar un controlador de eventos de parada para detenerla.

## Parámetros

- **evento**: una de las acciones en las que se ha entrenado el modelo de aprendizaje automático. El valor especial `unknown` representa el caso en que ninguna acción tiene una certeza superior al punto de reconocimiento.

## Ejemplo

Este ejemplo detiene la reproducción de una melodía musical cuando la acción estimada cambia de «aplaudir» a cualquier otra acción.

```blocks
ml.onStop(ml.event.Clapping, function () {
    music.stopMelody(MelodyStopOptions.All)
})
```

```package
machine-learning-help-stubs=github:microbit-foundation/pxt-microbit-ml-help-stubs#v0.0.1
machine-learning=github:microbit-foundation/pxt-microbit-ml#v1.0.2
```
