const { createClient } = require('redis')
const config = require('./index')

const redis = createClient({
  host: config.redis.host || '127.0.0.1', 
  port: config.redis.port || 6379
})

async function connectRedis() {
  redis.on('error', (err) => console.log('Redis Client Error', err));
  
  await redis.connect();

  console.log("Redis connected!");
}

module.exports = { redis, connectRedis }