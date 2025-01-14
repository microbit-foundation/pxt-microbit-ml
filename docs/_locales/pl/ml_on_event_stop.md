# przy zatrzymaniu ML

Rozpocznij [obsługę zdarzeń](/reference/event-handler) (część programu, która uruchomi się, gdy coś się stanie). Ten moduł obsługi działa, gdy szacowane działanie modelu ML zmieni się na działanie wybrane przez Ciebie.

```sig
ml.onStop(ml.event.Unknown, function () {
})
```

Gdy akcja się zmieni, program obsługi zdarzenia zatrzymania dla poprzedniej akcji zostanie uruchomiony, a następnie program obsługi zdarzenia rozpoczęcia dla następnej akcji.

Na przykład, jeśli obsługa zdarzenia start dla danej akcji powoduje odtwarzanie muzyki w tle, możesz użyć obsługi zdarzenia stop, aby ją zatrzymać.

## Parametry

- **zdarzenie**: jedna z akcji, na której trenowano model uczenia maszynowego. Wartość specjalna `unknown` reprezentuje przypadek, w którym żadna akcja nie ma pewności powyżej punktu rozpoznania.

## Przykład

Ten przykład zatrzymuje odtwarzanie melodii muzycznej, gdy szacowane działanie zmienia się z `klaskania` na jakąkolwiek inną akcję.

```blocks
ml.onStop(ml.event.Clapping, function () {
    music.stopMelody(MelodyStopOptions.All)
})
```

```package
machine-learning-help-stubs=github:microbit-foundation/pxt-microbit-ml-help-stubs#v0.0.1
machine-learning=github:microbit-foundation/pxt-microbit-ml#v1.0.4
```
