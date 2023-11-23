const express = require('express');
const accountController = require('../controllers/AccountController');
const router = express.Router();

router.post('/signup', accountController.signUp);
router.post('/login', accountController.logIn);
router.post('/logout', accountController.logOut);

module.exports = router;