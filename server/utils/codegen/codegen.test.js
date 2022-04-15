const fs = require("fs");
const { generateCodeFile } = require("./codegen");

const baseApp = {
  name: "Test App",
  id: "test_generated_app",
  continuous: false,
  loopDelay: undefined,
  components: [],
};

const baseComponent = {
  relationship: undefined,
  operator: undefined,
  outputCompare: undefined,
  services: [],
};

const baseService = {
  name: "",
  thingID: "",
  spaceID: "",
  input: "",
};

const getFileContent = (fname) => {
  const content = fs.readFileSync(`${__dirname}/${fname}`, {
    encoding: "utf-8",
  });
  return content;
};

describe("codegen", () => {
  it("generates code for a single service call", () => {
    let app = { ...baseApp };
    let comp = { ...baseComponent };
    let service = {
      name: "get_led",
      thingID: "zach_thing",
      spaceID: "smart_space",
      input: "",
    };
    comp.services = [service];
    app.components = [comp];
    generateCodeFile(app);
    const generated = getFileContent(`${app.id}.py`);
    const compare = getFileContent(`testFiles/single_service_call.py`);
    expect(generated).toEqual(compare);
  });
});
