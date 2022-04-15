const fs = require("fs");

/**
 * App data format provided by frontend:
 *
 *
 * export type App = {
  name: string;
  continuous: boolean;
  loopDelay?: number; // time to wait between loop calls, in ms
  components: Array<AppComponent>;
};

A, B

if (A [operator] [outputCompare]) then B
if (get_led() == 1) then set_mode(2)

export type AppComponent = {
  relationship?: string; // can be a relationship, or not
  operator?: string; // used for if-then relationship
  outputCompare?: string; // used for if-then relationship; if $output $operator $outputCompare is true, then run the next service
  services: Array<AppService>; // can be 1 service, or 2 services in the context of a relationship
};

export type AppService = {
  name: string;
  thingID: string;
  spaceID: string;
  input?: string;
};

 */
const getBaseFileContent = () => {
  return fs.readFileSync(`${__dirname}/base.py`, { encoding: "utf-8" });
};

const generateIfStatement = (condition, body) => {
  return "if " + condition + ":\n\t" + body + "\n";
};

const generateServiceCall = (service) => {
  return `requests.post(URL, json={'service': {'name': '${
    service.name
  }', 'thingID': '${service.thingID}', 'spaceID': '${
    service.spaceID
  }', 'input': '${service.input || ""}' }}).json()`;
};

// IF (A() is successful OR A() operator outputCompare) THEN (B)
const generateControlStatement = (
  serviceA,
  operator,
  outputCompare,
  serviceB
) => {
  const serviceACall = generateServiceCall(serviceA);
  const serviceBCall = generateServiceCall(serviceB);
  if (operator && outputCompare) {
    const condition = `${serviceACall} ${operator} ${outputCompare}`;
    return generateIfStatement(condition, serviceBCall);
  } else {
    return generateIfStatement(serviceACall, serviceBCall);
  }
};

// B(A())
/**
 * export type AppService = {
  name: string;
  thingID: string;
  input?: string;
};
 */
const generateDriveStatement = (serviceA, serviceB) => {
  const serviceACall = generateServiceCall(serviceA);
  //use get to retrieve the output of serviceA
  //post (generateServiceCall) serviceB with the output of serviceA as the inputs
};

// service()
const generateServiceStatement = (service) => {
  return generateServiceCall(service);
};

const generateCodeFile = (app) => {
  // Iterate through AppComponents and generate statements
  let statements = [];
  app.components.forEach((component) => {
    let statement = "";
    if (component.relationship === "control") {
      statement = generateControlStatement(
        component.services[0],
        component.operator,
        component.outputCompare,
        component.services[1]
      );
    } else if (component.relationship === "drive") {
      statement = generateControlStatement(
        component.services[0],
        component.services[1]
      );
    } else {
      statement = generateServiceStatement(component.services[0]);
    }
    statements.push(statement);
  });
  // Generate content
  let content = getBaseFileContent() + "\n";
  if (app.continuous) {
    content = content.concat("while True:", "\n    ");
    statements.forEach((stmt, index) => {
      content = "".concat(content, stmt, "\n    ");
    });
    content = content.concat(`sleep(${app.loopDelay}/1000.0)`, "\n");
  } else {
    statements.forEach((stmt) => {
      content = "".concat(content, stmt, "\n");
    });
  }
  // Generate file
  try {
    fs.writeFileSync(`${__dirname}/${app.id}.py`, content, {
      flag: "w",
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  generateCodeFile,
};
