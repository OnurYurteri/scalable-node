require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.verifyToken = async (req, res, next) => {
  const bearerHeader = req.headers['x-api-token'];

  if (!bearerHeader) {
    res.sendStatus(403);
    return;
  }

  req.token = bearerHeader;

  jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
    if (err) {
      res.sendStatus(401);
      return;
    }
    req.authData = authData;
    next();
  });
};

exports.createToken = async (user) => {
  const exprsInSec = parseInt(process.env.JWT_TOKEN_EXPR_SEC, 10) || 30;
  return jwt.sign(user, process.env.JWT_SECRET, { algorithm: 'HS256', expiresIn: exprsInSec });
};
