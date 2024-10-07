/**
 * (c) 2024, Micro:bit Educational Foundation and contributors
 *
 * SPDX-License-Identifier: MIT
 */
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { FormattedMessage } from "react-intl";
import "./simulator.css";

type MessageType = "register" | "data" | "request_data" | "simulate_event";

interface Message {
  type: MessageType;
  data?: any;
}

interface EventData {
  name: string;
  value: number;
}

const simChannel = "microbit-foundation/pxt-microbit-ml";
const defaultEvent: EventData = { name: "unknown", value: 1 };
const textDecoder = new TextDecoder();
const textEncoder = new TextEncoder();

const Simulator = () => {
  const [events, setEvents] = useState<EventData[]>([defaultEvent]);
  const [selectedEvent, setSelectedEvent] = useState<number>(
    defaultEvent.value
  );

  const stringToUint8Array = useCallback((input: string): Uint8Array => {
    return textEncoder.encode(input);
  }, []);

  const sendMessage = useCallback((payload: Uint8Array) => {
    window.parent.postMessage(
      {
        type: "messagepacket",
        channel: simChannel,
        data: payload,
      },
      "*"
    );
  }, []);

  const simulateEvent = useCallback(
    (value: number) => {
      const payload: Message = {
        type: "simulate_event",
        data: value,
      };
      sendMessage(stringToUint8Array(JSON.stringify(payload)));
    },
    [sendMessage, stringToUint8Array]
  );

  const requestEventData = useCallback(
    (message: Message) => {
      sendMessage(stringToUint8Array(JSON.stringify(message)));
    },
    [sendMessage, stringToUint8Array]
  );

  const handleMessagePacket = useCallback(
    (message: any) => {
      const data = textDecoder.decode(new Uint8Array(message.data));
      const msg = JSON.parse(data) as Message;
      switch (msg.type) {
        case "register": {
          // Message causes simulator to be loaded as an iframe. No-op.
          // Message also occurs during simulator restart.
          simulateEvent(selectedEvent);
          break;
        }
        case "data": {
          const eventData = msg.data as EventData[];
          if (eventData.length) {
            setEvents(eventData);
            setSelectedEvent(eventData[0].value);
            simulateEvent(eventData[0].value);
          }
          break;
        }
      }
    },
    [selectedEvent, simulateEvent]
  );

  // Used to prevent two calls inside useEffect while running
  // locally with React StrictMode.
  const ignore = useRef(false);
  useEffect(() => {
    const listener = (ev: MessageEvent<any>) => {
      if (ev.data?.channel === simChannel) {
        switch (ev.data?.type) {
          case "messagepacket":
            return handleMessagePacket(ev.data);
        }
      }
    };
    window.addEventListener("message", listener);

    if (!ignore.current) {
      // Simulator is ready, request event data.
      requestEventData({ type: "request_data" });
    }
    return () => {
      ignore.current = true;
      window.removeEventListener("message", listener);
    };
  }, [handleMessagePacket, requestEventData]);

  const handleSelectChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const value = parseInt(e.currentTarget.value);
      if (!isNaN(value)) {
        setSelectedEvent(value);
        simulateEvent(value);
      }
    },
    [simulateEvent]
  );

  return (
    <div className="container">
      <label htmlFor="select-event">
        <FormattedMessage id="select-label" />
      </label>
      <select
        id="select-event"
        value={selectedEvent}
        onChange={handleSelectChange}
      >
        {events.map((event) => (
          <option key={event.value} value={event.value}>
            {event.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Simulator;
