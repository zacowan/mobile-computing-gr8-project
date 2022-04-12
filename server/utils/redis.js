var redis = require("redis");

const redisClient = redis.createClient();

const getData = async (key) => {
  const data = await redisClient.get(key);
  if (!data) return undefined;
  return JSON.parse(data);
};

const setData = async (key, data) => {
  await redisClient.set(key, JSON.stringify(data));
}

module.exports = {
  redisClient,
  getData,
  setData
};