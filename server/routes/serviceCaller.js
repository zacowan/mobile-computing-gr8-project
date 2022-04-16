var express = require("express");
var router = express.Router();
var { setData, getData } = require("../utils/redis");
var { sendTweet } = require("../utils/atlasServiceHandler");
var axios = require("axios");

router.post("/", async (req, res, next) => {
  // Get Service Details from Body
  const { service } = req.body;

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
  } else {
    // Return failed
    res.send({ output: null });
  }
});

module.exports = router;
