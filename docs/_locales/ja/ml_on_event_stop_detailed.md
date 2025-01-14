# ML を停止

[イベント管理](/参照/イベント管理)（何かが起こったときに実行されるプログラムの一部）を開始する。 このハンドラは、ML モデルの推定アクションが、あなたが選択したアクションから変更されたときに動作します。

```sig
ml.onStopDetailed(ml.event.Unknown, function (duration) {
})
```

アクションが変更されると、前のアクションのイベント停止処理が実行され、続いて次のアクションに向けたイベント開始処理が実行される。

例えば、あるアクションの開始イベントハンドラがバックグラウンドで音楽再生を開始した場合、停止イベントハンドラを使って停止させることができる。

イベントハンドラには「持続時間」パラメータが渡される。 持続時間は、このアクションが推定アクションになってからのミリ秒の[数値](/型/数値)である。 例えば、duration パラメータを表示したり、実行中の合計を保持するために変数を使用するなど、コード内で使用することができます。

## パラメータ

- **イベント**：機械学習モデルがトレーニングされたアクションの 1 つ。 特別な値「不明」は、認識点以上の確実性を持つアクションがない場合を表す。

## 例

この例では、推定動作が `clapping` から他の動作に変わったときに、推定動作が `clapping`していた時間を秒単位で LED ディスプレイに表示します。

```blocks
ml.onStopDetailed(ml.event.Clapping, function (duration) {
    basic.showNumber(duration / 1000)
})
```

```package
machine-learning-help-stubs=github:microbit-foundation/pxt-microbit-ml-help-stubs#v0.0.1
machine-learning=github:microbit-foundation/pxt-microbit-ml#v1.0.4
```
