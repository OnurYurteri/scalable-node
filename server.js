require('dotenv').config();
const express = require('express');
const helmet = require('helmet');

const app = express();
app.use(helmet());

const AppRoutes = require('./app/routes');
const UserRoutes = require('./user/routes');

app.use('/app', AppRoutes);
app.use('/user', UserRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${port}..`);
});
