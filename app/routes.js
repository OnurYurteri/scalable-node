const express = require('express');

const router = express.Router();

const AppController = require('./controller');

router.get('/login', AppController.login);

module.exports = router;
