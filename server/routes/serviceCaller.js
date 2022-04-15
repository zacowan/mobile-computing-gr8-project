var express = require("express");
var router = express.Router();
var { setData, getData } = require("../utils/redis");
var { sendTweet } = require("../utils/atlasServiceHandler");
var axios = require("axios");

/**
 * GET (Returns the current Working Directory to the Front-End)
 */
router.post("/", async (req, res, next) => {
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
  console.log(service);

  var {
    data: { things },
  } = await axios.get("http://localhost:3001/discover");
  console.log(things);
  var currentThing = things.filter((thing) => {
    return thing.smartSpaceID == service.spaceID && thing.id == service.thingID;
  })[0];

  console.log(currentThing);

  sendTweet(
    currentThing.ip,
    currentThing.port,
    currentThing.id,
    currentThing.smartSpaceID,
    service.serviceName,
    service.input
  );

  // Return success
  res.send({ status: "success" });
});

module.exports = router;
