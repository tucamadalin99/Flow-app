const express = require('express');
const router = express.Router();
const LeadController = require('../controllers').lead;
const middleware = require('../controllers/middleware');

router.get('/getLeadProject', middleware.checkLead, LeadController.getLeadProject)

module.exports = router;