var express = require("express");
var router = express.Router();
var { getData } = require("../utils/redis");

const parseServiceTweetAPI = (serviceApi) => {
  // Split the parts of the string
  const parts = serviceApi.split(":");
  const params = parts[1].substring(1, parts[1].length - 1).split(",");
  const returnType = parts[2].substring(1, parts[2].length - 1);
  // Get the actual params
  let i = 0;
  let inputs = [];
  while (i < params.length) {
    // double check this: I think a NULL indicates there are no more parameters?
    if (params[i].trim() == "NULL") break;

    const paramName = params[i];
    const paramType = params[i + 1];
    inputs = [
      ...inputs,
      {
        name: paramName,
        type: paramType,
      },
    ];
    i += 2;
  }
  // Return the inputs and output type
  return {
    inputs: inputs,
    output: returnType,
  };
};

const parseServiceTweet = (tweet) => {
  const { inputs, output } = parseServiceTweetAPI(tweet["API"]);

  const service = {
    name: tweet["Name"],
    thingID: tweet["Thing ID"],
    entity: tweet["Entity ID"], // entity id
    spaceID: tweet["Space ID"],
    type: tweet["Type"],
    inputs: inputs,
    output: output, // NULL or int
    category: tweet["AppCategory"],
    description: tweet["Description"],
    keywords: tweet["Keywords"], // comma-separated keywords
  };

  return service;
};

/* GET discoverd Atlas objects. */
router.get("/", async (req, res, next) => {
  // Get the tweets from the discovery script
  const tweets = (await getData("tweets")) || [];

  // Define the tweets to send object that will contain the final [things] and [services]
  let tweets_to_send = {
    things: [],
    services: [],
  };

  let ungrouped_service_tweets = [];
  let grouped_service_tweets = {};

  // For each tweet handle where to place it -> Services or Things
  tweets.map((tweet) => {
    if (Date.now() - tweet["lastSeen"] < 60000) {
      if (tweet["Tweet Type"] == "Service") {
        tweets_to_send.services = [
          ...tweets_to_send.services,
          parseServiceTweet(tweet),
        ];
      } else {
        ungrouped_service_tweets = [...ungrouped_service_tweets, tweet];
      }
    }
  });

  // Take the ungrouped tweets and map them by thing_id
  ungrouped_service_tweets.map((tweet) => {
    let thing_id = tweet["Thing ID"];
    if (thing_id in grouped_service_tweets) {
      grouped_service_tweets[thing_id] = [
        ...grouped_service_tweets[thing_id],
        tweet,
      ];
    } else {
      grouped_service_tweets[thing_id] = [];
      grouped_service_tweets[thing_id] = [
        ...grouped_service_tweets[thing_id],
        tweet,
      ];
    }
  });

  // For each thing_id, ensure there is 2 tweets and combine the necessary info
  for (const [thing_id, thing_tweets] of Object.entries(
    grouped_service_tweets
  )) {
    if (thing_tweets.length == 2) {
      let language_tweet = thing_tweets.find((tweet) => {
        return tweet["Tweet Type"] == "Identity_Language";
      });
      let thing_tweet = thing_tweets.find((tweet) => {
        return tweet["Tweet Type"] == "Identity_Thing";
      });

      let thing = {
        spaceID: thing_tweet["Space ID"],
        name: thing_tweet["Name"],
        description: thing_tweet["Description"],
        id: thing_id,
        ip: language_tweet["IP"],
        port: language_tweet["Port"],
      };

      tweets_to_send.things = [...tweets_to_send.things, thing];
    }
  }

  res.send(tweets_to_send);
});

module.exports = router;
