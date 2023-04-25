const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/sign-up', userController.getSignUp);

router.post('/sign-up', userController.postSignUp);


module.exports = router;