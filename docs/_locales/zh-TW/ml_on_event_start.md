# 當機器學習啟動時

啟動一個 [event handler](/reference/event-handler)（發生某件事情時將會執行的程式的一部分）。 當機器學習模型的預估動作變更為您選擇的動作時，這個處理程式將會執行。

```sig
ml.onStart(ml.event.Unknown, function () {
})
```

機器學習模型每秒鐘會多次更新其預估動作，但是這個事件處理程式只有在當預估動作改變時才會執行。

## 參數

- **事件**：機器學習模型所受訓練的動作其中之一。 特殊值「未知」代表沒有任何動作具有高於辨識點的確定性的情況。

## 範例

當「拍手」動作具有高於辨識點的確定性時，這個範例會在背景中播放音樂旋律。

```blocks
機器學習.onStart(機器學習.event.Clapping, function () {
    music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Dadadadum), music.PlaybackMode.InBackground)
})
```

```package
machine-learning-help-stubs=github:microbit-foundation/pxt-microbit-ml-help-stubs#v0.0.1
machine-learning=github:microbit-foundation/pxt-microbit-ml#v1.0.2
```
