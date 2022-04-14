const net = require('net');
/*
HOST_IP = "192.168.0.111"
PORT = 6668
THING_ID = "StrawberryThing01"
SPACE_ID = "StrawberrySmartSpace"
SHORT_SLEEP = 0.1
LONG_SLEEP = 5
*/

const sendTweet = (hostIP, port, thingID, smartSpaceID, serviceName, serviceInputs) => {
    tweet = {
        "Tweet Type": "Service call",
        "Thing ID": thingID,
        "Space ID": smartSpaceID,
        "Service Name": serviceName,
        "Service Inputs": serviceInputs
    }

    const client = new net.Socket();
    client.connect({port: port, host: hostIP}, () => {
        console.log("Client connection established with " + hostIP);
        console.log("Sending tweet: " + tweet);
        client.write(tweet);
    });

    client.on('data', (chunk) => {
        console.log("Data received from server: " + chunk);
        client.end();
    });
}

const receiveTweet = () => {

}

module.exports = {
    sendTweet
}