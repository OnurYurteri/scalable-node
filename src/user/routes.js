const express = require('express');
const db = require('../db/service');
const AppService = require('../app/service');

const router = express.Router();

const UserController = require('./controller');

router.get(
  '/',
  AppService.verifyTokenMiddleware,
  db.checkConnectionMiddleware,
  UserController.getUsers
);

module.exports = router;
