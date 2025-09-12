# au démarrage de ML

Démarrer un [gestionnaire d'événements](/reference/event-handler) (partie du programme qui s'exécutera quand quelque chose se passe). Ce gestionnaire fonctionne lorsque l'action estimée du modèle ML passe à l'action que vous avez sélectionnée.

```sig
ml.onStart(ml.event.Unknown, function () {
})
```

Le modèle ML met à jour son action estimée plusieurs fois par seconde, mais ce gestionnaire d'événements ne s'exécute que lorsque l'action estimée change.

## Paramètres

- **événement** : une des actions sur lesquelles le modèle d'apprentissage automatique a été formé. La valeur spéciale `unknown` représente le cas où aucune action n'a une certitude au-dessus du point de reconnaissance.

## Exemple

Cet exemple joue une mélodie musicale en arrière-plan lorsque l'action `applaudir` a une certitude au-dessus du point de reconnaissance.

```blocks
ml.onStart(ml.event.Clapping, function () {
    music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Dadadadum), music.PlaybackMode.InBackground)
})
```

```package
machine-learning-help-stubs=github:microbit-foundation/pxt-microbit-ml-help-stubs#v0.0.1
machine-learning=github:microbit-foundation/pxt-microbit-ml#v1.0.13
```
