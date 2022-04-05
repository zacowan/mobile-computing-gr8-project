import type { App } from "../types/app";
import MockServices from "./services";

const MockApps: Array<App> = [
  {
    name: "Toggle LED",
    id: "1241252512asdfasdfas",
    active: false,
    lastActive: Date.now().toString(),
    continuous: false,
    components: [
      {
        relationship: undefined,
        services: [
          {
            name: "toggle_led",
            thingID: "thing_01",
            input: "1",
          },
        ],
      },
    ],
  },
  {
    name: "Turn LED On When Dark",
    id: "asdfgh",
    active: true,
    lastActive: Date.now().toString(),
    continuous: true,
    components: [
      {
        relationship: "Control",
        services: [
          {
            name: "get_light",
            thingID: "thing_02",
            operator: ">=",
            outputCompare: "50",
          },
          {
            name: "toggle_led",
            thingID: "thing_01",
            input: "1",
          },
        ],
      },
    ],
  },
  {
    name: "Turn LED Off When Light",
    id: "asdfgh",
    active: false,
    lastActive: Date.now().toString(),
    continuous: true,
    components: [
      {
        relationship: "Control",
        services: [
          {
            name: "get_light",
            thingID: "thing_02",
            operator: "<",
            outputCompare: "50",
          },
          {
            name: "toggle_led",
            thingID: "thing_01",
            input: "0",
          },
        ],
      },
    ],
  },
];

export default MockApps;
