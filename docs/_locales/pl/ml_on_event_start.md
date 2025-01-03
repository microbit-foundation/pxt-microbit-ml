# na rozpoczęcie ML

Rozpocznij [obsługę zdarzeń](/reference/event-handler) (część programu, która uruchomi się, gdy coś się stanie). Ten moduł obsługi działa, gdy szacowane działanie modelu ML zmieni się na działanie wybrane przez Ciebie.

```sig
ml.onStart(ml.event.Unknown, function () {
})
```

Model ML aktualizuje swoje szacowane działanie kilka razy na sekundę, ale ten system obsługi zdarzeń działa tylko wtedy, gdy szacowane działanie się zmienia.

## Parametry

- **zdarzenie**: jedna z akcji, na której trenowano model uczenia maszynowego. Wartość specjalna `unknown` reprezentuje przypadek, w którym żadna akcja nie ma pewności powyżej punktu rozpoznania.

## Przykład

Ten przykład odtwarza melodię muzyczną w tle, gdy akcja `klaskanie` ma pewność powyżej punktu rozpoznania.

```blocks
ml.onStart(ml.event.Clapping, function () {
    music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Dadadadum), music.PlaybackMode.InBackground)
})
```

```package
machine-learning-help-stubs=github:microbit-foundation/pxt-microbit-ml-help-stubs#v0.0.1
machine-learning=github:microbit-foundation/pxt-microbit-ml#v1.0.2
```
