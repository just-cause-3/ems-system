const Redis = require('ioredis');

// Allow multiple env var styles
const redisUrlEnv = process.env.REDIS_URL || process.env.REDIS_URI || process.env.REDIS;
const redisHost = process.env.REDIS_HOST;
const redisPort = process.env.REDIS_PORT && Number(process.env.REDIS_PORT);

let pub;
let sub;

if (redisUrlEnv) {
  pub = new Redis(redisUrlEnv);
  sub = new Redis(redisUrlEnv);
} else if (redisHost || redisPort) {
  pub = new Redis({ host: redisHost || '127.0.0.1', port: redisPort || 6379 });
  sub = new Redis({ host: redisHost || '127.0.0.1', port: redisPort || 6379 });
} else {
  pub = new Redis('redis://127.0.0.1:6379');
  sub = new Redis('redis://127.0.0.1:6379');
}

function publish(channel, message) {
  try {
    pub.publish(channel, typeof message === 'string' ? message : JSON.stringify(message));
  } catch (e) {
    console.error('Redis publish error:', e && e.message ? e.message : e);
  }
}

module.exports = { publish, sub };


