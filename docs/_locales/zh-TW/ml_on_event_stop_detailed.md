# ML 停止時

啟動一個 [event handler](/reference/event-handler)（發生某件事情時將會執行的程式的一部分）。 當機器學習模型的預估動作從您選擇的動作改變時，這個處理程式將會執行。

```sig
ml.onStopDetailed(ml.event.Unknown, function (duration) {
})
```

當動作變更時，將會執行前一個動作的停止事件處理程式，然後執行下一個動作的啟動事件處理程式。

例如，如果某個動作的啟動事件處理程式開始在背景播放音樂，則您可以利用停止事件處理程式來停止它。

事件處理程式傳遞一個「duration」參數。 這個 duration（持續時間）是自這個動作成為預估動作以來的 [number](/types/number) 毫秒數。 您可以在您的程式碼中使用 duration 參數，例如顯示該值或用變數記錄總時間。

## 參數

- **事件**：機器學習模型所受訓練的動作其中之一。 特殊值「未知」代表沒有任何動作具有高於辨識點的確定性的情況。

## 範例

此範例在 LED 顯示器上以秒為單位顯示出當預估動作從「拍手」改變成任何其他動作時預估動作為「拍手」有多長的時間。

```blocks
ml.onStopDetailed(ml.event.Clapping, function (duration) {
    basic.showNumber(duration / 1000)
})
```

```package
machine-learning-help-stubs=github:microbit-foundation/pxt-microbit-ml-help-stubs#v0.0.1
machine-learning=github:microbit-foundation/pxt-microbit-ml#v1.0.8
```
