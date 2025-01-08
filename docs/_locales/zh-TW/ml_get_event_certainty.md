# certainty (%) ML

取得機器學習動作的最新確定性數值。

```sig
ml.getCertainty(ml.event.Unknown)
```

機器學習模型每秒執行多次，並且計算各個動作的確定性數值。 預估動作是具有最高確定性的動作。 當某個動作的確定性低於辨識點時，它就不能成為預估動作。 有些程式可能需要直接地使用確定性數值，例如顯示或記錄這些數據。 大多數程式可以使用預估動作來取代確定性數值。

## 參數

- **事件**：機器學習模型所受訓練的動作其中之一。

## 返回

- 一個 0 到 100 之間的 [number](/types/number) 百分比，其表示機器學習模型對於這是正在進行的動作的確定程度。 「未知」的確定性始終為 0。

## 範例

這個範例顯示機器學習模型每秒鐘對於目前動作為「拍手」的確定性，依百分比表示。

```blocks
loops.everyInterval(1000, function () {
    basic.showNumber(ml.getCertainty(ml.event.Clapping))
})
```

```package
machine-learning-help-stubs=github:microbit-foundation/pxt-microbit-ml-help-stubs#v0.0.1
machine-learning=github:microbit-foundation/pxt-microbit-ml#v1.0.6
```
