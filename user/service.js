const logger = require('../logger/service').user;
const User = require('./model');

const userObj = new User({
  username: 'onuryurteri',
  email: 'yurterionur@gmail.com',
  pass: 'passw0rd',
  name: 'Onur',
  surname: 'Yurteri',
});

// eslint-disable-next-line no-unused-vars
exports.getUsers = async (query, page, limit) => {
  logger.info('service::getUsers::{}');
  try {
    // const users = await User.find(query)
    return userObj;
  } catch (e) {
    // Log Errors
    logger.error('service::getUsers::{}');
    throw Error('Error while Paginating Users');
  }
};
