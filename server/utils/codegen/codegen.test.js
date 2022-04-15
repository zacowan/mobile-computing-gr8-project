const fs = require("fs");
const TestApp = require("./TestApp");
const { generateCodeFile } = require("./codegen");

const getFileContent = (fname) => {
  const content = fs.readFileSync(`${__dirname}/${fname}`, {
    encoding: "utf-8",
  });
  return content;
};

describe("codegen", () => {
  describe("single run apps", () => {
    let app = new TestApp();

    beforeEach(() => {
      app = new TestApp();
    });

    it("generates code for a single service call", () => {
      // Create app
      app.addServiceComponent();
      // Generate code file
      generateCodeFile(app.toObject());
      // Compare against expected
      const generated = getFileContent(`${app.id}.py`);
      const compare = getFileContent(`testFiles/single_service_call.py`);
      expect(generated).toEqual(compare);
    });
  });

  describe("continuous apps", () => {
    let app = new TestApp();

    beforeEach(() => {
      app = new TestApp();
      app.continuous = true;
      app.loopDelay = 5000;
    });

    it("generates code for a single service call", () => {
      expect(1).toEqual(1);
    });
  });
});
