const Redis = require("ioredis");
const redis = new Redis(
  "redis://:1d556d2ff3884a90b4bc84c694b96801@us1-magnetic-kodiak-34454.upstash.io:34454"
);
//redis.set("devpleno", "devpleno.com");
//redis.expire("devpleno", 10);
redis.get("devpleno").then((result) => {
  console.log(result);
});
