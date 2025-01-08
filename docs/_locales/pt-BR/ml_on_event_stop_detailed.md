# on ML stop

Inicie um [manipulador de eventos](/reference/event-handler) (parte do programa que será executada quando algo acontecer). Este manipulador funciona quando a ação estimada pelo modelo de ML muda da ação que você selecionou.

```sig
ml.onStopDetailed(ml.event.Unknown, function (duration) {
})
```

Quando uma ação muda, o manipulador de eventos de parada da ação anterior será executado, seguido pelo manipulador de eventos de início da próxima ação.

Por exemplo, se o seu manipulador de eventos para início de uma ação começar a reprodução de música em segundo plano, você pode usar um manipulador de eventos de parada para interrompê-la.

O manipulador de eventos recebe um parâmetro chamado `duration`. A duração é o [número](/types/number) de milissegundos desde que esta ação passou a ser a ação estimada. Você pode usar o parâmetro de duração no seu código, por exemplo, exibindo-o ou usando uma variável para manter um total acumulado.

## Parâmetros

- **evento**: uma das ações nas quais o modelo de aprendizado de máquina foi treinado. O valor especial `unknown` representa o caso em que nenhuma ação tem uma certeza acima do ponto de reconhecimento.

## "Exemplo"

Este exemplo mostra no display de LED, em segundos, a duração da ação estimada como `bater palmas`, quando a ação estimada muda de `bater palmas` para qualquer outra ação.

```blocks
ml.onStopDetailed(ml.event.Clapping, function (duration) {
    basic.showNumber(duration / 1000)
})
```

```package
machine-learning-help-stubs=github:microbit-foundation/pxt-microbit-ml-help-stubs#v0.0.1
machine-learning=github:microbit-foundation/pxt-microbit-ml#v1.0.6
```
