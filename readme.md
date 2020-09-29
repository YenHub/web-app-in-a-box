# React Front End, Express Back End

```bash
# Start Front End
cd client && npm start

# Start Back End
cd api && npm run dev
```

## Docker

```bash
# Launch docker container (-d: detached)
docker-compose up -d

# We can then also do (due to docker-componse `container_name: node-mysql`)
docker start react-express-mysql

# Exec commands in the container:
docker exec -it [container_name] mysql -uroot -p
```

