import type { Thing } from "./thing";
import type { Service } from "./service";

export type DiscoverData = {
  things: Thing[];
  services: Service[];
};
