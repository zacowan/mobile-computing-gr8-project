const fs = require("fs");
const { generateCodeFile } = require("../../../utils/codegen/codegen");

/**
 * Test helpers START
 */
const testService = {
  name: "test_service_name",
  thingID: "test_thing_id",
  spaceID: "test_space_id",
  input: "",
};

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

  addControlRelationship = (
    operator = "",
    outputCompare = "",
    serviceA = testService,
    serviceB = testService
  ) => {
    this.addComponent([serviceA, serviceB], "control", operator, outputCompare);
  };

  addDriveRelationship = (serviceA = testService, serviceB = testService) => {
    this.addComponent([serviceA, serviceB], "drive");
  };
}

const getFileContent = (fname) => {
  const content = fs.readFileSync(`${__dirname}/${fname}`, {
    encoding: "utf-8",
  });
  return content;
};
/**
 * Test helpers END
 */

/**
 * Tests START
 */
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
      generateCodeFile(app.toObject(), __dirname);
      // Compare against expected
      const generated = getFileContent(`${app.id}.py`);
      const compare = getFileContent(`${compareDir}/service_call.py`);
      expect(generated).toEqual(compare);
    });

    it("generates code for a control relationship without operator/outputCompare", () => {
      app.addControlRelationship();
      // Generate code file
      generateCodeFile(app.toObject(), __dirname);
      // Compare against expected
      const generated = getFileContent(`${app.id}.py`);
      const compare = getFileContent(`${compareDir}/control_relationship.py`);
      expect(generated).toEqual(compare);
    });

    it("generates code for a control relationship with operator/outputCompare", () => {
      app.addControlRelationship("==", "1");
      // Generate code file
      generateCodeFile(app.toObject(), __dirname);
      // Compare against expected
      const generated = getFileContent(`${app.id}.py`);
      const compare = getFileContent(
        `${compareDir}/control_relationship_operator.py`
      );
      expect(generated).toEqual(compare);
    });

    it("generates code for a drive relationship", () => {
      app.addDriveRelationship();
      // Generate code file
      generateCodeFile(app.toObject(), __dirname);
      // Compare against expected
      const generated = getFileContent(`${app.id}.py`);
      const compare = getFileContent(`${compareDir}/drive_relationship.py`);
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
      generateCodeFile(app.toObject(), __dirname);
      // Compare against expected
      const generated = getFileContent(`${app.id}.py`);
      const compare = getFileContent(`${compareDir}/service_call.py`);
      expect(generated).toEqual(compare);
    });

    it("generates code for a control relationship without operator/outputCompare", () => {
      app.addControlRelationship();
      // Generate code file
      generateCodeFile(app.toObject(), __dirname);
      // Compare against expected
      const generated = getFileContent(`${app.id}.py`);
      const compare = getFileContent(`${compareDir}/control_relationship.py`);
      expect(generated).toEqual(compare);
    });

    it("generates code for a control relationship with operator/outputCompare", () => {
      app.addControlRelationship("==", "1");
      // Generate code file
      generateCodeFile(app.toObject(), __dirname);
      // Compare against expected
      const generated = getFileContent(`${app.id}.py`);
      const compare = getFileContent(
        `${compareDir}/control_relationship_operator.py`
      );
      expect(generated).toEqual(compare);
    });

    it("generates code for a drive relationship", () => {
      app.addDriveRelationship();
      // Generate code file
      generateCodeFile(app.toObject(), __dirname);
      // Compare against expected
      const generated = getFileContent(`${app.id}.py`);
      const compare = getFileContent(`${compareDir}/drive_relationship.py`);
      expect(generated).toEqual(compare);
    });
  });
});
/**
 * Tests END
 */
