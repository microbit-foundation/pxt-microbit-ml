# ML 停止時

啟動一個 [event handler](/reference/event-handler)（發生某件事情時將會執行的程式的一部分）。 當機器學習模型的預估動作從您選擇的動作改變時，這個處理程式將會執行。

```sig
ml.onStop(ml.event.Unknown, function () {
})
```

當動作變更時，將會執行前一個動作的停止事件處理程式，然後執行下一個動作的啟動事件處理程式。

例如，如果某個動作的啟動事件處理程式開始在背景播放音樂，則您可以利用停止事件處理程式來停止它。

## 參數

- **事件**：機器學習模型所受訓練的動作其中之一。 特殊值「未知」代表沒有任何動作具有高於辨識點的確定性的情況。

## 範例

當預估動作從「拍手」變更為任何其他動作時，這個範例停止播放音樂旋律。

```blocks
ml.onStop(ml.event.Clapping, function () {
    music.stopMelody(MelodyStopOptions.All)
})
```

```package
machine-learning-help-stubs=github:microbit-foundation/pxt-microbit-ml-help-stubs#v0.0.1
machine-learning=github:microbit-foundation/pxt-microbit-ml#v1.0.4
```
