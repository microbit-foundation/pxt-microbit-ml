# khi ML bắt đầu

Bắt đầu một [event handler](/reference/event-handler) (phần của chương trình sẽ chạy khi có sự kiện xảy ra). Trình xử lý này hoạt động khi hành động được mô hình ML ước lượng thay đổi thành hành động mà bạn chọn.

```sig
ml.onStart(ml.event.Unknown, function () {
})
```

Mô hình ML cập nhật hành động ước lượng nhiều lần mỗi giây, nhưng trình xử lý sự kiện này chỉ chạy khi hành động ước lượng thay đổi.

## Các thông số

- **event**: một hành động mà mô hình học máy đã được huấn luyện để nhận dạng. Giá trị đặc biệt `unknown` đại diện cho trường hợp không có hành động nào có độ tin cậy vượt quá ngưỡng nhận diện.

## Ví dụ

Ví dụ này phát một giai điệu nhạc nền khi hành động `clapping` (vỗ tay) có độ tin cậy vượt quá ngưỡng nhận diện.

```blocks
ml.onStart(ml.event.Clapping, function () {
    music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Dadadadum), music.PlaybackMode.InBackground)
})
```

```package
machine-learning-help-stubs=github:microbit-foundation/pxt-microbit-ml-help-stubs#v0.0.1
machine-learning=github:microbit-foundation/pxt-microbit-ml#v1.0.13
```
