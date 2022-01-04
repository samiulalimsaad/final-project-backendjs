docker build -t final_backend_node:test .
cd ..

docker-compose down
docker-compose up -d --build 
