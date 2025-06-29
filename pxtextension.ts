//% fixedInstances
//% blockNamespace=ml
class MlEvent {
  eventValue: number;
  eventLabel: string;
  lastDuration: number;
  onStartHandler: () => void;
  onStopHandler: () => void;
  onStopDetailedHandler: (duration: number) => void;

  constructor(value: number, label: string) {
    this.eventValue = value;
    this.eventLabel = label;
    this.lastDuration = 0;
  }
}

//% color=#2b64c3 weight=120 icon="\uf108" block="Machine Learning" advanced=false
namespace ml {
  //% blockNamespace=ml
  export namespace event {
    //% fixedInstance block="unknown"
    export const Unknown = new MlEvent(1, "unknown");
  }

  export let events = [event.Unknown];
  let prevEvent: MlEvent | undefined;
  let currentEvent: MlEvent = event.Unknown;
  let lastEventTimestamp: number = 0;

  export function maybeUpdateEventStats(currentEvent: MlEvent) {
    const now = input.runningTime();
    if (!prevEvent) {
      lastEventTimestamp = now;
      prevEvent = currentEvent;
      return;
    }
    if (currentEvent !== prevEvent) {
      prevEvent.lastDuration = now - lastEventTimestamp;

      if (prevEvent.onStopDetailedHandler) {
        prevEvent.onStopDetailedHandler(prevEvent.lastDuration);
      }

      if (prevEvent.onStopHandler) {
        prevEvent.onStopHandler();
      }

      lastEventTimestamp = now;
      prevEvent = currentEvent;
    }
  }

  /**
   * Do something when an ML event is detected.
   * @param event one of the actions the machine learning model was trained on
   * @param body code to execute
   */
  //% blockId=ml_on_event_start
  //% block="on ML $event start"
  //% weight=50
  //% parts="v2"
  //% group="micro:bit (V2)"
  //% help=github:machine-learning/docs/ml_on_event_start
  export function onStart(event: MlEvent, body: () => void): void {
    event.onStartHandler = body;
    const wrappedBody = () => {
      if (prevEvent !== event) {
        maybeUpdateEventStats(event);
        body();
      }
    };
    if (!isRunning()) {
      startRunning();
    }
    // The sim probably won't respect the DropIfBusy flag.
    control.onEvent(
      MlRunnerIds.MlRunnerInference,
      event.eventValue,
      wrappedBody,
      EventFlags.DropIfBusy
    );
  }

  /**
   * Do something when an ML event is no longer detected.
   * @param event one of the actions the machine learning model was trained on
   * @param body code to execute
   */
  //% blockId=ml_on_event_stop
  //% block="on ML $event stop"
  //% weight=40
  //% parts="v2"
  //% group="micro:bit (V2)"
  //% help=github:machine-learning/docs/ml_on_event_stop
  export function onStop(event: MlEvent, body: () => void): void {
    if (!isRunning()) {
      startRunning();
    }
    event.onStopHandler = body;
  }

  /**
   * Do something when an ML event is no longer detected.
   * @param event one of the actions the machine learning model was trained on
   * @param body code to execute
   */
  //% blockId=ml_on_event_stop_detailed
  //% block="on ML $event stop $duration (ms)"
  //% weight=30
  //% draggableParameters="reporter"
  //% parts="v2"
  //% group="micro:bit (V2)"
  //% help=github:machine-learning/docs/ml_on_event_stop_detailed
  export function onStopDetailed(
    event: MlEvent,
    body: (duration: number) => void
  ): void {
    if (!isRunning()) {
      startRunning();
    }
    event.onStopDetailedHandler = body;
  }

  /**
   * Tests if an ML event is currently detected.
   * @param event one of the actions the machine learning model was trained on
   */
  //% blockId=ml_is_event_detected
  //% block="is ML $event detected"
  //% weight=20
  //% parts="v2"
  //% group="micro:bit (V2)"
  //% help=github:machine-learning/docs/ml_is_event_detected
  export function isDetected(event: MlEvent): boolean {
    if (!isRunning()) {
      startRunning();
      return false;
    }
    return event.eventValue == currentEventId();
  }

  /**
   * Get the certainty of an ML event in percent (0 to 100).
   * @param event one of the actions the machine learning model was trained on
   */
  //% blockId=ml_on_event_certainty
  //% block="certainty (\\%) ML $event"
  //% weight=10
  //% parts="v2"
  //% help=github:machine-learning/docs/ml_get_event_certainty
  export function getCertainty(event: MlEvent): number {
    if (!isRunning()) {
      startRunning();
      return 0;
    }
    const eventValue = event.eventValue;
    if (eventValue <= 1) {
      // `unknown` can't have a certainty.
      return 0;
    }
    return getCertaintyInternal(event.eventValue);
  }

  //% shim=mlrunner::currentEventCertainty
  function getCertaintyInternal(eventValue: number): number {
    if (eventValue === currentEvent.eventValue) {
      return 100;
    }
    return 0;
  }

  export let getModelBlob: () => Buffer;
  let simIsRunning = false;

  /**
   * TS shim for C++ function init(), which initialize the ML model with
   * an address to a model blob.
   *
   * @param modelBlob The model blob to initialize the ML model with.
   */
  //% shim=mlrunner::init
  function initRunner(modelBlob: Buffer): void {
    return;
  }

  /**
   * Configure the ML model, start capturing accelerometer data, and run
   * the model in the background.
   */
  export function startRunning(): void {
    let modelBlob = hex``;
    // The model blob should be re-generated by the MakeCode extension
    if (typeof getModelBlob === "function") {
      modelBlob = getModelBlob() || hex``;
    }
    initRunner(modelBlob);
    simIsRunning = true;
  }

  /**
   * Check if the ML model is currently running in the background.
   */
  //% shim=mlrunner::isModelRunning
  function isRunning(): boolean {
    return simIsRunning;
  }

  //% shim=mlrunner::currentEventId
  function currentEventId(): number {
    return currentEvent.eventValue;
  }

  // Start simulator code.
  type SimulatorMessageType =
    | "register"
    | "data"
    | "request_data"
    | "simulate_event";

  interface SimulatorMessage {
    type: SimulatorMessageType;
    data?: any;
  }

  const simChannel = "microbit-foundation/pxt-microbit-ml";

  //% shim=TD_NOOP
  function simulatorRegister(): void {
    const msg: SimulatorMessage = {
      type: "register",
    };
    control.simmessages.onReceived(simChannel, handleMessage);
    simulatorSendMessage(msg);
  }

  export function simulatorSendData(): void {
    if (!events) {
      return;
    }
    const eventLabels = events.map((event) => ({
      name: event.eventLabel,
      value: event.eventValue,
    }));
    const msg: SimulatorMessage = {
      type: "data",
      data: eventLabels,
    };
    simulatorSendMessage(msg);
  }

  //% shim=TD_NOOP
  function simulatorSendMessage(msg: SimulatorMessage): void {
    const payload = Buffer.fromUTF8(JSON.stringify(msg));
    control.simmessages.send(simChannel, payload, false);
  }

  function simulateEvent(eventValue: number) {
    const simulatedEvent = events.find(
      (event) => event.eventValue === eventValue
    );
    currentEvent = simulatedEvent;
    // This will run the MLEvent onEvent block if it exists in the user's code.
    // Otherwise, control.onEvent in autogenerated.ts is fired.
    control.raiseEvent(MlRunnerIds.MlRunnerInference, eventValue);
  }

  function handleMessage(buffer: Buffer) {
    const msg: SimulatorMessage = JSON.parse(buffer.toString());
    switch (msg.type) {
      case "request_data": {
        simulatorSendData();
        break;
      }
      case "simulate_event": {
        if (typeof msg.data === "number") {
          simulateEvent(msg.data);
        }
      }
    }
  }

  simulatorRegister();
  // End simulator code.
}
