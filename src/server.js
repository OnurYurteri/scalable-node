require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const loggerService = require('./logger/service');

const app = express();
const logger = loggerService.server;

app.use(helmet());
app.set('trust proxy', true);

morgan.token('remote-addr', function (req) {
  return req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
});
app.use(morgan('short', { stream: logger.stream }));

const AppRoutes = require('./app/routes');
const UserRoutes = require('./user/routes');

app.use('/app', AppRoutes);
app.use('/user', UserRoutes);
app.use('/', (req, res) => {
  const message = {
    node: `${process.env.INSTANCE ? process.env.INSTANCE : 'development'}`,
    headers: JSON.stringify(req.headers)
  }
  return res
    .status(200)
    .json({
      status: 200,
      message: message,
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${port}..`);
});
