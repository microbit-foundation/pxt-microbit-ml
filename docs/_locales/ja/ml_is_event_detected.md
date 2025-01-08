# は ML によって検知されました

ML のアクションが推定されたアクションかどうかをチェックする。

```sig
ml.isDetected(ml.event.Unknown)
```

ML モデルは 1 秒間に数回、推定された行動を更新する。 この関数は、選択されたアクションが現在推定されている場合、「真」を返す。 ブーリアン値を使って、プログラムで論理的な判断を下す。

いくつかのプログラムは、「ML で開始」 と 「ML で停止」 イベント取扱機能を使った方が書きやすいでしょう。

## パラメータ

- **イベント**：機械学習モデルがトレーニングされたアクションの 1 つ。 特別な値「不明」は、認識点以上の確実性を持つアクションがない場合を表す。

## 戻る

- [ブーリアン](/型/ブーリアン)値で、ML アクションが推定されたアクションであれば 「真」、推定されたアクションでなければ 「偽」となります。

## 例

この例では、条件文がチェックされた時点で、推定されるアクションが`clapping`であれば、LED ディスプレイにティックアイコンを表示する。

```blocks
basic.forever(function () {
    if (ml.isDetected(ml.event.Clapping)) {
        basic.showIcon(IconNames.Yes)
    }
})
```

```package
machine-learning-help-stubs=github:microbit-foundation/pxt-microbit-ml-help-stubs#v0.0.1
machine-learning=github:microbit-foundation/pxt-microbit-ml#v1.0.4
```
