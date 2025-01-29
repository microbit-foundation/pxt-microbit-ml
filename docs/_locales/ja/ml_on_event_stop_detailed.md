# ML が停止したとき

[イベント](/reference/event-handler)（何かが起こったときに実行されるプログラムの一部）を開始しましょう。 この関数は、ML モデルの推定アクションが、あなたが選択したアクションから変更されたときに動作します。

```sig
ml.onStopDetailed(ml.event.Unknown, function (duration) {
})
```

アクションが変わると、前のアクションのイベント処理が停止され、続いて次のアクションのイベント処理が開始されます。

例えば、あるアクションのイベント処理としてバックグラウンドで音楽再生がはじまったときに、それを止めるためのイベントを起こして音楽を停止させることができます。

イベント関数には「持続時間」パラメータが渡されます。 持続時間は、この動作が推定アクションになってからのミリ秒の[数値](/types/number)である。 例えば持続時間を表示させたり、持続時間の合計を記録するのに変数を使ったりして、プログラムの中で持続時間のパラメータを使うこともできます。

## パラメータ

- **イベント**：機械学習モデルがトレーニングされたアクションの 1 つ。 特別な値「不明」は、認識点以上の確実性を持つアクションがない場合を表します。

## 例

この例では、推定動作が `clapping` から他の動作に変わったときに、推定動作が `clapping`していた時間を秒単位で LED ディスプレイに表示します。

```blocks
ml.onStopDetailed(ml.event.Clapping, function (duration) {
    basic.showNumber(duration / 1000)
})
```

```package
machine-learning-help-stubs=github:microbit-foundation/pxt-microbit-ml-help-stubs#v0.0.1
machine-learning=github:microbit-foundation/pxt-microbit-ml#v1.0.8
```
