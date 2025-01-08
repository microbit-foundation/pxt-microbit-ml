# ML 시작 시

[event handler](/reference/event-handler)를 시작합니다(어떤 일이 일어날 때 실행되는 프로그램의 일부). 이 핸들러는 ML 모델의 추정되는 행동이 사용자가 선택한 행동으로 변경될 때 작동합니다.

```sig
ml.onStart(ml.event.Unknown, function () {
})
```

ML 모델은 추정되는 행동을 초당 여러 번 업데이트하지만, 이 이벤트 핸들러는 추정된 행동이 변경될 때만 실행됩니다.

## 매개 변수

- **이벤트**: 기계 학습 모델이 학습한 행동 중 하나 `알 수 없음`이라는 특수값은 인식 지점 이상의 확실성이 있는 행동이 없는 경우를 나타냅니다.

## 예시

이 예시에서는 인식 지점보다 `박수 치기` 행동의 확실성이 높을 때 백그라운드에서 음악 멜로디가 재생됩니다.

```blocks
ml.onStart(ml.event.Clapping, function () {
    music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Dadadadum), music.PlaybackMode.InBackground)
})
```

```package
machine-learning-help-stubs=github:microbit-foundation/pxt-microbit-ml-help-stubs#v0.0.1
machine-learning=github:microbit-foundation/pxt-microbit-ml#v1.0.6
```
