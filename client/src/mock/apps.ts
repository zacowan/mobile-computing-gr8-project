import type { App } from "../types/app";
import MockServices from "./services";

const MockApps: Array<App> = [
  {
    name: "Toggle LED",
    id: "1241252512asdfasdfas",
    active: false,
    lastActive: Date.now().toString(),
    components: [
      {
        relationship: undefined,
        services: MockServices.slice(1),
      },
    ],
  },
];

export default MockApps;
