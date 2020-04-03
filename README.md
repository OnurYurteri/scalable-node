## Upcoming

- [ ] Add logging mechanism
- [ ] Add mongo dao

### Includes

- [NodeJS](https://nodejs.org/en/)
- [ExpressJS](https://expressjs.com)
- [Helmet](https://helmetjs.github.io/)
- [Mongoose](http://mongoosejs.com/docs/guide.html)
- [Nodemon](https://nodemon.io/)
- [ESLint](https://eslint.org/)
- [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)
- [prettier-eslint](https://github.com/prettier/prettier-eslint)
- [node-jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- [dotenv](https://github.com/motdotla/dotenv)

### Installing

```bash
git clone https://github.com/OnurYurteri/node-express-boilerplate.git
cd node-express-boilerplate
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
mv .env.example .env

npm run start
http://localhost:3000/
```
