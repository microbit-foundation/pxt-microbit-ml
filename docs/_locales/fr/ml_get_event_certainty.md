# certitude (%) ML

Récupère la dernière valeur de certitude pour une action ML.

```sig
ml.getCertainty(ml.event.Unknown)
```

Le modèle ML s'exécute plusieurs fois par seconde et calcule une valeur de certitude pour chaque action. L'action estimée est l'action avec la plus grande certitude. Une action ne peut pas être l'action estimée lorsque sa certitude est inférieure au point de reconnaissance. Certains programmes peuvent avoir besoin d'utiliser directement les valeurs de certitude, par exemple pour les afficher ou les enregistrer. La plupart des programmes peuvent utiliser l'action estimée au lieu des valeurs de certitude.

## Paramètres

- **événement** : une des actions sur lesquelles le modèle d'apprentissage automatique a été formé.

## Retours

- un pourcentage en [nombre](/types/number) de 0 à 100, représentant la certitude du modèle ML que c'est l'action en cours. La certitude pour `inconnu` est toujours 0.

## Exemple

Cet exemple montre la certitude du modèle ML, exprimée en pourcentage, que l'action en cours est `applaudir` toutes les secondes.

```blocks
loops.everyInterval(1000, function () {
    basic.showNumber(ml.getCertainty(ml.event.Clapping))
})
```

```package
machine-learning-help-stubs=github:microbit-foundation/pxt-microbit-ml-help-stubs#v0.0.1
machine-learning=github:microbit-foundation/pxt-microbit-ml#v1.0.8
```
