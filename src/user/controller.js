const UserService = require('./service');
const logger = require('../logger/service').user;

exports.getUsers = async (req, res) => {
  // Validate request parameters, queries using express-validator
  // Log authorized user
  // eslint-disable-next-line no-console
  logger.info('controller:getUsers::{}');

  const page = req.params.page ? req.params.page : 1;
  const limit = req.params.limit ? req.params.limit : 10;
  try {
    const users = await UserService.getUsers({}, page, limit);
    return res
      .status(200)
      .json({ status: 200, data: users, message: 'Succesfully Users Retrieved' });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
