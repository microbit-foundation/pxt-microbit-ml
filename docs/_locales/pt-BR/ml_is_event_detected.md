# is ML detected

Verifica se uma ação de ML é a ação estimada.

```sig
ml.isDetected(ml.event.Unknown)
```

O modelo de ML atualiza sua estimativa de ação várias vezes por segundo. Esta função retorna `true` se a ação escolhida for a estimada no momento. Use o valor booleano para tomar decisões lógicas no seu programa.

Alguns programas serão mais fáceis de escrever usando, em vez disso, os manipuladores de evento "on ML start" e "on ML stop".

## Parâmetros

- **evento**: uma das ações nas quais o modelo de aprendizado de máquina foi treinado. O valor especial `unknown` (desconhecido) representa o caso em que nenhuma ação tem uma certeza acima do ponto de reconhecimento.

## Retornos

- um valor [boolean](/types/boolean) que é `true` se a ação de ML for a ação estimada ou `false` se a ação de ML não for a ação estimada.

## Exemplo

Este exemplo exibirá um ícone de conferido no visor de LED se a ação estimada for `clapping` (bater palmas) no momento exato em que os comandos condicionais forem verificados.

```blocks
basic.forever(function () {
    if (ml.isDetected(ml.event.Clapping)) {
        basic.showIcon(IconNames.Yes)
    }
})
```

```package
machine-learning-help-stubs=github:microbit-foundation/pxt-microbit-ml-help-stubs#v0.0.1
machine-learning=github:microbit-foundation/pxt-microbit-ml#v1.0.2
```
