const express = require('express');
const AppService = require('../app/service');

const router = express.Router();

const UserController = require('./controller');

router.get('/', AppService.verifyToken, UserController.getUsers);

module.exports = router;
