const  Router = require('express')
const router = new Router()

const db = require("../db");
const store = require('../store')
const {existsSync, renameSync} = require("fs");
const {join} = require("path");

const userController = require("../controller/user_controller")
const userMiddleware = require('../middlewaree/userMiddlewaer');
const roleMiddleware = require('../middlewaree/roleMiddlewaer')
const {isUUID} = require("validator");

router.get('/user_list', userController.getUserList)
router.get('/user_id/:email',roleMiddleware(['Ученик','Эксперт','Учитель']), userController.getUserIDForEmail)
router.get('/user_inf_email/:email',userMiddleware, userController.getUserDataForEmail)
router.get('/user_inf/:user_id',userMiddleware, userController.getUserInformation)
router.post('/addition_data',roleMiddleware(['Ученик','Эксперт','Учитель']), userController.additionalData)
router.post('/add_level_1_test',roleMiddleware(['Учитель','Эксперт']) ,userController.add_level_1_test)
router.get('/get_level_1_test',roleMiddleware(['Учитель','Эксперт']), userController.getTasksForExpert)

router.get('/getTasksForExpertbyID/:testID',roleMiddleware(['Эксперт']), userController.getTasksForExpertbyID)
//  ,roleMiddleware(['Эксперт'])
//маршруты для работы с файлами
router.post('/updateTestByExpert',roleMiddleware(['Эксперт']), userController.updateTestByExpert)
//маршрут для ручной загрузки файла или файлов получения файла.
router.post('/uploads/', roleMiddleware(['Ученик','Эксперт','Учитель']), userController.uploads)
router.post('/add_level_1_test_with_files/:task_test/:task_description/:classes/:questions/:options', roleMiddleware(['Учитель','Эксперт']), store.upload.array('files'), userController.addTestAndUpload)

//маршрут для получения файла или файлов.
//Поиск всех файлов, загруженных пользователем
router.get('/list_all_files', roleMiddleware(['Ученик','Эксперт','Учитель']), userController.listUserFiles);
router.post('/delete_user_files/:file_names', roleMiddleware(['Ученик','Эксперт','Учитель']), userController.deleteUserFiles);
router.get('/download/:file_names', roleMiddleware(['Ученик','Эксперт','Учитель']), userController.download);

module.exports = router