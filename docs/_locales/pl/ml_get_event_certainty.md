# pewność (%) ML

Pobiera najnowszą wartość pewności dla działania ML

```sig
ml.getCertainty(ml.event.Unknown)
```

Model ML działa kilka razy na sekundę i oblicza wartość pewności dla każdego działania. Oszacowanym działaniem jest działanie z najwyższą pewnością. Działanie nie może być działaniem szacowanym, jeżeli jego pewność jest niższa od punktu rozpoznania. Niektóre programy mogą wymagać użycia wartości pewności bezpośrednio, na przykład, aby je wyświetlić lub zarejestrować. Większość programów może wykorzystywać szacowane działanie zamiast wartości pewności.

## Parametry

- **zdarzenie**: jedna z akcji, na której trenowano model uczenia maszynowego.

## Wyniki

- procent jako [liczba](/types/number) od 0 do 100, reprezentujący pewność modelu ML, że jest to wykonywana czynność. Pewność dla `unknown` jest zawsze 0.

## Przykład

Ten przykład wyświetla pewność modelu ML w procentach, że bieżącą akcją jest `klaśnięcie` co sekundę.

```blocks
loops.everyInterval(1000, function () {
    basic.showNumber(ml.getCertainty(ml.event.Clapping))
})
```

```package
machine-learning-help-stubs=github:microbit-foundation/pxt-microbit-ml-help-stubs#v0.0.1
machine-learning=github:microbit-foundation/pxt-microbit-ml#v1.0.4
```
