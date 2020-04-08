require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

/* Internal Services */
const db = require('./db/service');
const logger = require('./logger/service').server;

/* Routes */
const AppRoutes = require('./app/routes');
const UserRoutes = require('./user/routes');

const app = express();
app.use(helmet());
app.set('trust proxy', true);
morgan.token('remote-addr', (req) => {
  return req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
});
app.use(morgan('short', { stream: logger.stream }));

app.use('/app', AppRoutes);
app.use('/user', UserRoutes);
app.use('/', (req, res) => {
  const message = {
    node: `${process.env.INSTANCE ? process.env.INSTANCE : 'development'}`,
    headers: JSON.stringify(req.headers),
  };
  return res.status(200).json({
    status: 200,
    message,
  });
});

db.connect();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger.info(`server::listen::Server started to listening on port ${port}..`);
});
