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
    const compareDir = "testFiles/singleRun";
    let app = new TestApp();

    beforeEach(() => {
      app = new TestApp();
    });

    it("generates code for a single service call", () => {
      app.addServiceComponent();
      // Generate code file
      generateCodeFile(app.toObject());
      // Compare against expected
      const generated = getFileContent(`${app.id}.py`);
      const compare = getFileContent(`${compareDir}/single_service_call.py`);
      expect(generated).toEqual(compare);
    });
  });

  describe("continuous apps", () => {
    const compareDir = "testFiles/continuous";
    let app = new TestApp();

    beforeEach(() => {
      app = new TestApp();
      app.continuous = true;
      app.loopDelay = 5000;
    });

    it("generates code for a single service call", () => {
      app.addServiceComponent();
      // Generate code file
      generateCodeFile(app.toObject());
      // Compare against expected
      const generated = getFileContent(`${app.id}.py`);
      const compare = getFileContent(`${compareDir}/single_service_call.py`);
      expect(generated).toEqual(compare);
    });
  });
});
