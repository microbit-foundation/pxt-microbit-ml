//% fixedInstances
//% blockNamespace=ml
class MlEvent {
  eventValue: number;
  eventLabel: string;
  lastDuration: number;
  onStopHandler: (duration: number) => void;

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
  let prevEventInstance: MlEvent = event.Unknown;
  let currentEvent: MlEvent = event.Unknown;
  let lastEventTimestamp: number = 0;

  export function maybeUpdateEventStats(currentEvent: MlEvent) {
    if (currentEvent !== prevEventInstance) {
      let now = input.runningTime();
      prevEventInstance.lastDuration = now - lastEventTimestamp;

      if (prevEventInstance.onStopHandler) {
        prevEventInstance.onStopHandler(prevEventInstance.lastDuration);
      }

      lastEventTimestamp = now;
      prevEventInstance = currentEvent;
    }
  }

  const deviceIsSim = control.deviceName().slice(0, 3) === "sim";

  /**
   * Run this code when the model detects the input label has been predicted.
   *
   * This automatically starts running the ML model in the background.
   * When the model predicts the indicated label, an event is raised to
   * trigger this handler.
   *
   * @param mlEvent The label event that triggers this code to run.
   * @param body The code to run when the model predicts the label.
   */
  //% blockId=ml_on_event_start
  //% block="on ML $event start"
  //% weight=40
  //% parts="v2"
  //% group="micro:bit (V2)"
  export function onStart(event: MlEvent, body: () => void): void {
    const wrappedBody = () => {
      if (prevEventInstance !== event || deviceIsSim) {
        body();
      }
      if (prevEventInstance !== event && deviceIsSim) {
        maybeUpdateEventStats(event);
      }
    };
    if (!isRunning()) {
      startRunning();
    }
    mlRunnerCustomOnEvent(
      MlRunnerIds.MlRunnerInference,
      event.eventValue,
      wrappedBody
    );
  }

  //% blockId=ml_on_event_stop
  //% block="on ML $event stop after $duration (ms)"
  //% weight=30
  //% draggableParameters="reporter"
  //% parts="v2"
  //% group="micro:bit (V2)"
  export function onStop(
    event: MlEvent,
    body: (duration: number) => void
  ): void {
    if (!isRunning()) {
      startRunning();
    }
    event.onStopHandler = body;
  }

  //% blockId=ml_on_event_certainty
  //% block="certainty (\\%) ML $event"
  //% weight=20
  //% parts="v2"
  //% group="micro:bit (V2)"
  export function getCertainty(event: MlEvent): number {
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

  //% blockId=ml_is_event_detected
  //% block="is ML $event detected"
  //% weight=10
  //% parts="v2"
  export function isDetected(event: MlEvent): boolean {
    if (!isRunning()) {
      startRunning();
      return false;
    }
    return event.eventValue == currentEventId();
  }

  export let getModelBlob: () => Buffer;
  let simIsRunning = false;

  //% shim=mlrunner::customOnEvent
  function mlRunnerCustomOnEvent(
    id: number,
    evid: number,
    handler: () => void,
    flags?: number
  ) {
    // The sim probably won't respect the DropIfBusy flag
    control.onEvent(id, evid, handler, EventFlags.DropIfBusy);
  }

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
  function startRunning(): void {
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
    | "init"
    | "data"
    | "request_data"
    | "simulate_event";

  interface SimulatorMessage {
    type: SimulatorMessageType;
    data?: any;
  }

  const simChannel = "microbit-ml-v1";

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
  simulatorSendData();
  // End simulator code.
}
