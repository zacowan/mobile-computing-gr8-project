var PORT = 1235;
var dgram = require("dgram");
var client = dgram.createSocket("udp4");

client.on("listening", function () {
  var address = client.address();
  console.log(
    "UDP Client listening on " + address.address + ":" + address.port
  );
  client.setBroadcast(true);
  client.setMulticastTTL(128);
  client.addMembership("232.1.1.1");
});

client.on("message", function (message, remote) {
  console.log("A: Epic Command Received. Preparing Relay.");
  console.log(
    "B: From: " + remote.address + ":" + remote.port + " - " + message
  );
});

client.bind(PORT);