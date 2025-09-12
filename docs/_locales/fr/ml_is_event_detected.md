# ML détecté

Vérifie si une action ML est l'action estimée.

```sig
ml.isDetected(ml.event.Unknown)
```

Le modèle ML met à jour son action estimée plusieurs fois par seconde. Cette fonction renvoie `true` si l'action choisie est actuellement estimée. Utilisez la valeur booléenne pour prendre des décisions logiques dans votre programme.

Certains programmes seront plus faciles à écrire en utilisant les gestionnaires d'événements « au démarrage de ML » et « à l'arrêt de ML » à la place.

## Paramètres

- **événement** : une des actions sur lesquelles le modèle d'apprentissage automatique a été formé. La valeur spéciale `unknown` représente le cas où aucune action n'a une certitude au-dessus du point de reconnaissance.

## Retours

- une valeur [boolean](/types/boolean) qui est `true` si l'action ML est l'action estimée, `false` si l'action ML n'est pas l'action estimée.

## Exemple

Cet exemple affichera une icône de coche sur l'écran LED si l'action estimée est `applaudir` au moment où l'instruction conditionnelle est vérifiée.

```blocks
basic.forever(function () {
    if (ml.isDetected(ml.event.Clapping)) {
        basic.showIcon(IconNames.Yes)
    }
})
```

```package
machine-learning-help-stubs=github:microbit-foundation/pxt-microbit-ml-help-stubs#v0.0.1
machine-learning=github:microbit-foundation/pxt-microbit-ml#v1.0.13
```
