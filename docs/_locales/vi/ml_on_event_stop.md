# khi ML dừng

Bắt đầu một [event handler](/reference/event-handler) (phần của chương trình sẽ chạy khi có sự kiện xảy ra). Trình xử lý này hoạt động khi hành động được mô hình ML ước lượng thay đổi từ hành động mà bạn chọn.

```sig
ml.onStop(ml.event.Unknown, function () {
})
```

Khi một hành động thay đổi, trình xử lý sự kiện dừng của hành động trước đó sẽ chạy, sau đó trình xử lý sự kiện bắt đầu của hành động tiếp theo sẽ chạy.

Ví dụ, nếu trình xử lý sự kiện bắt đầu của một hành động phát nhạc nền, bạn có thể dùng trình xử lý sự kiện dừng để dừng nó lại.

## Các thông số

- **event**: một hành động mà mô hình học máy đã được huấn luyện để nhận dạng. Giá trị đặc biệt `unknown` đại diện cho trường hợp không có hành động nào có độ tin cậy vượt quá ngưỡng nhận diện.

## Ví dụ

Ví dụ này dừng phát một giai điệu nhạc khi hành động được ước lượng thay đổi từ `clapping` (vỗ tay) sang bất kỳ hành động nào khác.

```blocks
ml.onStop(ml.event.Clapping, function () {
    music.stopMelody(MelodyStopOptions.All)
})
```

```package
machine-learning-help-stubs=github:microbit-foundation/pxt-microbit-ml-help-stubs#v0.0.1
machine-learning=github:microbit-foundation/pxt-microbit-ml#v1.0.13
```
