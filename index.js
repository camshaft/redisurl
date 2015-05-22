/**
 * Module dependencies
 */

var redis = require('redis');
var url = require('url');
var d = require('domain').create();

// Gracefully fail
d.on('error', function() {});

/**
 * Create a redis client from a url
 *
 * @param {String} redisUrl
 * @api public
 */

module.exports = function(redisUrl) {
  var options = url.parse(redisUrl || process.env.REDIS_URL || 'redis://localhost:6379');
  var client;

  d.run(function() {
    client = redis.createClient(options.port, options.hostname);

    // Authorize the connection
    if (options.auth) client.auth(options.auth.split(':')[1]);

    // Exit gracefully
    function close() {
      client.end();
    };
    process.once('SIGTERM', close);
    process.once('SIGINT', close);
  })

  return client;
};
