const logger = require('../logger/service').user;
const User = require('./model');

// eslint-disable-next-line no-unused-vars
exports.getUsers = async (query, page, limit) => {
  logger.info('service::getUsers::{}');
  try {
    const users = await User.find(query);
    return users;
  } catch (e) {
    logger.error('service::getUsers::{}');
    throw e;
  }
};

exports.getUserWithEmail = async (email) => {
  logger.info(`service::getUserWithEmail::email::${email}::{}`);
  try {
    const query = { email };
    const user = await User.findOne(query);
    return user;
  } catch (e) {
    logger.error(`service::getUserWithEmail::${e.message}`);
    throw e;
  }
};

exports.create = async (username, email, pass, name, surname) => {
  logger.info(
    `service::create::values::${JSON.stringify({ username, email, pass, name, surname })}::{}`
  );
  const document = new User({ username, email, pass, name, surname });

  try {
    const user = await document.save();
    return user;
  } catch (e) {
    logger.error(`service::create::${e.message}`);
    throw e;
  }
};
