const express = require('express');
const router = express.Router();
const ManagerController = require('../controllers').manager;
const middleware = require('../controllers/middleware');

router.post('/addTask', middleware.checkManager, ManagerController.addTask);

router.put('/modifySalary', middleware.checkManager, ManagerController.modifySalary);
router.put('/changeStatus', middleware.checkManager, ManagerController.changeStatus);
router.post('/assignToProject', middleware.checkManager, ManagerController.assignRoleOnProject);


router.get('/collectEmployeeData', middleware.checkManager, ManagerController.collectUserDataFromDepartment);
router.get("/getActivePercentage", middleware.checkManager, ManagerController.getActivePercentage);
router.get('/getSalaryData', middleware.checkManager, ManagerController.getSalaryData);
router.get('/getResolvedTasks', middleware.checkManager, ManagerController.getResolvedTasks);

module.exports = router;