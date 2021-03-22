const express = require('express');
const router = express.Router();
const LeadController = require('../controllers').lead;
const ManagerController = require('../controllers').manager;
const middleware = require('../controllers/middleware');

router.get('/getLeadProject', middleware.checkLead, LeadController.getLeadProject);
router.get('/getTasks/:projectId', middleware.checkLead, LeadController.getProjectTasks);

router.post('/addToProject/:userId/:projectId', middleware.checkLead, LeadController.addMemberToProject);
router.post('/addLeadTask', middleware.checkLead, ManagerController.addTask);

router.delete('/removeFromProject/:userId', middleware.checkLead, LeadController.removeMemberFromProject);

module.exports = router;