# đã được ML phát hiện

Xác định xem hành động do mô hình học máy nhận diện có phải là hành động dự đoán chính xác hay không.

```sig
ml.isDetected(ml.event.Unknown)
```

Mô hình học máy liên tục cập nhật hành động dự đoán nhiều lần trong mỗi giây. Hàm này trả về giá trị `true` khi hành động mà người dùng chọn đang được mô hình dự đoán là hành động chính xác. Sử dụng giá trị Boolean để kiểm tra điều kiện và thực hiện các quyết định trong chương trình.

Một số chương trình sẽ dễ viết hơn nếu sử dụng các trình xử lý sự kiện “khi ML bắt đầu” và “khi ML dừng” thay vì cách khác.

## Các thông số

- **event**: một hành động mà mô hình học máy đã được huấn luyện để nhận dạng. Giá trị đặc biệt `unknown` đại diện cho trường hợp không có hành động nào có độ tin cậy vượt quá ngưỡng nhận diện.

## Trả lại

- một giá trị [boolean](/types/boolean) trả về `true` nếu hành động ML là hành động được mô hình ước lượng, và `false` nếu hành động ML không phải là hành động được ước lượng.

## Ví dụ

Ví dụ này sẽ hiển thị biểu tượng dấu tích chữ V trên màn hình LED nếu hành động được ước lượng là `clapping` (vỗ tay) tại thời điểm câu lệnh điều kiện được kiểm tra.

```blocks
basic.forever(function () {
    if (ml.isDetected(ml.event.Clapping)) {
        basic.showIcon(IconNames.Yes)
    }
})
```

```package
machine-learning-help-stubs=github:microbit-foundation/pxt-microbit-ml-help-stubs#v0.0.1
machine-learning=github:microbit-foundation/pxt-microbit-ml#v1.0.15
```
