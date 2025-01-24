# 確実性(%) ML

ML の動きの確実性の値を取得します。

```sig
ml.getCertainty(ml.event.Unknown)
```

ML モデルは 1 秒間に数回実行され、各アクションの確実性の値を算出します。 推定した動きは、最も高い確実性を持つ動きです。 アクションの確実性が認識点を下回る場合、そのアクションを推定アクションとすることはできない。 プログラムによっては、例えば確かな値を表示したりログに記録したりするために、その値を直接使う必要があるかもしれない。 ほとんどのプログラムでは、確実な値の代わりに推定アクションを使うことができる。

## パラメータ

- **イベント**：機械学習モデルがトレーニングされたアクションの 1 つ。

## 戻る

- パーセンテージは 0 から 100 までの[数値](/types/number)で、ML モデルがこのアクションが実行されることを確信する度合いを表す。 「不明」の確実性は常に 0 である。

## 例

この例では、現在のアクションが 1 秒ごとに`clapping`しているという ML モデルの確信度をパーセントで表示しています。

```blocks
loops.everyInterval(1000, function () {basic.showNumber(ml.getCertainty(ml.event.Clapping))
})
```

```package
machine-learning-help-stubs=github:microbit-foundation/pxt-microbit-ml-help-stubs#v0.0.1
machine-learning=github:microbit-foundation/pxt-microbit-ml#v1.0.8
```
