module.exports = {
  apps: [
    {
      name: 'app',
      script: './dist/apps/app/main.js',
    },
    {
      name: 'amqp-service',
      script: './dist/apps/amqp-service/main.js',
    },
    {
      name: 'mqtt-service',
      script: './dist/apps/mqtt-service/main.js',
    },
    {
      name: 'redis-service',
      script: './dist/apps/redis-service/main.js',
    },
  ],
};
