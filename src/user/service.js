const logger = require('../logger/service').user;
const User = require('./model');

// eslint-disable-next-line no-unused-vars
exports.getUsers = async (query, page, limit) => {
  logger.info(
    `service::getUsers::query::${JSON.stringify(query)}::page::${page}::limit::${limit}::{}`
  );
  try {
    const users = await User.find(query);
    return users;
  } catch (e) {
    e.from = 'user_service_getUsers';
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
    e.from = 'user_service_getUserWithEmail';
    throw e;
  }
};

exports.create = async (username, email, pass, name, surname) => {
  logger.info(
    `service::create::username::${username}::email::${email}::pass::${pass}::name::${name}::surname::${surname}::{}`
  );
  const document = new User({ username, email, pass, name, surname });

  try {
    const user = await document.save();
    return user;
  } catch (e) {
    e.from = 'user_service_create';
    throw e;
  }
};
