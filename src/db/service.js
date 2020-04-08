require('dotenv').config();
const mongoose = require('mongoose');
const logger = require('../logger/service').db;

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOSTNAME, MONGO_PORT, MONGO_DB_NAME } = process.env;

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB_NAME}?authSource=admin`;

const connection = mongoose.connection;

connection.on('connecting', () => {
  logger.info('service::onConnecting::Trying to connect to mongo');
});

connection.on('error', (err) => {
  logger.error(`service::onError::error::${JSON.stringify(err)}::{}`);
});
connection.on('connected', () => {
  logger.info('service::onConnected::Connected to mongo');
});
connection.once('open', () => {
  logger.info('service::onOpen::Connection opened to mongo');
});
connection.on('reconnected', () => {
  logger.info('service::onReconnect::Reconnected to mongo');
});
connection.on('disconnected', () => {
  logger.warn('service::disconnected::Disconnected from mongo');
  this.connect();
});

exports.connect = () => {
  mongoose.connect(
    url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      auto_reconnect: true,
    },
    (err) => {
      if (err) {
        logger.error(`service::connect::error::${JSON.stringify(err)}::Cannot connect to mongo`);
      }
    }
  );
};

exports.checkConnectionMiddleware = (req, res, next) => {
  const val = mongoose.connection.readyState;
  if (val !== 1) {
    logger.error(
      `service::checkConnectionMiddleware::on::${req.originalUrl}::Mongo is not connected on ${MONGO_HOSTNAME}:${MONGO_PORT}`
    );
    res
      .status(400)
      .json({ status: 400, message: 'Unexpected error occured, please try again later.' });
    return;
  }
  next();
};
