import type { Service } from "../types/service";

const MockServices: Array<Service> = [
  {
    name: "trigger_led",
    description: "Changes the state of the LED to on (1) or off (0).",
    category: "Lighting",
    entity: "led",
    inputs: [
      {
        name: "new_value",
        type: "int",
      },
    ],
    keywords: "LED,on,off",
    output: "NULL",
    thingID: "thing_01",
    spaceID: "space_01",
    type: "Action",
  },
  {
    name: "get_light",
    description: "Gets the reading from the light sensor.",
    category: "TODO",
    entity: "photoresistor",
    inputs: [],
    keywords: "light,get",
    output: "int",
    thingID: "thing_02",
    spaceID: "space_01",
    type: "TODO",
  },
  {
    name: "actuate_button",
    description: "Simulates pressing the button",
    category: "TODO",
    entity: "button",
    inputs: [],
    keywords: "button,press",
    output: "NULL",
    thingID: "thing_03",
    spaceID: "space_01",
    type: "TODO",
  },
];

export default MockServices;
