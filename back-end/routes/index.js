const express = require('express');
const router = express.Router();
const userRouter = require('./user');
const managerRouter = require('./manager');
const otherRouter = require('./other');


router.use('/user', userRouter);
router.use('/manager', managerRouter);
router.use('/other', otherRouter);

module.exports = router;