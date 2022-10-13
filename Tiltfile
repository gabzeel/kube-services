docker_compose('./docker-compose.yml')

docker_build(
  'project-base',
  '.',
  dockerfile='Dockerfile',
)

# include('apps/app/Tiltfile')
include('apps/amqp-service/Tiltfile')
include('apps/mqtt-service/Tiltfile')
include('apps/redis-service/Tiltfile')