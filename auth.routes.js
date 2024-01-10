const express = require("express");
const router = express.Router();

const authMiddleware = require('../middlewaree/authMiddleware');
const authController = require('../controller/auth_controller')

router.post('/registration', authMiddleware.validateRegistration, authController.registration)
router.post('/change_password', authController.change_password)
router.get('/:email/:verificationCode', authController.access_email);
router.post('/login', authMiddleware.validateLogin, authController.login);

module.exports = router;