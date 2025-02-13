# ML の が開始したとき

[イベント](/reference/event-handler)（何かが起こったときに実行されるプログラムの一部）を開始しましょう。 この関数は、ML モデルの推定アクションが、あなたが選択したアクションから変更されたときに動作します。

```sig
ml.onStart(ml.event.Unknown, function () {
})
```

ML モデルは推定されたアクションを 1 秒間に数回更新しますが、このイベント関数は推定されたアクションが変更されたときにのみ実行されます。

## パラメータ

- **イベント**：機械学習モデルがトレーニングされたアクションの 1 つ。 特別な値「不明」は、認識点以上の確実性を持つアクションがない場合を表します。

## 例

この例では、`clapping`というアクションが認識点以上に確度が高いときに、バックグランドで音楽を再生します。

```blocks
ml.onStart(ml.event.Clapping, function () {
    music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Dadadadum), music.PlaybackMode.InBackground)
})
```

```package
machine-learning-help-stubs=github:microbit-foundation/pxt-microbit-ml-help-stubs#v0.0.1
machine-learning=github:microbit-foundation/pxt-microbit-ml#v1.0.8
```
