require('dotenv').config();
const jwt = require('jsonwebtoken');
const logger = require('../logger/service').app;

const exprsInSec = parseInt(process.env.JWT_TOKEN_EXPR_SEC, 10) || 30;

exports.verifyTokenMiddleware = async (req, res, next) => {
  logger.info(
    `service::verifyTokenMiddleware::originalUrl::${req.originalUrl}::reqHeaders::${JSON.stringify(
      req.headers
    )}::{}`
  );
  const bearerHeader = req.headers['x-api-token'];
  if (!bearerHeader) {
    logger.info('service::verifyTokenMiddleware::Token is not given');
    res.sendStatus(403);
    return;
  }

  req.token = bearerHeader;

  jwt.verify(req.token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      logger.info('service::verifyTokenMiddleware::Token unauthorized');
      res.sendStatus(401);
      return;
    }
    req.user = user;
    logger.info('service::verifyTokenMiddleware::Authorized');
    next();
  });
};

exports.createToken = async (user) => {
  const userObj = user.toJSON();
  delete userObj.pass;
  logger.info(`service::createToken::user::${JSON.stringify(userObj)}::{}`);
  try {
    return jwt.sign(userObj, process.env.JWT_SECRET, {
      algorithm: 'HS256',
      expiresIn: exprsInSec,
    });
  } catch (e) {
    e.from = 'app_service_createToken';
    throw e;
  }
};
