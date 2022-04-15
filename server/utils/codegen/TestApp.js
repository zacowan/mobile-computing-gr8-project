class TestApp {
  constructor() {
    this.name = "Test App";
    this.id = "test_generated_app";
    this.continuous = false;
    this.loopDelay = undefined;
    this.components = [];
  }

  toObject = () => ({
    name: this.name,
    id: this.id,
    continuous: this.continuous,
    loopDelay: this.loopDelay,
    components: this.components,
  });

  addComponent = (
    services,
    relationship = undefined,
    operator = undefined,
    outputCompare = undefined
  ) => {
    const component = {
      relationship,
      operator,
      outputCompare,
      services,
    };
    this.components.push(component);
  };

  addServiceComponent = (
    name = "test_service_name",
    input = "",
    thingID = "test_thing_id",
    spaceID = "test_space_id"
  ) => {
    const service = {
      name,
      thingID,
      spaceID,
      input,
    };
    this.addComponent([service]);
  };
}

module.exports = TestApp;
