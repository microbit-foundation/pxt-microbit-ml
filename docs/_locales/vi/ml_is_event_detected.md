# đã được ML phát hiện

Xác định xem hành động do mô hình học máy nhận diện có phải là hành động dự đoán chính xác hay không.

```sig
ml.isDetected(ml.event.Unknown)
```

Mô hình học máy liên tục cập nhật hành động dự đoán nhiều lần trong mỗi giây. Hàm này trả về giá trị true khi hành động mà người dùng chọn đang được mô hình dự đoán là hành động chính xác. Sử dụng giá trị Boolean để kiểm tra điều kiện và thực hiện các quyết định trong chương trình.

Some programs will be easier to write using the “on ML start” and “on ML stop” event handlers instead.

## Các thông số

- **event**: một hành động mà mô hình học máy đã được huấn luyện để nhận dạng. The special value `unknown` represents the case where no action has a certainty above the recognition point.

## Trả lại

- a [boolean](/types/boolean) value that is `true` if the ML action is the estimated action, `false` if the ML action is not the estimated action.

## Ví dụ

This example will show a tick icon on the LED display if the estimated action is `clapping` at the time the conditional statement is checked.

```blocks
basic.forever(function () {
    if (ml.isDetected(ml.event.Clapping)) {
        basic.showIcon(IconNames.Yes)
    }
})
```

```package
machine-learning-help-stubs=github:microbit-foundation/pxt-microbit-ml-help-stubs#v0.0.1
machine-learning=github:microbit-foundation/pxt-microbit-ml#v1.0.13
```
