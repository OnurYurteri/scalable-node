require('dotenv').config();
const jwt = require('jsonwebtoken');
const logger = require('../logger/service').app;

const exprsInSec = parseInt(process.env.JWT_TOKEN_EXPR_SEC, 10) || 30;
const { NODE_ENV } = process.env;

exports.defaultPathHandler = (req, res) => {
  if (req.url === '/' && NODE_ENV === 'development') {
    const message = {
      node: `${process.env.INSTANCE ? process.env.INSTANCE : 'standalone'}`,
      headers: JSON.stringify(req.headers),
    };
    return res.status(200).json({
      status: 200,
      message,
    });
  }

  logger.warn(
    `service::defaultPathHandler::method::${req.method}::requestUrl::${req.url}::Route is not supported!`
  );
  return res.status(404).json({
    status: 404,
    message: 'Route is not supported!',
  });
};

exports.invalidRequestBodyMiddleware = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).send({ status: 400, message: err.message });
  }
  return next();
};

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
  const userObj = user;
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
