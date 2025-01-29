# ML が を検出したとき

ML のアクションが推定されたアクションかどうかをチェックします。

```sig
ml.isDetected(ml.event.Unknown)
```

ML モデルは 1 秒間に数回、推定された行動を更新します。 この関数は、選択されたアクションが現在推定されている場合、「真」を返します。 論理値を使って、プログラムで論理的な判断を下します。

いくつかのプログラムは、「ML で開始」 と 「ML で停止」 イベント取扱機能を使った方が書きやすいでしょう。

## パラメータ

- **イベント**：機械学習モデルがトレーニングされたアクションの 1 つ。 特別な値「不明」は、認識点以上の確実性を持つアクションがない場合を表します。

## 戻る

- [論理](/types/boolean) 値が「真」であるなら、ML アクションが推定されたアクションであり、「偽」であれば推定されたアクションでないということです。

## 例

この例では、条件文がチェックされた時点で、推定されるアクションが`clapping`であれば、LED ディスプレイにティックアイコンを表示します。

```blocks
basic.forever(function () {
    if (ml.isDetected(ml.event.Clapping)) {
        basic.showIcon(IconNames.Yes)
    }
})
```

```package
machine-learning-help-stubs=github:microbit-foundation/pxt-microbit-ml-help-stubs#v0.0.1
machine-learning=github:microbit-foundation/pxt-microbit-ml#v1.0.8
```
