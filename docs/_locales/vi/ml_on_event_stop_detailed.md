# khi ML dừng

Bắt đầu một [event handler](/reference/event-handler) (phần của chương trình sẽ chạy khi có sự kiện xảy ra). Trình xử lý này hoạt động khi hành động được mô hình ML ước lượng thay đổi từ hành động mà bạn chọn.

```sig
ml.onStopDetailed(ml.event.Unknown, function (duration) {
})
```

Khi một hành động thay đổi, trình xử lý sự kiện dừng của hành động trước đó sẽ chạy, sau đó trình xử lý sự kiện bắt đầu của hành động tiếp theo sẽ chạy.

Ví dụ, nếu trình xử lý sự kiện bắt đầu của một hành động phát nhạc nền, bạn có thể dùng trình xử lý sự kiện dừng để dừng nó lại.

Trình xử lý sự kiện được truyền tham số `duration` (thời lượng). Thời lượng là [number](/types/number) mili giây kể từ khi hành động này trở thành hành động được ước lượng. Bạn có thể dùng tham số thời lượng trong mã lệnh, ví dụ để hiển thị hoặc dùng một biến để lưu tổng thời gian tích lũy.

## Các thông số

- **event**: một hành động mà mô hình học máy đã được huấn luyện để nhận dạng. Giá trị đặc biệt `unknown` đại diện cho trường hợp không có hành động nào có độ tin cậy vượt quá ngưỡng nhận diện.

## Ví dụ

Ví dụ này hiển thị trên màn hình LED (tính bằng giây) thời gian mà hành động được ước lượng là `clapping` (vỗ tay), khi hành động được ước lượng thay đổi từ `clapping` (vỗ tay) sang bất kỳ hành động nào khác.

```blocks
ml.onStopDetailed(ml.event.Clapping, function (duration) {
    basic.showNumber(duration / 1000)
})
```

```package
machine-learning-help-stubs=github:microbit-foundation/pxt-microbit-ml-help-stubs#v0.0.1
machine-learning=github:microbit-foundation/pxt-microbit-ml#v1.0.15
```
