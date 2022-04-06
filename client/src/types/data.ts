import type { Thing } from "./thing";
import type { Service } from "./service";
import type { App } from "./app";

export type Data = {
  things: Array<Thing>;
  services: Array<Service>;
  apps: Array<App>;
};
