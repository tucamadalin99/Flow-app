const express = require('express');
const router = express.Router();
const OtherController = require('../controllers').other;
const middleware = require('../controllers/middleware');

router.get('/getAllUsers', middleware.checkNotAuth, OtherController.getAllUsers);

module.exports = router;