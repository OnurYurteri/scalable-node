require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const loggerService = require('./logger/service');

const app = express();
const logger = loggerService.server;

app.use(helmet());
app.use(morgan('short', { stream: logger.stream }));

const AppRoutes = require('./app/routes');
const UserRoutes = require('./user/routes');

app.use('/app', AppRoutes);
app.use('/user', UserRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${port}..`);
});
