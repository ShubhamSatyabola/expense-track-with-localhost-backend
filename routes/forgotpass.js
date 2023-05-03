const express = require('express');

const forgotpassController = require('../controllers/forgotpass');

const router = express.Router();

router.use('/forgot-password', forgotpassController.forgotPassword)


module.exports = router;