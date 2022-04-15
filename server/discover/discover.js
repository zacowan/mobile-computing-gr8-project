var PORT = 1235;
var dgram = require("dgram");
var client = dgram.createSocket("udp4");
var { setData, redisClient } = require("../utils/redis");

let tweets = [];

client.on("listening", () => {
  var address = client.address();
  console.log(
    "UDP Client listening on " + address.address + ":" + address.port
  );
  client.setBroadcast(true);
  client.setMulticastTTL(128);
  client.addMembership("232.1.1.1");
});

client.on("message", async function (message, remote) {
  const decodedMessage = JSON.parse(message.toString());

  // Ignore Identity_Entity tweets for simplicity
  if (decodedMessage["Tweet Type"] == "Identity_Entity") return;

  let isNewTweet = true;

  // Check if new message
  tweets.every((tw) => {
    let comparableTw = JSON.parse(JSON.stringify(tw));
    delete comparableTw["lastSeen"];
    if (JSON.stringify(comparableTw) == JSON.stringify(decodedMessage)) {
      console.log("Equal message found");
      isNewTweet = false;
      tw["lastSeen"] = Date.now();
      return false;
    } else {
      return true;
    }
  });

  // Add tweet if not new
  if (isNewTweet) {
    decodedMessage["lastSeen"] = Date.now();
    tweets = [...tweets, decodedMessage];
  } else {
  }

  // console.log(tweets);
  // console.log(tweets.length);
  await setData("tweets", tweets);
});

redisClient.on("error", (err) => console.log("Redis Client error --> ", err));

redisClient
  .connect()
  .then(() => {
    // Bind the client
    client.bind(PORT);
  })
  .catch((err) => {
    console.log("Redis Connection error --> " + err);
  });
