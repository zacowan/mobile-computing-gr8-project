const { getData, setData } = require("./redis");

const createLog = async (appID, message) => {
  const apps = (await getData("apps")) || [];
  const index = apps.findIndex((app) => app.id === appID);

  if (index !== -1) {
    let appsToSave = [...apps];
    // Add log
    const oldLogs = appsToSave[index].logs;
    const newLog = {
      timestamp: Date.now(),
      message,
    };
    appsToSave[index].logs = [...oldLogs, newLog];
    // Save to redis
    await setData("apps", appsToSave);
  }
};

const generateAppErrorLogMessage = (errorMessage) => {
  return `[App Error]: ${errorMessage}`;
};

const generateServiceCallLogMessage = (
  serviceResult,
  status,
  thingID,
  spaceID,
  serviceName,
  serviceInput
) => {
  const prefix = `[Service Call]: called service ${serviceName} with ${
    serviceInput ? `input ${serviceInput}` : ""
  } on thing ${thingID} in smart space ${spaceID}. `;
  if (serviceResult === "No Output" && status === "Successful") {
    return prefix + "Service evaluated successfully.";
  } else if (status === "Successful") {
    return prefix + `Service returned ${serviceResult}.`;
  } else {
    return prefix + "Service evaluated unsuccessfully.";
  }
};

module.exports = {
  createLog,
  generateServiceCallLogMessage,
};
