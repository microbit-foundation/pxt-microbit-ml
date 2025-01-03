# certainty (%) ML

Obtiene el último valor de certeza de una acción ML.

```sig
ml.getCertainty(ml.event.Unknown)
```

El modelo ML se ejecuta varias veces por segundo y calcula un valor de certeza para cada acción. La acción estimada es la acción con mayor certeza. Una acción no puede ser la acción estimada cuando su certeza está por debajo del punto de reconocimiento. Es posible que algunos programas necesiten utilizar directamente los valores de certeza, por ejemplo para visualizarlos o registrarlos. La mayoría de los programas pueden utilizar la acción estimada en lugar de los valores de certeza.

## Parámetros

- **evento**: una de las acciones en las que se ha entrenado el modelo de aprendizaje automático.

## Devuelve

- un porcentaje como [número](/types/number) de 0 a 100, que representa la certeza del modelo ML de que ésta es la acción que se está realizando. La certeza para "unknown" es siempre 0.

## Ejemplo

Este ejemplo muestra la certeza del modelo ML, en porcentaje, de que la acción actual es "aplaudiendo" cada segundo.

```blocks
loops.everyInterval(1000, function () {
    basic.showNumber(ml.getCertainty(ml.event.Clapping))
})
```

```package
machine-learning-help-stubs=github:microbit-foundation/pxt-microbit-ml-help-stubs#v0.0.1
machine-learning=github:microbit-foundation/pxt-microbit-ml#v1.0.2
```
