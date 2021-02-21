const express = require('express');
const router = express.Router();
const ManagerController = require('../controllers').manager;
const middleware = require('../controllers/middleware');

router.post('/addTask', middleware.checkManager, ManagerController.addTask);

router.put('/modifySalary', middleware.checkManager, ManagerController.modifySalary);
router.put('/modifyLead', middleware.checkManager, ManagerController.modifyLead);


router.get('/collectEmployeeData', middleware.checkManager, ManagerController.collectUserDataFromDepartment);

module.exports = router;