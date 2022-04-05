import type { Service } from "./service";

export type App = {
  name: string;
  id: string;
  active: boolean;
  lastActive: string; // timestamp
  components: Array<AppComponent>;
};

export type AppComponent = {
  relationship?: string; // can be a relationship, or not
  services: Array<Service>; // can be 1 service, or 2 services in the context of a relationship
};
