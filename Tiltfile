docker_compose('./docker-compose.yml')

dc_resource('rabbitmq', labels=["brokers"])
dc_resource('mosquitto', labels=["brokers"])
dc_resource('redis', labels=["brokers"])

docker_build(
  'project-base',
  '.',
  dockerfile='Dockerfile',
)

# include('apps/app/Tiltfile')
# include('apps/amqp-service/Tiltfile')
include('apps/mqtt-service/Tiltfile')
# include('apps/redis-service/Tiltfile')