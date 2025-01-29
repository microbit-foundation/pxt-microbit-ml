# ML が停止したとき

[イベント](/reference/event-handler)（何かが起こったときに実行されるプログラムの一部）を開始しましょう。 この関数は、ML モデルの推定アクションが、あなたが選択したアクションから変更されたときに動作します。

```sig
ml.onStop(ml.event.Unknown, function () {
})
```

アクションが変わると、前のアクションのイベント処理が停止され、続いて次のアクションのイベント処理が開始されます。

例えば、あるアクションのイベント処理としてバックグラウンドで音楽再生がはじまったときに、それを止めるためのイベントを起こして音楽を停止させることができます。

## パラメータ

- **イベント**：機械学習モデルがトレーニングされたアクションの 1 つ。 特別な値「不明」は、認識点以上の確実性を持つアクションがない場合を表します。

## 例

この例では、推定されるアクションが `clapping` から他のアクションに変わったときに、音楽の再生を止めます。

```blocks
ml.onStop(ml.event.Clapping, function () {
    music.stopMelody(MelodyStopOptions.All)
})
```

```package
machine-learning-help-stubs=github:microbit-foundation/pxt-microbit-ml-help-stubs#v0.0.1
machine-learning=github:microbit-foundation/pxt-microbit-ml#v1.0.8
```
