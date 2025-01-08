# certainty (%) ML

ML 작업에 대한 최신 확실성 값 얻기.

```sig
ml.getCertainty(ml.event.Unknown)
```

ML 모델은 초당 여러 번 실행되며 각 행동에 대한 확실성을 계산합니다. 예측한 행동은 확실성이 가장 높은 행동입니다. 어떤 행동의 확실성이 인식 지점(Recognition point)보다 낮다면 해당 행동은 추정되는 행동이 아닙니다. 어떤 프로그램에서는 확실성 수치를 표시하거나 기록하는 등 이 수치를 직접 사용해야 할 수 있습니다. 대부분의 프로그램은 확실성 수치 대신 추정되는 행동을 사용합니다.

## 매개 변수

- **이벤트**: 기계 학습 모델이 학습한 행동 중 하나

## 반환

- 0에서 100까지의 [number](/types/number)로 표시되는 백분율로, 수행하고 있는 행동에 대한 ML 모델의 확실성을 나타냅니다. '알 수 없음'의 확실성은 항상 0입니다.

## 예시

이 예시는 현재 행동이 매초 '박수'를 치고 있다는 ML 모델의 확실성을 백분율로 표시합니다.

```blocks
loops.everyInterval(1000, function () {
    basic.showNumber(ml.getCertainty(ml.event.Clapping))
})
```

```package
machine-learning-help-stubs=github:microbit-foundation/pxt-microbit-ml-help-stubs#v0.0.1
machine-learning=github:microbit-foundation/pxt-microbit-ml#v1.0.6
```
