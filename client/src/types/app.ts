export type App = {
  name: string;
  id: string;
  active: boolean;
  lastActive: number; // timestamp, Date.now()
  continuous: boolean;
  loopDelay?: number; // time to wait between loop calls, in ms
  components: Array<AppComponent>;
  logs: Log[];
};

export type Log = {
  timestamp: number; // Date.now()
  message: string;
};

export type AppComponent = {
  relationship?: string; // can be a relationship, or not
  services: Array<AppService>; // can be 1 service, or 2 services in the context of a relationship
  operator?: string; // used for if-then relationship
  outputCompare?: number; // used for if-then relationship; if $output $operator $outputCompare is true, then run the next service
};

export type AppService = {
  name: string;
  thingID: string;
  input?: string;
};
