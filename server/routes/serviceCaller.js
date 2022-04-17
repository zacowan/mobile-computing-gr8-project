var express = require("express");
var router = express.Router();
var { setData, getData } = require("../utils/redis");
var { sendTweet } = require("../utils/atlasServiceHandler");
var axios = require("axios");
const {
  createLog,
  generateServiceCallLogMessage
} = require("../utils/logging");

router.post("/", async (req, res, next) => {
  // Get Service Details from Body
  const { appID } = req.query;
  const { service } = req.body;

  try {
    const {
      data: { things },
    } = await axios.get("http://localhost:3001/discover");

    const thingIndex = things.findIndex((thing) => {
      return thing.spaceID === service.spaceID && thing.id === service.thingID;
    });

    if (thingIndex !== -1) {
      const thing = things[thingIndex];

      // Send tweet, get response
      const tweetResponse = await sendTweet(
        thing.ip,
        thing.port,
        thing.id,
        thing.spaceID,
        service.name,
        service.input
      );
      // Determine the service call output
      const serviceResult = tweetResponse["Service Result"];
      const serviceStatus = tweetResponse["Status"];

      const logMessage = generateServiceCallLogMessage(
        serviceResult,
        serviceStatus,
        thing.id,
        thing.spaceID,
        service.name,
        service.input
      );

      if (serviceResult === "No Output" && serviceStatus === "Successful") {
        // Service with no output evaluated successfully
        res.send({ output: true });
      } else if (serviceStatus === "Successful") {
        // Service with output evaluated successfully
        res.send({ output: serviceResult });
      } else {
        // Service evaluated unsuccessfully
        res.send({ output: null });
      }

      await createLog(appID, logMessage);
    } else {
      // Return failed
      res.send({ output: null });
    }
  } catch (error) {
    res.status(400).send();
  }
});

module.exports = router;
