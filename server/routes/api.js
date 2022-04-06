var express = require('express');
var router = express.Router();
var redis = require('redis');

connectToRedis = async(redisClient) =>{
  await redisClient.connect();
}

getTweetsFromRedis = async(redisClient) => {
  return await redisClient.get('tweets');
}

/* GET home page. */
router.get('/discover', function(req, res, next) {
  const redisClient = redis.createClient();
  redisClient.on('error', (err) => {
    console.log("Redis Client error --> " + err);
  })

  connectToRedis(redisClient);
  
  getTweetsFromRedis(redisClient)
  .then((tweets) => {
    let tweets_to_send = []
    let parsed_tweets = JSON.parse(tweets);
    parsed_tweets.map((tweet) => {
      if((Date.now() - tweet["lastSeen"]) < 60000){
        tweets_to_send = [...tweets_to_send, tweet]
      }
    })
    res.send({"tweets": tweets_to_send});
  })

  
});

module.exports = router;
