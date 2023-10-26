/* eslint-disable no-undef */
const redis=require("redis");
let redisClient;

(async () => {
	redisClient = redis.createClient();

	redisClient.on("error", (error) => console.error(`Error : ${error}`));
	redisClient.on("connect", () => console.log("Connection establish to redis"));

	await redisClient.connect();
})();
module.exports=redisClient;