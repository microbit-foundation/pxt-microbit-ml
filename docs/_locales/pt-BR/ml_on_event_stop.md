# on ML stop

Inicie um [manipulador de eventos](/reference/event-handler) (parte do programa que será executada quando algo acontecer). Este manipulador é acionado quando a ação estimada pelo modelo de ML muda da ação que você selecionou.

```sig
ml.onStop(ml.event.Unknown, function () {
})
```

Quando uma ação muda, o manipulador de eventos de parada da ação anterior será executado, seguido pelo manipulador de eventos de início da próxima ação.

Por exemplo, se o manipulador de eventos de início para uma ação começar a reprodução de música em segundo plano, você pode usar um manipulador de eventos de parada para interrompê-la.

## Parâmetros

- **evento**: uma das ações nas quais o modelo de aprendizado de máquina foi treinado. O valor especial `unknown` representa o caso em que nenhuma ação tem uma certeza acima do ponto de reconhecimento.

## Exemplo

Este exemplo para de tocar uma melodia musical quando a ação estimada muda de `clapping` (bater palmas) para qualquer outra ação.

```blocks
ml.onStop(ml.event.Clapping, function () {
    music.stopMelody(MelodyStopOptions.All)
})
```

```package
machine-learning-help-stubs=github:microbit-foundation/pxt-microbit-ml-help-stubs#v0.0.1
machine-learning=github:microbit-foundation/pxt-microbit-ml#v1.0.6
```
