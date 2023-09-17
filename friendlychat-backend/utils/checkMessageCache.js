const checkSentiment = require('./checkSentiment.js');

const checkMessageCache = async (redisClient, data) => {
  const { text } = data;
  const cacheResults = await redisClient.get(text);
  let result;

  if (cacheResults) {
    result = cacheResults;
  } else {
    result = await checkSentiment(text);
    await redisClient.set(text,result);
  }

  return result;
};

module.exports = checkMessageCache;