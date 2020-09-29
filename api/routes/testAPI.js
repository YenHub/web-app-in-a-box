var express = require('express');
var router = express.Router();
var testController = require('../controllers/testController');

router.get('/', testController.index);

router.get('/payload', testController.testPayload);

module.exports = router;