# przy ML stop

Rozpocznij [obsługę zdarzeń](/reference/event-handler) (część programu, która uruchomi się, gdy coś się stanie). Ten moduł obsługi działa, gdy szacowane działanie modelu ML zmieni się na działanie wybrane przez Ciebie.

```sig
ml.onStopDetailed(ml.event.Unknown, function (duration) {
})
```

Gdy akcja się zmieni, program obsługi zdarzenia zatrzymania dla poprzedniej akcji zostanie uruchomiony, a następnie program obsługi zdarzenia rozpoczęcia dla następnej akcji.

Na przykład, jeśli obsługa zdarzenia start dla danej akcji powoduje odtwarzanie muzyki w tle, możesz użyć obsługi zdarzenia stop, aby ją zatrzymać.

Do obsługi zdarzeń przekazywany jest parametr `duration`. Czas trwania to [liczba](/types/number) milisekund, ponieważ ta akcja stała się działaniem szacunkowym. Możesz użyć parametru czasu trwania w swoim kodzie, na przykład wyświetlając go lub używając zmiennej, aby zachować sumę bieżącą.

## Parametry

- **zdarzenie**: jedna z akcji, na której trenowano model uczenia maszynowego. Wartość specjalna `unknown` reprezentuje przypadek, w którym żadna akcja nie ma pewności powyżej punktu rozpoznania.

## Przykład

Ten przykład pokazuje na wyświetlaczu LED, w sekundach, jak długo szacowaną akcją było `klaskanie`, kiedy szacowane działanie zmienia się z `klaskania` na inne działanie.

```blocks
ml.onStopDetailed(ml.event.Clapping, function (duration) {
    basic.showNumber(duration / 1000)
})
```

```package
machine-learning-help-stubs=github:microbit-foundation/pxt-microbit-ml-help-stubs#v0.0.1
machine-learning=github:microbit-foundation/pxt-microbit-ml#v1.0.4
```
