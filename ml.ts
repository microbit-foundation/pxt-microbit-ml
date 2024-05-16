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

  //% block="test block"
  export function doesNothing() {}

  export function logData(data: string) {
    console.log("=== Data passed to function from editor extension ===");
    console.log(data);
  }

  export function parseData(data: string): PersistantGestureData[] {
    return JSON.parse(data);
  }

  export function createSimulator(data: string): void {
    const parsedData: PersistantGestureData[] = JSON.parse(data);
    const gestureLabels = parsedData.map((d, i) => ({
      name: d.name,
      value: i,
    }));
    const msg = {
      type: "init",
      data: gestureLabels,
    };
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

  export function handleMessage(msg: Buffer) {
    const s = msg.toString();
    const mlGesture = JSON.parse(s);
    triggerGesture(mlGesture.value);
  }

  control.simmessages.onReceived("machineLearningPoc", handleMessage);
}
