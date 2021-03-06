const express = require('express');
const router = express.Router();
const userController = require('../controllers').user;
const middleware = require('../controllers/middleware');


///GET REGION

router.get('/profile', middleware.checkNotAuth, userController.getProfile);
router.get('/activity', middleware.checkNotAuth, userController.getResolvedActivity);

///////////////

///POST REGION
router.post('/register', userController.register);

router.post('/login', middleware.checkAuth, userController.login);

router.post('/assignTask', middleware.checkNotAuth, userController.assignSelfToTask);

///////////////

///PUT REGION
router.put('/updateInfo', middleware.checkNotAuth, userController.updateUser);

router.put('/markResolved/:taskId', middleware.checkNotAuth, userController.markResolvedTask);


//////////////
router.delete('/logout', middleware.checkNotAuth, userController.logout);
router.delete('/resignTask', middleware.checkNotAuth, userController.resignSelfFromTask);



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
