var express = require("express");
var router = express.Router();
var { setData, getData } = require("../utils/redis");
var { sendTweet } = require("../utils/atlasServiceHandler");
var axios = require("axios");

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
  const { service } = req.body;

  const {
    data: { things },
  } = await axios.get("http://localhost:3001/discover");

  const thingIndex = things.findIndex((thing) => {
    return thing.spaceID === service.spaceID && thing.id === service.thingID;
  });

  if (thingIndex !== -1) {
    const thing = things[thingIndex];

    sendTweet(
      thing.ip,
      thing.port,
      thing.id,
      thing.spaceID,
      service.name,
      service.input
    );

    // Return success
    res.send({ status: "success" });
  } else {
    // Return failed
    res.send({ status: "fail" });
  }
});

module.exports = router;
