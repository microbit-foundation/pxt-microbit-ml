# certeza (%) ML

Obtém o valor de certeza mais recente para uma ação de ML.

```sig
ml.getCertainty(ml.event.Unknown)
```

O modelo de ML é executado várias vezes por segundo e calcula um valor de certeza para cada ação. A ação estimada é aquela com a maior certeza. Uma ação não pode ser a ação estimada quando sua certeza estiver abaixo do ponto de reconhecimento. Alguns programas podem precisar usar os valores de certeza diretamente, por exemplo, para exibi-los ou registrá-los. A maioria dos programas pode usar ações estimadas em vez dos valores de certeza.

## Parâmetros

- **evento**: uma das ações nas quais o modelo de aprendizado de máquina foi treinado.

## Retornos

- uma porcentagem como um [número](/types/number) de 0 a 100, representando a certeza do modelo de ML de que esta é a ação que está sendo realizada. A certeza para `unknown` é sempre 0.

## Exemplo

Este exemplo mostra a certeza do modelo de ML, em porcentagem, de que a ação atual é `clapping` (bater palmas) a cada segundo.

```blocks
loops.everyInterval(1000, function () {
    basic.showNumber(ml.getCertainty(ml.event.Clapping))
})
```

```package
machine-learning-help-stubs=github:microbit-foundation/pxt-microbit-ml-help-stubs#v0.0.1
machine-learning=github:microbit-foundation/pxt-microbit-ml#v1.0.6
```
