const net = require("net");

const sendTweet = async (
  hostIP,
  port,
  thingID,
  smartSpaceID,
  serviceName,
  serviceInputs
) => {
  // Generate tweet
  const tweet = {
    "Tweet Type": "Service call",
    "Thing ID": thingID,
    "Space ID": smartSpaceID,
    "Service Name": serviceName,
    "Service Inputs": serviceInputs,
  };
  const tweetJSON = JSON.stringify(tweet);
  // Connect to thing
  let receivedData = undefined;
  const client = new net.Socket();
  await client.connect({ port: port, host: hostIP });
  // Update data when received
  client.once("data", (chunk) => {
    receivedData = chunk.toString();
  });
  // Send tweet to thing
  client.write(tweetJSON);
  // Wait for response from thing
  while (receivedData === undefined) {
    await new Promise((resolve) => {
      setTimeout(resolve, 250);
    });
  }
  // End connection with thing
  client.end();
  // Return response
  return JSON.parse(receivedData);
};

module.exports = {
  sendTweet,
};
