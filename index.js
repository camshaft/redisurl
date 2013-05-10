/**
 * Module dependencies
 */
var redis = require("redis")
  , url = require("url");

/**
 * Create a redis client from a url
 *
 * @param {String} redisUrl
 * @api public
 */
module.exports = function(redisUrl) {
  var options = url.parse(redisUrl || process.env.REDIS_URL || "redis://localhost:6379")
    , client = redis.createClient(options.port, options.hostname);

  // Authorize the connection
  if (options.auth) client.auth(options.auth.split(":")[1]);

  // Exit gracefully
  function close() {
    client.end();
  };
  process.once("SIGTERM", close);
  process.once("SIGINT", close);

  return client
};
