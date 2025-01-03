# czy wykryto ML

Sprawdza, czy działanie ML jest działaniem szacunkowym.

```sig
ml.isDetected(ml.event.Unknown)
```

Model ML aktualizuje swoją szacunkową akcję kilka razy na sekundę. Ta funkcja zwraca `true`, jeśli wybrana akcja jest obecnie szacowana. Użyj wartości logicznej do podejmowania decyzji logicznych w swoim programie.

Niektóre programy będą łatwiejsze do napisania przy użyciu obsługi zdarzeń „on ML start” i „on ML stop”.

## Parametry

- **zdarzenie**: jedna z akcji, na której trenowano model uczenia maszynowego. Wartość specjalna `unknown` reprezentuje przypadek, w którym żadna akcja nie ma pewności powyżej punktu rozpoznania.

## Wyniki

- wartość [logiczna](/types/boolean), która jest `true`, jeśli akcja ML jest szacowaną akcją, `false`, jeśli akcja ML nie jest szacowanym działaniem.

## Przykład

Ten przykład wyświetli ikonę potwierdzenia na wyświetlaczu LED, jeśli szacowana akcja to `klaskanie` w momencie sprawdzania instrukcji warunkowej.

```blocks
basic.forever(function () {
    if (ml.isDetected(ml.event.Clapping)) {
        basic.showIcon(IconNames.Yes)
    }
})
```

```package
machine-learning-help-stubs=github:microbit-foundation/pxt-microbit-ml-help-stubs#v0.0.1
machine-learning=github:microbit-foundation/pxt-microbit-ml#v1.0.4
```
