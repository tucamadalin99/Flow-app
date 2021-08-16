const express = require('express');
const router = express.Router();
const userRouter = require('./user');
const managerRouter = require('./manager');
const leadRouter = require('./lead');
const otherRouter = require('./other');


router.use('/user', userRouter);
router.use('/lead', leadRouter);
router.use('/manager', managerRouter);
router.use('/other', otherRouter);

module.exports = router;