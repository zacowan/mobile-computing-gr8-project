import type { App } from "../types/app";
import MockServices from "./services";

const MockApps: Array<App> = [
  {
    name: "Toggle LED",
    id: "1241252512asdfasdfas",
    active: false,
    lastActive: Date.now(),
    continuous: false,
    logs: [
      {
        timestamp: Date.now(),
        message: "Made call to get_led",
      },
      {
        timestamp: Date.now(),
        message: "Made call to get_led",
      },
      {
        timestamp: Date.now(),
        message: "Made call to get_led",
      },
      {
        timestamp: Date.now(),
        message: "Made call to get_led",
      },
    ],
    components: [
      {
        relationship: undefined,
        services: [
          {
            name: "toggle_led",
            thingID: "thing_01",
            input: "1",
            spaceID: "space_01",
          },
        ],
      },
    ],
  },
  {
    name: "Turn LED On When Dark",
    id: "asdfgh",
    active: true,
    lastActive: Date.now(),
    continuous: true,
    logs: [
      {
        timestamp: Date.now(),
        message: "Made call to get_led",
      },
    ],
    components: [
      {
        relationship: "Control",
        operator: ">=",
        outputCompare: "50",
        services: [
          {
            name: "get_light",
            thingID: "thing_02",
            spaceID: "space_01",
          },
          {
            name: "toggle_led",
            thingID: "thing_01",
            input: "1",
            spaceID: "space_01",
          },
        ],
      },
    ],
  },
  {
    name: "Turn LED Off When Light",
    id: "asdfgh",
    active: false,
    lastActive: Date.now(),
    continuous: true,
    logs: [
      {
        timestamp: Date.now(),
        message: "Made call to get_led",
      },
    ],
    components: [
      {
        relationship: "Control",
        operator: "<",
        outputCompare: "50",
        services: [
          {
            name: "get_light",
            thingID: "thing_02",
            spaceID: "space_01",
          },
          {
            name: "toggle_led",
            thingID: "thing_01",
            input: "1",
            spaceID: "space_01",
          },
        ],
      },
    ],
  },
];

export default MockApps;
