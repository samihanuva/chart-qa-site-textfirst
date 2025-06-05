// routes/responseRoutes.js
const express = require('express');
const router = express.Router();
const { saveResponse } = require('../controllers/responseController');


// POST /api/responses
router.post('/', saveResponse);
// router.get('/download', downloadResponsesAsCSV);  // <-- NEW
module.exports = router;

