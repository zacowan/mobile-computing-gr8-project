var express = require("express");
var router = express.Router();
var { setData, getData } = require("../utils/redis");
var { v4: uuidv4 } = require("uuid");
var fs = require("fs");
const { generateCodeFile } = require("../utils/codegen");
const { SLASH, getAtlasWorkingDir } = require("../utils/workingDir");
const {
  createLog,
  generateAppErrorLogMessage,
  generateStartStopLogMessage,
} = require("../utils/logging");
var spawn = require("child_process").spawn;
var process = require("process");

router.post("/", async (req, res, next) => {
  // Get App Sent from Front-end in Request Body
  const app = req.body;

  // Get the current working directory from Redis
  const workingDir = await getAtlasWorkingDir();

  // generate app id, which is the filename
  const appID = uuidv4();
  const filename = generateCodeFile({ ...app, id: appID }, workingDir);

  // Save in redis with extra information
  const appToSave = {
    id: appID,
    workingDir: workingDir,
    file: filename,
    logs: [],
    active: false,
    ...app,
  };

  // Get old apps, provide a default value
  const oldApps = (await getData("apps")) || [];
  // Save new app in list of apps in redis
  await setData("apps", [...oldApps, appToSave]);
  res.send();
});

router.patch("/", async (req, res) => {
  const { name, continuous, loopDelay, components } = req.body;
  const { id: appID } = req.query;

  // Find the app
  let apps = (await getData("apps")) || [];
  const index = apps.findIndex((app) => app.id === appID);
  if (index !== -1) {
    // Update the app
    apps[index].name = name;
    apps[index].continuous = continuous;
    apps[index].loopDelay = loopDelay;
    apps[index].components = components;
    await setData("apps", apps);
    // Get the current working directory from Redis
    const workingDir = await getAtlasWorkingDir();
    // Update the app file
    generateCodeFile({ ...apps[index], id: appID }, workingDir);
    // Return success
    res.send();
  } else {
    res.status(404).send();
  }
});

router.get("/", async (req, res, next) => {
  // Get the current working directory from Redis
  const workingDir = await getAtlasWorkingDir();
  // Get the apps from redis
  const apps = (await getData("apps")) || [];
  // Filter out apps that are not in the current workingDir?
  // NOTE/TODO/DONT_MISS: For JSON objects, one / gets translated into //
  const filteredApps = apps.filter((app) => {
    return app.workingDir == workingDir;
  });
  // Return the apps
  res.send({ apps: filteredApps });
});

router.delete("/", async (req, res) => {
  const { id } = req.query;
  const apps = (await getData("apps")) || [];

  // Delete from file system
  apps.every((app) => {
    if (app.id !== id) return true;

    // Delete
    const filename = "".concat(app.workingDir, SLASH, app.file);
    try {
      fs.unlinkSync(filename);
    } catch (error) {
      // File likely doesn't exist
      console.error(error);
    }

    return false;
  });
  // Delete from redis
  const filteredApps = apps.filter((app) => {
    return app.id !== id;
  });
  await setData("apps", filteredApps);

  res.send();
});

router.post("/logError", async (req, res) => {
  const { appID } = req.query;
  const { message: errorMessage } = req.body;

  // Find the app
  let apps = (await getData("apps")) || [];
  const index = apps.findIndex((app) => app.id === appID);
  if (index !== -1) {
    // Get App
    var app = apps[index];
    // Set App Status to "Active"
    app.active = false;
    app.lastActive = Date.now();
    // Save the App Back into the Apps array
    apps[index] = app;
    // Save Apps to Redis
    await setData("apps", apps);
  }
  // Log the Error
  var logMessage = generateAppErrorLogMessage(errorMessage);

  await createLog(appID, logMessage);

  // Log the App Stopping
  logMessage = generateStartStopLogMessage(false);

  await createLog(appID, logMessage);

  res.send();
});

router.post("/logStop", async (req, res) => {
  // For single-use apps only
  const { appID } = req.query;

  // Find the app
  let apps = (await getData("apps")) || [];
  const index = apps.findIndex((app) => app.id === appID);
  if (index !== -1) {
    // Get App
    var app = apps[index];
    // Set App Status to "Active"
    app.active = false;
    app.lastActive = Date.now();
    // Save the App Back into the Apps array
    apps[index] = app;
    // Save Apps to Redis
    await setData("apps", apps);
  }

  // Log the App Stopping
  logMessage = generateStartStopLogMessage(false);

  await createLog(appID, logMessage);

  res.send();
});

router.patch("/start", async (req, res) => {
  const { id: appID } = req.query;

  // Find the app
  let apps = (await getData("apps")) || [];
  const index = apps.findIndex((app) => app.id === appID);
  if (index !== -1) {
    // Get the app
    let app = apps[index];
    // Find the python file to run
    const filename = app.workingDir + SLASH + app.file;
    console.log(filename);
    // Start the app and get the process ID
    var process = spawn("python", [filename]);
    var pid = process.pid;
    console.log(pid);
    // Add Process ID to app
    app.pid = pid;
    // Set App Status to "Active"
    app.active = true;
    // Save the App Back into the Apps array
    apps[index] = app;
    // Save Apps to Redis
    await setData("apps", apps);
    // Log App Start
    await createLog(app.appID, generateStartStopLogMessage(true));
    // Return success
    res.send();
  } else {
    res.status(404).send();
  }
});

router.patch("/stop", async (req, res) => {
  const { id: appID } = req.query;

  // Find the app
  let apps = (await getData("apps")) || [];
  const index = apps.findIndex((app) => app.id === appID);
  if (index !== -1) {
    // Get the app
    let app = apps[index];
    // Get the app Process ID
    var pid = app.pid;
    // Set App Status to "Stopped"
    app.active = false;
    app.lastActive = Date.now();
    // Save the App Back into the Apps array
    apps[index] = app;
    // Save Apps to Redis
    await setData("apps", apps);
    // Kill the App
    try {
      process.kill(pid, "SIGTERM");
    } catch (e) {
      res.status(403).send();
    }
    // Log App Start
    await createLog(app.appID, generateStartStopLogMessage(false));
    // Return success
    res.send();
  } else {
    res.status(404).send();
  }
});

/*
 * Temporary Endpoint, Clears all apps from the redis server
 */
router.delete("/clearall", async (req, res, next) => {
  await setData("apps", undefined);
  res.send({ status: "cleared" });
});

module.exports = router;
