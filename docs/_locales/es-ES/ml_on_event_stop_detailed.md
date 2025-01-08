# al detenerse el ML

Inicia un [manejador de eventos](/reference/event-handler) (parte del programa que se ejecutará cuando algo suceda). Este controlador funciona cuando la acción estimada del modelo ML cambia respecto a la acción que seleccionaste.

```sig
ml.onStopDetailed(ml.event.Unknown, function (duration) {
})
```

Cuando cambie una acción, se ejecutará el controlador de eventos de parada de la acción anterior, seguido del controlador de eventos de inicio de la acción siguiente.

Por ejemplo, si el controlador de eventos de inicio de una acción inicia la reproducción de música en segundo plano, puedes utilizar un controlador de eventos de parada para detenerla.

Al controlador del evento se le pasa un parámetro de «duración». La duración es el [número](/types/number) de milisegundos desde que esta acción se convirtió en la acción estimada. Puedes utilizar el parámetro de duración en tu código; por ejemplo, mostrándolo o utilizando una variable para mantener un total actualizado.

## Parámetros

- **evento**: una de las acciones en las que se ha entrenado el modelo de aprendizaje automático. El valor especial `unknown` representa el caso en que ninguna acción tiene una certeza superior al punto de reconocimiento.

## Ejemplo

Este ejemplo muestra en la pantalla LED, en segundos, cuánto tiempo ha durado la acción estimada de «aplaudir», cuando la acción estimada cambia de «aplaudir» a cualquier otra acción.

```blocks
ml.onStopDetailed(ml.event.Clapping, function (duration) {
    basic.showNumber(duration / 1000)
})
```

```package
machine-learning-help-stubs=github:microbit-foundation/pxt-microbit-ml-help-stubs#v0.0.1
machine-learning=github:microbit-foundation/pxt-microbit-ml#v1.0.6
```
