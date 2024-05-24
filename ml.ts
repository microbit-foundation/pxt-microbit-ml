//% block="Machine Learning"
namespace machineLearningPoc {
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

  export let actions: string[];
  export let modelBlob: Buffer | undefined;

  //% shim=TD_NOOP
  export function simulatorRegister(): void {
    const msg: MachineLearningPocMessage = {
      type: "register",
    };
    simulatorSendMessage(msg);
    control.simmessages.onReceived("machineLearningPoc", handleMessage);
  }

  function simulatorSendData(): void {
    const actionLabels = actions.map((action, i) => ({
      name: action,
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
