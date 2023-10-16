const  Router = require('express')
const router = new Router()

const multer = require('multer');
const fs = require('fs');
const path = require('path');
const userController = require("../controller/user_controller")
const {check} = require("express-validator");


const userMiddleware = require('../middlewaree/userMiddlewaer');
const roleMiddleware = require('../middlewaree/roleMiddlewaer')






router.get('/check_user', roleMiddleware(['Ученик']), userController.getUserList)



// router.get('/user_list', userController.getUserList)
// router.get('/user_id/:email', userController.getUserIDForEmail)
// router.get('/user_with_data/:email', userController.getUserDataForEmail)
// router.get('/user_with_inf/:user_id', userController.getUserInformation)
//
// router.put('/addition_data', userController.additionalData)


// router.put('/user:id', userController.updateUser)
// router.delete('/user:id', userController.deleteUser)

module.exports = router