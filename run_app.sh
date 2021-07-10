#/bin/bash
git checkout package-lock.json
git pull
npm install
docker rm -f my-web-app-backend
docker build --rm -f Dockerfile.prod -t my-web-app-backend .
docker run -d --network my-net --hostname backend1 --restart=always --name my-web-app-backend my-web-app-backend
