const  Router = require('express')
const router = new Router()

const multer = require('multer');
const fs = require('fs');
const path = require('path');

const userController = require("../controller/user_controller")
const userMiddleware = require('../middlewaree/userMiddlewaer');
const roleMiddleware = require('../middlewaree/roleMiddlewaer')


<<<<<<< HEAD
router.get('/user_list', roleMiddleware(['Ученик','Эксперт']), userController.getUserList)
router.get('/user_id/:email',roleMiddleware(['Ученик','Эксперт','Учитель']), userController.getUserIDForEmail)
router.get('/user_inf_email/:email',userMiddleware, userController.getUserDataForEmail)
router.get('/user_inf/:user_id',userMiddleware, userController.getUserInformation)
router.post('/addition_data',userMiddleware, userController.additionalData)
router.get('/addition_data',userMiddleware, userController.additionalData)
=======

router.get('/user_list', roleMiddleware(['Ученик','Эксперт']), userController.getUserList)
router.get('/user_id/:email',roleMiddleware(['Ученик','Эксперт','Учитель']), userController.getUserIDForEmail)
router.get('/user_inf_email/:email',roleMiddleware(['Ученик','Эксперт','Учитель']), userController.getUserDataForEmail)
router.get('/user_inf/:user_id',roleMiddleware(['Ученик','Эксперт','Учитель']), userController.getUserInformation)
router.post('/addition_data',roleMiddleware(['Ученик','Эксперт','Учитель']), userController.additionalData)
>>>>>>> origin/main

router.post('/upload/',
    // roleMiddleware(['Эксперт','Учитель']),
    userController.postFile)
router.get('/download', roleMiddleware(['Эксперт','Учитель']), userController.getFile)

// router.put('/user:id', userController.updateUser)
// router.delete('/user:id', userController.deleteUser)

module.exports = router