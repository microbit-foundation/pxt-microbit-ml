# 是否偵測到機器學習

檢查機器學習動作是否為預估動作。

```sig
ml.isDetected(ml.event.Unknown)
```

機器學習模型每秒多次更新其預估動作。 如果所選動作為目前所預估動作，則這個函式傳回「true」。 使用布林值在您的程式中做出邏輯判斷。

有些程式則是另外利用「機器學習啟動時」和「機器學習停止時」事件處理程序來寫入會比較簡單。

## 參數

- **事件**：機器學習模型所受訓練的動作其中之一。 特殊值「未知」代表沒有任何動作具有高於辨識點的確定性的情況。

## 返回值

- 一個 [boolean](/types/boolean) 數值，如果機器學習動作是預估動作，則為「true」；如果機器學習動作不是預估動作，則為「false」。

## 範例

如果當檢查條件陳述式時所預估動作是「拍手」，則這個範例將會在 LED 顯示器上顯示勾號圖示。

```blocks
basic.forever(function () {
    if (機器學習.isDetected(機器學習.event.Clapping)) {
        basic.showIcon(IconNames.Yes)
    }
})
```

```package
machine-learning-help-stubs=github:microbit-foundation/pxt-microbit-ml-help-stubs#v0.0.1
machine-learning=github:microbit-foundation/pxt-microbit-ml#v1.0.2
```
