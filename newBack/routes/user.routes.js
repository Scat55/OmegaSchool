const  Router = require('express')
const router = new Router()

const multer = require('multer');
const fs = require('fs');
const path = require('path');
const userController = require("../controller/user_controller")
const {check} = require("express-validator");


const userMiddleware = require('../middlewaree/userMiddlewaer');
const roleMiddleware = require('../middlewaree/roleMiddlewaer')






router.get('/user_list', roleMiddleware(['Ученик']), userController.getUserList)
router.get('/user_id/:email', userController.getUserIDForEmail)


router.get('/user_inf_email/:email', userController.getUserDataForEmail)
router.get('/user_inf/:user_id', userController.getUserInformation)
router.post('/addition_data', userController.additionalData)


// router.put('/user:id', userController.updateUser)
// router.delete('/user:id', userController.deleteUser)

module.exports = router