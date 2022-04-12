var express = require("express");
var router = express.Router();
var { setData, getData } = require('../utils/redis')
var { v4: uuidv4 } = require('uuid');
var fs = require("fs");

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

const generateFile = (filename, appData) => {
    fileContents = "This is a file...";
    fs.writeFileSync(filename, fileContents);
}

router.post("/create", async (req, res, next) => {
    // Get App Sent from Front-end in Request Body
    var { app } = req.body;

    // Figure out working directory component
    // getWorkDir
    // generate app id, which is the filename
    var appID = uuidv4();
    var filename = appID + ".js";

    // Generate code file and save to directory + filename
    //           "C://folder/"   + "uuid.js"
    generateFile(app.workingDir + filename, app);

    // Save in redis with extra information
    const appToSave = {
      id: appID,
      file: filename,
      logs: [],
      active: false,
      lastActive: undefined,
      ...app
    };
    // Get old apps, provide a default value
    const oldApps = await getData("apps") || [];
    // Save new app in list of apps in redis
    await setData("apps", [...oldApps, appToSave]);

    // Return success
    res.send({"status": "success"})
});

router.get("/", async(req, res, next) => {
  const { workingDir } = req.query
  console.log(workingDir);
  // Get the apps from redis
  const apps = await getData("apps") || [];
  // Filter out apps that are not in the provided workingDir?
  // NOTE/TODO/DONT_MISS: For JSON objects, one / gets translated into //
  const filteredApps = apps.filter(app => {
    return (app.workingDir == workingDir)
  })
  // Return the apps
  res.send(filteredApps);
});

module.exports = router;