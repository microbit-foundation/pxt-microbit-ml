# ML 중지 시

[event handler](/reference/event-handler)를 시작합니다(어떤 일이 일어날 때 실행되는 프로그램의 일부). 이 핸들러는 ML 모델의 추정 행동이 사용자가 선택한 행동에서 변경될 때 작동합니다.

```sig
ml.onStop(ml.event.Unknown, function () {
})
```

행동이 변경되면 이전 행동에 대한 정지 이벤트 핸들러가 실행된 후, 다음 행동에 대한 시작 이벤트 핸들러가 실행됩니다.

예를 들어, 행동에 대한 시작 이벤트 핸들러가 백그라운드에서 음악을 재생하기 시작하면 중지 이벤트 핸들러로 이를 멈출 수 있습니다.

## 매개 변수

- **이벤트**: 기계 학습 모델이 학습한 행동 중 하나 `알 수 없음`이라는 특수값은 인식 지점 이상의 확실성이 있는 행동이 없는 경우를 나타냅니다.

## 예시

이 예시에서는 추정되는 행동이 '박수 치기'에서 다른 행동으로 변경되면 음악 멜로디 재생이 멈춥니다.

```blocks
ml.onStop(ml.event.Clapping, function () {
    music.stopMelody(MelodyStopOptions.All)
})
```

```package
machine-learning-help-stubs=github:microbit-foundation/pxt-microbit-ml-help-stubs#v0.0.1
machine-learning=github:microbit-foundation/pxt-microbit-ml#v1.0.4
```
