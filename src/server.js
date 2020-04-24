require('dotenv').config();

/* Internal Services */
const App = require('./app').App;
const db = require('./db/service');
const logger = require('./logger/service').server;

db.connect();

const port = process.env.PORT || 3000;
App.listen(port, () => {
  logger.info(`server::listen::Server started to listening on port ${port}..`);
});
