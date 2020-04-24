const UserService = require('./service');
const createToken = require('../app/service').createToken;
const logger = require('../logger/service').user;

exports.create = async (req, res) => {
  logger.debug(`controller::create::requestBody::${JSON.stringify(req.body)}::{}`);
  try {
    const user = await UserService.create(
      req.body.username,
      req.body.email,
      req.body.pass,
      req.body.name,
      req.body.surname
    );
    const token = await createToken(user);
    return res.status(200).json({ status: 500, token });
  } catch (e) {
    logger.error(`controller::create::from::${e.from}::message::${e.message}`);
    return res
      .status(500)
      .json({ status: 500, message: 'Unexcepted error occured, please try again later.' });
  }
};

exports.login = async (req, res) => {
  // Validate request parameters, queries using express-validator
  logger.debug(`controller::login::requestBody::${JSON.stringify(req.body)}::{}`);
  try {
    const user = await UserService.getUserWithEmail(req.body.email);
    if (!user) {
      logger.info(`controller::login::email::${req.body.email}::User not found!`);
      return res.status(200).json({ status: 200, message: 'User not found!' });
    }

    const result = await user.passwordMatches(req.body.pass);
    if (result) {
      const token = await createToken(user);
      logger.info(`controller::login::email::${req.body.email}::Login successfully!`);
      return res.status(200).json({ status: 200, message: 'Login successfully!', token });
    }

    logger.info(`controller::login::email::${req.body.email}::Invalid password!`);
    return res.status(200).json({ status: 200, message: 'Invalid password!' });
  } catch (e) {
    logger.error(`controller::login::from::${e.from}::message::${e.message}::{}`);
    return res
      .status(500)
      .json({ status: 500, message: 'Unexcepted error occured, please try again later.' });
  }
};

exports.getUsers = async (req, res) => {
  // Validate request parameters, queries using express-validator
  // Log authorized user
  // eslint-disable-next-line no-console
  logger.info(`controller::getUsers::reqQuery::${req.query}::{}`);

  const page = req.query.page ? req.query.page : 1;
  const limit = req.query.limit ? req.query.limit : 10;
  try {
    const users = await UserService.getUsers({}, page, limit);
    return res.status(200).json({
      status: 200,
      data: users,
      user: req.user,
      message: 'Succesfully Users Retrieved',
    });
  } catch (e) {
    logger.error(`controller::getUsers::from::${e.from}::message::${e.message}`);
    return res
      .status(500)
      .json({ status: 500, message: 'Unexcepted error occured, please try again later.' });
  }
};
