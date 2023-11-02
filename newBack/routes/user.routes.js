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
//router.post('/add_level_1_test',roleMiddleware(['Учитель','Эксперт']) ,userController.add_level_1_test)
router.get('/getTestForExpert',roleMiddleware(['Учитель','Эксперт']), userController.getTasksForExpert)


router.get('/getTasksForStudent',roleMiddleware(['Ученик']), userController.getTasksForStudent)
router.get('/getTasksForStudent/:testID',roleMiddleware(['Ученик']), userController.getTasksByID)


router.post('/getTasksHintForStudent/:testID',roleMiddleware(['Ученик']), userController.getTasksHintForStudent)
router.post('/getTasksAnswerForStudent/:testID',roleMiddleware(['Ученик']), userController.getTasksAnswerForStudent)


router.get('/getTasksForExpertByID/:testID',roleMiddleware(['Эксперт']), userController.getTasksByID)
router.post('/updateTestByExpert',roleMiddleware(['Эксперт']), userController.updateTestByExpert)//проставление ver_1 ver_2


router.get('/getTasksForTeacherByID/:testID',roleMiddleware(['Учитель']), userController.getTasksByID)
router.get('/getTasksForTeacher',roleMiddleware(['Учитель']), userController.getTasksForTeacher)

//
//
//
//
//
//маршруты для работы с файлами
//маршрут для ручной загрузки файла или файлов получения файла.
router.post('/uploads/', roleMiddleware(['Ученик','Эксперт','Учитель']), userController.uploads)
router.post('/add_level_1_test_with_files/:task_test/:task_description/:classes/:subject/:options', roleMiddleware(['Учитель','Эксперт']), store.upload.array('files'), userController.addTestAndUpload)
router.post('/add_level_1/:task_test_coded/:task_description_coded/:classes/:subject/:options', roleMiddleware(['Учитель','Эксперт']), store.upload.any(), userController.addTestAndUpload)

router.post('/add_level_2/:task_test_coded/:task_description_coded/:task_hint/:task_answer/:classes/:subject', roleMiddleware(['Учитель','Эксперт']), store.upload.any(), userController.addTest2AndUpload)
router.post('/add_level_3/:task_test_coded/:task_description_coded/:classes/:subject', roleMiddleware(['Учитель','Эксперт']), store.upload.any(), userController.addTest3AndUpload)

//Маршрут для получения файла или файлов.
//Поиск всех файлов, загруженных пользователем
router.get('/list_all_files', roleMiddleware(['Ученик','Эксперт','Учитель']), userController.listUserFiles);
router.post('/delete_user_files/:file_names', roleMiddleware(['Ученик','Эксперт','Учитель']), userController.deleteUserFiles);
router.get('/download/:file_names', roleMiddleware(['Ученик','Эксперт','Учитель']), userController.download);

module.exports = router