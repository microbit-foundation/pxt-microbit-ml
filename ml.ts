//% block="Machine Learning"
namespace machineLearningPoc {
  type GestureID = number;

  type RecordingData = {
    ID: number;
    data: {
      x: number[];
      y: number[];
      z: number[];
    };
  };

  enum PinTurnOnState {
    ALL_TIME,
    X_TIME,
  }

  type UsableIOPin = 0 | 1 | 2;

  type GestureOutput = {
    matrix?: boolean[];
    sound?: SoundData;
    outputPin?: {
      pin: UsableIOPin;
      pinState: PinTurnOnState;
      turnOnTime: number;
    };
  };

  type SoundData = {
    name: string;
    id: string;
    path: string;
  };

  interface Confidence {
    currentConfidence: number;
    requiredConfidence: number;
    isConfident: boolean;
  }

  export type PersistantGestureData = {
    ID: GestureID;
    name: string;
    recordings: RecordingData[];
    output: GestureOutput;
    confidence: Confidence;
  };

  type MachineLearningPocMessageType =
    | "register"
    | "init"
    | "data"
    | "request_data"
    | "trigger_gesture";

  interface MachineLearningPocMessage {
    type: MachineLearningPocMessageType;
    data?: any;
  }

  //% block="test block"
  export function doesNothing() {}

  export let mlGestureData: PersistantGestureData[] | undefined;

  export function setData(data: string) {
    mlGestureData = JSON.parse(data) as PersistantGestureData[];
    simulatorRegister();
  }

  //% shim=TD_NOOP
  export function simulatorRegister(): void {
    const msg: MachineLearningPocMessage = {
      type: "register",
    };
    simulatorSendMessage(msg);
    control.simmessages.onReceived("machineLearningPoc", handleMessage);
  }

  export function simulatorInit(): void {
    const msg: MachineLearningPocMessage = {
      type: "init",
    };
    simulatorSendMessage(msg);
  }

  export function simulatorSendData(): void {
    const gestureLabels = mlGestureData.map((d, i) => ({
      name: d.name,
      value: i,
    }));
    const msg: MachineLearningPocMessage = {
      type: "data",
      data: gestureLabels,
    };
    simulatorSendMessage(msg);
  }

  //% shim=TD_NOOP
  export function simulatorSendMessage(msg: MachineLearningPocMessage): void {
    const payload = Buffer.fromUTF8(JSON.stringify(msg));
    control.simmessages.send("machineLearningPoc", payload, false);
  }

  interface EventHandlers {
    [key: number]: () => void;
  }

  export const eventHandlers: EventHandlers = {};

  export function triggerGesture(mlGesture: number) {
    const handler = eventHandlers[mlGesture];
    if (handler) {
      handler();
    }
  }

  export function handleMessage(buffer: Buffer) {
    const msg: MachineLearningPocMessage = JSON.parse(buffer.toString());
    switch (msg.type) {
      case "request_data": {
        simulatorSendData();
        break;
      }
      case "trigger_gesture": {
        triggerGesture(msg.data.value);
      }
    }
  }
}
