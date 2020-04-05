require('dotenv').config();
const jwt = require('jsonwebtoken');
const logger = require('../logger/service').app;

const exprsInSec = parseInt(process.env.JWT_TOKEN_EXPR_SEC, 10) || 30;

exports.verifyToken = async (req, res, next) => {
  logger.info(`service::verifyToken::reqHeaders::${JSON.stringify(req.headers)}`);
  const bearerHeader = req.headers['x-api-token'];
  if (!bearerHeader) {
    logger.info('service::verifyToken::Token is not given');
    res.sendStatus(403);
    return;
  }

  req.token = bearerHeader;

  jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
    if (err) {
      logger.info('service::verifyToken::Token unauthorized');
      res.sendStatus(401);
      return;
    }
    req.authData = authData;
    logger.info('service::verifyToken::Authorized');
    next();
  });
};

exports.createToken = async (user) => {
  logger.info(`service::createToken::user::${JSON.stringify(user)}`);
  return jwt.sign(user, process.env.JWT_SECRET, { algorithm: 'HS256', expiresIn: exprsInSec });
};
