var express = require("express");
var router = express.Router();
var { setData, getData } = require("../utils/redis");
var { v4: uuidv4 } = require("uuid");
var fs = require("fs");
const { generateCodeFile } = require("../utils/codegen");
const { SLASH, getAtlasWorkingDir } = require("../utils/workingDir");
const { createLog, generateAppErrorLogMessage } = require("../utils/logging");

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

  const logMessage = generateAppErrorLogMessage(errorMessage);

  await createLog(appID, logMessage);

  res.send();
});

/*
 * Temporary Endpoint, Clears all apps from the redis server
 */
router.delete("/clearall", async (req, res, next) => {
  await setData("apps", undefined);
  res.send({ status: "cleared" });
});

module.exports = router;
