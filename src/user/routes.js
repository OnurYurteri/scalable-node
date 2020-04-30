const express = require('express');
const db = require('../db/service');
const AppService = require('../app/service');
const validation = require('./validation');

const router = express.Router();

const UserController = require('./controller');

router.get(
  '/',
  AppService.verifyTokenMiddleware,
  db.checkConnectionMiddleware,
  UserController.getUsers
);

router.post(
  '/create',
  validation.create,
  validation.resolve,
  db.checkConnectionMiddleware,
  UserController.create
);

router.post(
  '/login',
  validation.login,
  validation.resolve,
  db.checkConnectionMiddleware,
  UserController.login
);

module.exports = router;
