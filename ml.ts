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

  export function checkTensorflow() {
    // Trying this with npmDependencies defined in pxt.json.
    // Fully expect it to be undefined.
    console.log(tf);
  }
}
