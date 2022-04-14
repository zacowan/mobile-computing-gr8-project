
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
  input?: string;
};

 */
const SERVICE_CALL_API_URL = "api_url";

const generateWhileLoop = (condition, body) => {
    return "while " + condition + ":\n\t" + body + "\n}" 
}

const generateIfStatement = (condition, body) => {
    return "if " + condition + ":\n\t" + body + "\n}" 
}

const generateServiceCall = async (service) => {
  return `requests.post('url', data={'service': {'name': "service_name", 'thingID': "thing_id", 'spaceID': 'space_id', 'input': '' }}).json()`
}

// IF (A() is successful OR A() operator outputCompare) THEN (B)
const generateControlStatement = (serviceA, operator, outputCompare, serviceB) => {
  const serviceACall = generateServiceCall(serviceA);
  const serviceBCall = generateServiceCall(serviceB);
  if (operator && outputCompare) {
    const condition = `${serviceACall} ${operator} ${outputCompare}`;
    return generateIfStatement(condition, serviceBCall);
  } else {
    return generateIfStatement(serviceACall, serviceBCall);
  }
}

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
}

// service()
const generateServiceStatement = (service) => {

}

const generateCodeFile = (app) => {
  // Iterate through AppComponents and generate statements
  let statements = [];
  app.components.forEach((component) => {
    let statement = '';
    if (component.relationship === 'control') {
      statement = generateControlStatement(
        component.services[0], 
        component.operator, 
        component.outputCompare, 
        component.services[1]
      );
    } else if (component.relationship === 'drive') {
      statement = generateControlStatement(
        component.services[0], 
        component.services[1]
      );
    } else {
      statement = generateServiceStatement(component.services[0]);
    }
    statements.push(statement);
  });
  // Wrap everything in a single function call or while loop
  
  // Generate file
}


module.exports = {
  generateCodeFile
}