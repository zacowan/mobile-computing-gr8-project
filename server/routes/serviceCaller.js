var express = require("express");
var router = express.Router();
var { setData, getData } = require('../utils/redis');
var { sendTweet } = require('../utils/atlasServiceHandler');
var axios = require('axios');

/**
 * GET (Returns the current Working Directory to the Front-End)
*/
router.post("/", async(req, res, next) => {
    // Get Service Details from Body
    /*
    * service: {
        "name": name, 
        "thingID": thingID,
        "spaceID": smartSpaceID,
        "input": singleInput
      }
    */
    var { service } = req.body;
    console.log(service)

    var { data: { things } } = await axios.get("http://localhost:3001/discover");
    console.log(things)
    var currentThing = things.filter((thing) => {
      return ((thing.smartSpaceID == service.spaceID) && (thing.id == service.thingID));
    })[0];

    console.log(currentThing)

    sendTweet(currentThing.ip, currentThing.port, currentThing.id, currentThing.smartSpaceID, service.serviceName, service.input);

    // Return success
    res.send({"status": "success"})
  });

/**
 * PUT (Sets the current Working Directory from the Front-End)
*/
router.put("/", async(req, res, next) => {
    // Get the new Working Directory from the Request Body
    var { workingDir } = req.body;
    // Set the WorkingDir in Redis
    await setData("workingDir", workingDir);
    res.send({"status": "success"});
  });

/**
 * DELETE (Gets rid of the working directory)
*/
router.delete("/", async(req, res, next) => {
    // Set the WorkingDir in Redis
    await setData("workingDir", undefined);
    res.send({"status": "reset"});
  });

module.exports = router;