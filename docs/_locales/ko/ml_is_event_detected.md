# ML이 감지되었나요?

ML이 행동을 예측했는지 확인합니다.

```sig
ml.isDetected(ml.event.Unknown)
```

ML 모델은 추정되는 행동을 1초에 여러 번 업데이트합니다. 이 함수는 선택된 동작이 현재 추정되는 경우 `true`를 반환합니다. 프로그램에서 논리적인 판단을 하려면 부울 값을 사용하세요.

대신 'ML 시작 시(on ML start)'와 'ML 중지 시(on ML stop)' 이벤트 핸들러를 사용하면 일부 프로그램에서 더 쉽게 작성할 수 있습니다.

## 매개 변수

- **이벤트**: 기계 학습 모델이 학습한 행동 중 하나 `알 수 없음`이라는 특수값은 인식 지점 이상의 확실성이 있는 행동이 없는 경우를 나타냅니다.

## 반환

- [boolean](/types/boolean) 값은 ML 행동이 추정되는 행동인 경우 '참'이고, ML 행동이 추정되는 행동이 아닌 경우 '거짓'입니다.

## 예시

이 예시에서는 조건문이 확인될 때 추정되는 행동이 `박수 치기`인 경우 LED 디스플레이에 체크 표시 아이콘이 표시됩니다.

```blocks
basic.forever(function () {
    if (ml.isDetected(ml.event.Clapping)) {
        basic.showIcon(IconNames.Yes)
    }
})
```

```package
machine-learning-help-stubs=github:microbit-foundation/pxt-microbit-ml-help-stubs#v0.0.1
machine-learning=github:microbit-foundation/pxt-microbit-ml#v1.0.6
```
