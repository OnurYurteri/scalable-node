const AppService = require('./service');
const logger = require('../logger/service').app;

exports.login = async (req, res) => {
  // Validate request parameters, queries using express-validator
  logger.info('controller::login::{}');
  try {
    const users = await AppService.createToken({ user: 'onur' });
    return res.status(200).json({ status: 200, data: users, message: 'Login Succesfully!' });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
