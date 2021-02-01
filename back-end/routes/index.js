const express = require('express');
const router = express.Router();
const userRouter = require('./user');
const managerRouter = require('./manager');


router.use('/user', userRouter);
router.use('/manager', managerRouter);

module.exports = router;