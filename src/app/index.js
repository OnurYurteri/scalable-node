const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('../logger/service').server;

/* Routes */
// const AppRoutes = require('./routes');
const UserRoutes = require('../user/routes');

/* Configurations */
const app = express();
app.use(express.json());
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).send({ status: 400, message: err.message });
  }
  return next();
});
app.use(helmet());
app.set('trust proxy', true);
morgan.token('remote-addr', (req) => {
  return req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
});
app.use(morgan('short', { stream: logger.stream }));
// app.use('/app', AppRoutes);
app.use('/user', UserRoutes);
app.use('/', (req, res) => {
  if (req.url !== '/') {
    logger.warn(`server::requestUrl::${req.url}::Route is not supported!`);
    return res.status(404).json({
      status: 404,
      message: 'Route is not supported!',
    });
  }
  const message = {
    node: `${process.env.INSTANCE ? process.env.INSTANCE : 'standalone'}`,
    headers: JSON.stringify(req.headers),
  };
  return res.status(200).json({
    status: 200,
    message,
  });
});

exports.App = app;
