const express = require('express');
const router = express.Router();
const { handleAlert } = require('../controllers/alertController');

router.post('/', handleAlert);

module.exports = router;

