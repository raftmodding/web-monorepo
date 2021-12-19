# assuming you have an alias called `dokku` set up
mc admin user add dokku raftmodding-web-backend <BACKEND_SECRET>
mc mb dokku/raftmodding-public
mc mb dokku/raftmodding-private
mc admin policy add dokku/ raftmodding-web-backend-policy minio.web-backend.json
mc admin policy set dokku/ raftmodding-web-backend-policy user=raftmodding-web-backend
mc policy set-json ./minio.publicread.json dokku/raftmodding-public
