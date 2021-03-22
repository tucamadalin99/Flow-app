const express = require('express');
const router = express.Router();
const LeadController = require('../controllers').lead;
const middleware = require('../controllers/middleware');

router.get('/getLeadProject', middleware.checkLead, LeadController.getLeadProject)

router.post('/addToProject/:userId/:projectId', middleware.checkLead, LeadController.addMemberToProject);

router.delete('/removeFromProject/:userId', middleware.checkLead, LeadController.removeMemberFromProject);

module.exports = router;