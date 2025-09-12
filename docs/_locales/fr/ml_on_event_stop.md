# à l'arrêt de ML

Démarrez un [gestionnaire d'événements](/reference/event-handler) (partie du programme qui s'exécutera quand quelque chose se passe). Ce gestionnaire fonctionne lorsque l'action estimée du modèle ML change de l'action que vous sélectionnez.

```sig
ml.onStop(ml.event.Unknown, function () {
})
```

Lorsqu'une action est modifiée, le gestionnaire d'événements d'arrêt pour l'action précédente s'exécutera, suivi du gestionnaire d'événements de début pour la prochaine action.

Par exemple, si votre gestionnaire d'événements de départ pour une action démarre la musique en arrière-plan, vous pouvez utiliser un gestionnaire d'événements stop pour l'arrêter.

## Paramètres

- **événement** : une des actions sur lesquelles le modèle d'apprentissage automatique a été formé. La valeur spéciale `unknown` représente le cas où aucune action n'a une certitude au-dessus du point de reconnaissance.

## Exemple

Cet exemple arrête de jouer une mélodie musicale lorsque l'action estimée passe de « applaudir  » à n'importe quelle autre action.

```blocks
ml.onStop(ml.event.Clapping, function () {
    music.stopMelody(MelodyStopOptions.All)
})
```

```package
machine-learning-help-stubs=github:microbit-foundation/pxt-microbit-ml-help-stubs#v0.0.1
machine-learning=github:microbit-foundation/pxt-microbit-ml#v1.0.13
```
