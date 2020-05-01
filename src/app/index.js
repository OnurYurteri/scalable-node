const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const AppService = require('./service');
const logger = require('../logger/service').app;

/* Import Routes */
const UserRoutes = require('../user/routes');

/* Express App Creation & Configuration */
const app = express();
app.use(express.json());
app.use(AppService.invalidRequestBodyMiddleware);
app.use(helmet());
app.set('trust proxy', true);
morgan.token('remote-addr', (req) => {
  return req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
});
app.use(morgan('short', { stream: logger.stream }));

/* Add Routes */
app.use('/user', UserRoutes);
app.use('/', AppService.defaultPathHandler);

exports.App = app;
