const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const middleware = require('../controllers/middleware');
const passport = require('passport');


router.post('/register', userController.register);

router.post('/login', middleware.checkAuth, userController.login);

router.delete('/logout', middleware.checkNotAuth, userController.logout);



//Auth info routes
router.get('/success', async (req, res) => {
    res.status(200).send(await req.session);
})
router.get('/fail', async (req, res) => {
    res.status(403).send({ message: "Email or password does not match!" })
})

router.get('/notAuth', async (req, res) => {
    res.status(403).send({ message: "You are not logged in." })
})


router.get('/alreadyAuth', async (req, res) => {
    res.status(403).send({ message: "You are already logged in." })
})

module.exports = router;
