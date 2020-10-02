const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');

router.get('/', testController.index);
router.get('/payload', testController.testPayload);
router.get('/reset', testController.reset);

module.exports = router;