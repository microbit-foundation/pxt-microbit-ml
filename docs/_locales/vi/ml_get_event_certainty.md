# độ tin cậy (%) (ML)

Lấy giá trị độ tin cậy mới nhất cho một hành động học máy (ML).

```sig
ml.getCertainty(ml.event.Unknown)
```

Mô hình học máy được chạy nhiều lần mỗi giây để tính toán độ tin cậy cho từng hành động. Hành động mà mô hình dự đoán là hành động có độ tin cậy cao nhất. Hành động sẽ không được mô hình chọn làm hành động dự đoán nếu độ tin cậy thấp hơn ngưỡng nhận dạng. Một số chương trình có thể cần truy cập trực tiếp các giá trị độ tin cậy, chẳng hạn để hiển thị hoặc ghi lại trong nhật ký. Phần lớn các chương trình chỉ cần dùng hành động mà mô hình dự đoán, thay vì làm việc trực tiếp với các giá trị độ tin cậy.

## Các thông số

- **event**: một hành động mà mô hình học máy đã được huấn luyện để nhận dạng.

## Trả lại

- Một giá trị phần trăm (0–100) [number](/types/number) cho biết mức độ tin cậy của mô hình học máy rằng hành động này đang được thực hiện. Mức độ tin cậy của `unknown` luôn luôn là 0.

## Ví dụ

Ví dụ này hiển thị, theo phần trăm, mức độ tin cậy của mô hình học máy rằng hành động đang diễn ra là vỗ tay, cập nhật mỗi giây.

```blocks
loops.everyInterval(1000, function () {
    basic.showNumber(ml.getCertainty(ml.event.Clapping))
})
```

```package
machine-learning-help-stubs=github:microbit-foundation/pxt-microbit-ml-help-stubs#v0.0.1
machine-learning=github:microbit-foundation/pxt-microbit-ml#v1.0.13
```
