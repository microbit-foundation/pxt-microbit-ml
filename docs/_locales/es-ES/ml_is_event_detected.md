# se ha detectado ML

Comprueba si una acción ML es la acción estimada.

```sig
ml.isDetected(ml.event.Unknown)
```

El modelo ML actualiza su acción estimada varias veces por segundo. Esta función devuelve "cierto" si la acción elegida está actualmente estimada. Utiliza el valor booleano para tomar decisiones lógicas en tu programa.

Algunos programas serán más fáciles de escribir utilizando los manejadores de eventos «on ML start» y «on ML stop» en su lugar.

## Parámetros

- **evento**: una de las acciones en las que se ha entrenado el modelo de aprendizaje automático. El valor especial `desconocido` representa el caso en que ninguna acción tiene una certeza superior al punto de reconocimiento.

## Devuelve

- un valor [booleano](/types/boolean) que es `cierto` si la acción ML es la acción estimada, `falso` si la acción ML no es la acción estimada.

## Ejemplo

Este ejemplo mostrará un icono de tic en la pantalla LED si la acción estimada es `clapping` en el momento en que se comprueba la sentencia condicional.

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
