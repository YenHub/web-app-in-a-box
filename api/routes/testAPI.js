const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');

router.get('/', testController.index);

router.get('/payload', testController.testPayload);

module.exports = router;