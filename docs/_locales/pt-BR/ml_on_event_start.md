# on ML start

Inicie um [manipulador de evento](/reference/event-handler) (parte do programa que será executada quando algo acontecer). Este manipulador de evento é disparado quando a ação estimada pelo modelo de ML muda para a ação que você selecionou.

```sig
ml.onStart(ml.event.Unknown, function () {
})
```

O modelo de ML atualiza sua ação estimada várias vezes por segundo, mas esse manipulador de evento só é acionado quando a ação estimada muda.

## Parâmetros

- **evento**: uma das ações nas quais o modelo de aprendizado de máquina foi treinado. O valor especial `unknown` representa o caso em que nenhuma ação tem uma certeza acima do ponto de reconhecimento.

## Exemplo

Este exemplo reproduz uma melodia musical em segundo plano quando a ação `clapping` (bater palmas) tem uma certeza acima do ponto de reconhecimento.

```blocks
ml.onStart(ml.event.Clapping, function () {
    music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Dadadadum), music.PlaybackMode.InBackground)
})
```

```package
machine-learning-help-stubs=github:microbit-foundation/pxt-microbit-ml-help-stubs#v0.0.1
machine-learning=github:microbit-foundation/pxt-microbit-ml#v1.0.2
```
