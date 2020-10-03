# web-app-in-a-box

![Author] ![Progress] ![Project Status] ![Open Issues] ![React Version] ![ExpressJS Version] ![Beer Money]

---

## What is it?

This is essentially a Web App in a box, front and back end.

![demo]

We have an ExpressJS Web API, using WebSQL for it's data store.

The front end is React based and there is also a pre-configured phpMyAdmin instance to compliment the setup.

---

## What does it do?

Whatever you want it to do really, the idea is, it's a simple, easy and fast full stack javascript web app in a box, front end, back end and DB included!

No mucking around! 🎉

---

## Quick Start Usage

The best way to run this solution is via Docker using WSL2 with your distro of preference.

```bash
# Start the solution (-d for detached mode)
docker-compose up

# Stop the solution (Ctrl+C)
docker-compose down
```

The api is hosted on port 9000, the front end on port 80

This can be customized via env variables, but those are the defaults.

Once you have the solution up and running, simply visit http://localhost/TestAPI to check it's working correctly, and begin developing the API and Front End.

## Development Commands

The React front end is currently happy to run standalone from it's root.

Working with the api is not currently recommended since the docker build provides your data store in MySQL.

You can get around this if you are handy with docker, simply spin up the mysql service with custom compose file.

### Running the front or back end standalone:

```bash
# Start Front End Dev Server Only
cd client && npm start

# Start Back End Dev Server Only
cd api && npm run dev
```

### Docker: Running the full solution

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


[Author]: https://img.shields.io/badge/made%20by-YenHub%20❤-blue
[Progress]:https://img.shields.io/badge/progress-dev-ff69b4
[Project Status]: https://img.shields.io/badge/status-active-brightgreen
[Open Issues]:https://img.shields.io/badge/issues-0%20open-brightgreen
[React Version]:https://img.shields.io/badge/React-16.13.1-important
[ExpressJS Version]:https://img.shields.io/badge/ExpressJS-4.16.1-blueviolet
[Beer Money]:https://img.shields.io/badge/beer%20money-$0-ff69b4
[demo]: ./web-app.png
