exports.API_TWITTER_STATUS = (tweetId) =>
  `https://api.twitter.com/1.1/statuses/show/${tweetId}.json?include_entities=true&tweet_mode=extended`;

exports.API_TWITTER_INTENT = (tweetId) => `https://twitter.com/intent/like?tweet_id=${tweetId}`;
