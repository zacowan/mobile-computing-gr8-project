var express = require("express");
var router = express.Router();
var { setData, getData } = require("../utils/redis");
var { v4: uuidv4 } = require("uuid");
var fs = require("fs");
const { generateCodeFile } = require("../utils/codegen");
const getAtlasWorkingDir = require("../utils/workingDir");

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

/*
 * Temporary Endpoint, Clears all apps from the redis server
 */
router.delete("/clearall", async (req, res, next) => {
  await setData("apps", undefined);
  res.send({ status: "cleared" });
});

module.exports = router;
