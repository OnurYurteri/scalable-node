## What is it?

- It's a experimental backend boilerplate for node
- Aims to create ground-basis/examples for
  - Loose coupled modules that could be converted to standalone app (Micro-service 101)
  - Pluggable logging module
  - Implementation of authentication (JWT)
  - Strategy for
    - Building and deploying app (Docker/docker-compose)
    - Scaling (Loadbalancing, caching etc)
    - Consistent contributions (Linters/Prettiers)

### Upcoming

- [x] Add logging mechanism
- [x] Add mongo dao
- [ ] Validator
- [x] Dockerize app
- [x] Ready to loadbalancing?
- [ ] Queuing mechanism (Kafka/RabbitMQ)?
- [ ] Shared cache (Hazelcast/Redis/Memcached)?
- [ ] Analytics?

### Made Out Of

- [NodeJS](https://nodejs.org/en/)
- [ExpressJS](https://expressjs.com)
- [Helmet](https://helmetjs.github.io/)
- [Mongoose](http://mongoosejs.com/docs/guide.html)
- [Nodemon](https://nodemon.io/)
- [Morgan](https://github.com/expressjs/morgan)
- [Winston](https://github.com/winstonjs/winston)
- [ESLint](https://eslint.org/)
- [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)
- [prettier-eslint](https://github.com/prettier/prettier-eslint)
- [node-jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- [dotenv](https://github.com/motdotla/dotenv)

### Installing

```bash
git clone https://github.com/OnurYurteri/scalable-node.git
cd scalable-node/src
npm ci
```

### Scripts

| Script        | Description                                                             |
| ------------- | ----------------------------------------------------------------------- |
| npm run dev   | Starts development server at localhost:3000                             |
| npm run debug | Starts debugging with [Inspector](https://nodejs.org/en/docs/inspector) |
| npm run lint  | Run Eslint to find out linting issues.                                  |

### Run at local server

```bash
cd scalable-node/src
cp .env.example .env

npm run start
http://localhost:3000/
```

### Run with Docker

```bash
cd scalable-node
docker build -t scalable-node_src:1.0 .
docker run --publish 3000:3000 scalable-node_src:1.0

npm run start
http://localhost:3000/
```

### With docker-compose (Multiple instance, nginx, mongoDB)

```bash
cd scalable-node
docker build -t scalable-node_src:1.0 .
docker-compose up
http://localhost:8080/
```
