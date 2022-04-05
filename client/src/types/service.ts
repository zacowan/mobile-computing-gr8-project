export type Service = {
  name: string;
  thingID: string;
  entity: string; // entity id
  type: string;
  inputs: Array<{
    name: string;
    type: string; // basically always int
  }>;
  output: string; // NULL or int
  category: string;
  description: string;
  keywords: string; // comma-separated keywords
};
