const  Router = require('express')
const router = new Router()
const authMiddleware = require('../middlewaree/authMiddleware');

const authController = require('../controller/auth_controller')


router.post('/registration', authMiddleware.validateRegistration, authController.registration)
router.post('/login',authMiddleware.validateLogin,  authController.login);
//authMiddleware.validateLogin,

module.exports = router