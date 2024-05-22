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

  type ActionData = {
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
    | "trigger_action";

  interface MachineLearningPocMessage {
    type: MachineLearningPocMessageType;
    data?: any;
  }

  //% block="test block"
  export function doesNothing() {}

  //% blockId=poc_test
  //% block="poc test"
  //% shim=machineLearningPoc::emit_ml_event
  export function emitMlEvent(): void {
    console.log("testing");
  }

  let mlActionData: ActionData[] | undefined;

  export function setData(data: string) {
    mlActionData = JSON.parse(data) as ActionData[];
    simulatorRegister();
  }

  //% shim=TD_NOOP
  function simulatorRegister(): void {
    const msg: MachineLearningPocMessage = {
      type: "register",
    };
    simulatorSendMessage(msg);
    control.simmessages.onReceived("machineLearningPoc", handleMessage);
  }

  function simulatorInit(): void {
    const msg: MachineLearningPocMessage = {
      type: "init",
    };
    simulatorSendMessage(msg);
  }

  function simulatorSendData(): void {
    const actionLabels = mlActionData.map((d, i) => ({
      name: d.name,
      value: i,
    }));
    const msg: MachineLearningPocMessage = {
      type: "data",
      data: actionLabels,
    };
    simulatorSendMessage(msg);
  }

  //% shim=TD_NOOP
  function simulatorSendMessage(msg: MachineLearningPocMessage): void {
    const payload = Buffer.fromUTF8(JSON.stringify(msg));
    control.simmessages.send("machineLearningPoc", payload, false);
  }

  interface EventHandlers {
    [key: number]: () => void;
  }

  export const eventHandlers: EventHandlers = {};

  function simulateAction(mlAction: number) {
    const handler = eventHandlers[mlAction];
    if (handler) {
      handler();
    }
  }

  function handleMessage(buffer: Buffer) {
    const msg: MachineLearningPocMessage = JSON.parse(buffer.toString());
    switch (msg.type) {
      case "request_data": {
        simulatorSendData();
        break;
      }
      case "trigger_action": {
        simulateAction(msg.data.value);
      }
    }
  }
}
