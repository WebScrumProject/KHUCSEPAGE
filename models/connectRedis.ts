require('dotenv').config()
const redis = require('redis')
const client = redis.createClient({
    url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/0`,
    legacyMode: true,
});

client.on('connect', () => {
    console.info('Redis connected');
  });
  client.on('error', (err: any) => {
    console.error('Redis Client Error', err);
  });
  client.connect().then();