# React Front End, Express Back End

This is essentially a Web App in a box.

We have an ExpressJS Web API, using WebSQL for it's data store.

The front end is React based and there is also a pre-configured phpMyAdmin instance to compliment the setup.


## Usage

Running the front or back end standalone

```bash
# Start Front End Dev Server Only
cd client && npm start

# Start Back End Dev Server Only
# (Not recommended, you'll need MySQL running too...)
cd api && npm run dev
```

Running the full solution

```bash
# Ensure you have docker installed & running
# It's recommended to use WSL2 with Ubuntu LTS

# Run the solution
docker-compose up

# Launch docker container (-d: detached)
docker-compose up -d

# Kill the solution
docker-compose down

# Build the containers
docker-compose build

# Recreate the solution & run
docker-compose up --build --force-recreate

# We can then also do (due to docker-componse `container_name: node-mysql`)
docker start react-express-mysql

# Exec commands in the container:
docker exec -it [container_name] mysql -uroot -p
```
