# ML の が開始したとき

[イベント管理](/参照/イベント管理)（何かが起こったときに実行されるプログラムの一部）を開始する。 このハンドラは、ML モデルの推定アクションが、あなたが選択したアクションに変更されたときに動作します。

```sig
ml.onStart(ml.event.Unknown, function () {
})
```

ML モデルは 1 秒間に数回推定行動を更新するが、このイベント処理機能は推定行動が変化したときだけ実行される。

## パラメータ

- **イベント**：機械学習モデルがトレーニングされたアクションの 1 つ。 特別な値「不明」は、認識点以上の確実性を持つアクションがない場合を表す。

## 例

この例では、`clapping`というアクションが認識点以上の確度を持っているとき、バックグランドで音楽のメロディーを再生する。

```blocks
ml.onStart(ml.event.Clapping, function () {
    music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Dadadadum), music.PlaybackMode.InBackground)
})
```

```package
machine-learning-help-stubs=github:microbit-foundation/pxt-microbit-ml-help-stubs#v0.0.1
machine-learning=github:microbit-foundation/pxt-microbit-ml#v1.0.8
```
