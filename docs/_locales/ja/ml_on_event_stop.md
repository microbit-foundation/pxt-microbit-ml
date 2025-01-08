# ML 上で停止

[イベント管理](/参照/イベント管理)（何かが起こったときに実行されるプログラムの一部）を開始する。 このハンドラは、ML モデルの推定アクションが、あなたが選択したアクションから変更されたときに動作します。

```sig
ml.onStop(ml.event.Unknown, function () {
})
```

アクションが変更されると、前のアクションのイベント停止処理が実行され、続いて次のアクションに向けたイベント開始処理が実行される。

例えば、あるアクションのイベント開始処理がバックグラウンドで音楽再生を開始した場合、イベント停止処理を使って停止させることができる。

## パラメータ

- **イベント**：機械学習モデルがトレーニングされたアクションの 1 つ。 特別な値「不明」は、認識点以上の確実性を持つアクションがない場合を表す。

## 例

この例では、推定されるアクションが「拍手」から他のアクションに変わったときに、音楽のメロディーの再生を止める。

```blocks
ml.onStop(ml.event.Clapping, function () {
    music.stopMelody(MelodyStopOptions.All)
})
```

```package
machine-learning-help-stubs=github:microbit-foundation/pxt-microbit-ml-help-stubs#v0.0.1
machine-learning=github:microbit-foundation/pxt-microbit-ml#v1.0.4
```
