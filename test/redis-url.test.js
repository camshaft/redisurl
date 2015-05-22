var redis = require("..");

describe("redis-url", function(){
  it("should make a client from a url", function(done) {
    var client = redis("redis://localhost:6379");

    client.on("connect", function() {
      done();
    });
  });

  it("should default to localhost", function(done){
    var client = redis();

    client.on("connect", function() {
      done();
    });
  });
});
