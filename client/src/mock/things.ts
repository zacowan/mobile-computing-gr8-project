import type { Thing } from "../types/thing";

const MockThings: Array<Thing> = [
  {
    name: "LED Thing",
    description: "A thing that contains an LED that can be turned on/off.",
    id: "thing_01",
    smartSpaceID: "SmartSpaceA",
    ip: "192.168.1.1",
    port: 6848,
  },
  {
    name: "Light Sensor Thing",
    description:
      "A thing that contains an light sensor to read the light level.",
    id: "thing_02",
    smartSpaceID: "SmartSpaceA",
    ip: "192.168.1.2",
    port: 6848,
  },
  {
    name: "Button Thing",
    description: "A thing that contains an button that can be pressed.",
    id: "thing_03",
    smartSpaceID: "SmartSpaceA",
    ip: "192.168.1.3",
    port: 6848,
  },
];

export default MockThings;
