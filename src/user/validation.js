const { check, validationResult } = require('express-validator');

exports.resolve = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  return next();
};

exports.login = [
  check('email').notEmpty().isEmail().withMessage,
  check('pass').notEmpty().withMessage('Password cannot be empty!'),
];

exports.create = [
  check('username').notEmpty().withMessage('Username cannot be empty!'),
  check('email').notEmpty().isEmail().withMessage('Email must be valid!'),
  check('pass').notEmpty().withMessage('Password cannot be empty!'),
  check('name').notEmpty().withMessage('Name cannot be empty!'),
  check('surname').notEmpty().withMessage('Surname cannot be empty!'),
];
