module.exports = {
  apps: [
    {
      name: 'app',
      script: './dist/apps/app/main.js',
    },
    {
      name: 'amqp-service',
      script: './dist/apps/amqp-service/main.js',
      instances: 5,
      exec_mode: 'fork',
    },
    {
      name: 'mqtt-service',
      script: './dist/apps/mqtt-service/main.js',
      instances: 5,
      exec_mode: 'fork',
    },
    {
      name: 'redis-service',
      script: './dist/apps/redis-service/main.js',
      instances: 5,
      exec_mode: 'fork',
    },
  ],
};
