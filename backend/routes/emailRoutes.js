const express = require('express');
const router = express.Router();
const EmailController = require('../controller/EmailController.js');

router.post('/enviar-email', EmailController.enviarEmail);

module.exports = router;
