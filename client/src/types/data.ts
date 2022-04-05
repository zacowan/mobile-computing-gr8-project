import type { Thing } from "./thing";
import type { Service } from "./service";

export type Data = {
  things: Array<Thing>;
  services: Array<Service>;
};
