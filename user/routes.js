const express = require('express');
const router = express.Router();
var AppService = require('../app/service')

const UserController = require('./controller')

router.get('/', AppService.verifyToken, UserController.getUsers)

module.exports = router;