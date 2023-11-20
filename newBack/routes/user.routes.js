const Router = require('express')
const router = new Router()

const userController = require("../controller/user_controller")
const userMiddleware = require('../middlewaree/userMiddlewaer');
const roleMiddleware = require('../middlewaree/roleMiddlewaer')
const store = require('../utils/store')

router.get('/user_list', userController.getUserList)
// roleMiddleware(['Ученик', 'Эксперт', 'Учитель']),
router.get('/user_id/:email', roleMiddleware(['Ученик', 'Эксперт', 'Учитель']), userController.getUserIDForEmail)
router.get('/user_inf_email/:email', userMiddleware, userController.getUserDataForEmail)
//userMiddleware
router.get('/user_inf/:user_id', userMiddleware, userController.getUserInformation)
router.post('/addition_data', roleMiddleware(['Ученик', 'Эксперт', 'Учитель']), userController.additionalData)
//router.post('/add_level_1_test',roleMiddleware(['Учитель','Эксперт']) ,userController.add_level_1_test)
router.get('/getTestForExpert', roleMiddleware(['Учитель', 'Эксперт']), userController.getTasksForExpert)
router.get('/getTypeOfUser', userController.getTypeOfUser)
router.post('/CreateComandos', userController.CreateComandos);


router.get('/getTasksForStudent', roleMiddleware(['Ученик', 'Учитель', 'Эксперт']), userController.getTasksForStudent)
router.get('/getTasksForStudent/:testID', roleMiddleware(['Ученик', 'Учитель', 'Эксперт']), userController.getTasksByID)
router.post('/getAnswerByStudent1/:testID', roleMiddleware(['Ученик']), userController.getAnswerByStudent1)
router.get('/getTasksForStudentWithOcenka', roleMiddleware(['Ученик']), userController.getTasksForStudentWithOcenka)


router.post('/getTasksHintForStudent/:testID', roleMiddleware(['Ученик']), userController.getTasksHintForStudent)
router.post('/getTasksAnswerForStudent/:testID', roleMiddleware(['Ученик']), userController.getTasksAnswerForStudent)
router.post('/likeToDeskriotion/:testID',roleMiddleware(['Ученик']),userController.likeToDeskriotion)

router.get('/getTasksForExpertByID/:testID', roleMiddleware(['Ученик','Учитель','Эксперт']), userController.getTasksByID)
router.post('/updateTestByExpert', roleMiddleware(['Ученик','Учитель','Эксперт']), userController.updateTestByExpert)//проставление ver_1 ver_2


router.get('/getTasksForTeacherByID/:testID', roleMiddleware(['Учитель', 'Эксперт']), userController.getTasksByID)
router.get('/getTasksForTeacher', roleMiddleware(['Учитель', 'Эксперт']), userController.getTasksForTeacher)
router.get('/getTasksForTeacherByStudent', roleMiddleware(['Учитель', 'Эксперт']), userController.getTasksForTeacherByStudent)
router.get('/getTasksForTeacherByStudentByID/:testID/:userID', roleMiddleware(['Учитель', 'Эксперт']), userController.getTasksForTeacherByStudentByID)
router.post('/updateTestByTeacher/:testID/:userID', roleMiddleware(['Учитель', 'Эксперт']), userController.updateTestByTeacher)

//Поиск всех файлов, загруженных пользователем, загрузка и выгрузка файлов
router.post('/uploads/', roleMiddleware(['Ученик', 'Эксперт', 'Учитель']), userController.uploads)

router.get('/list_all_files', roleMiddleware(['Ученик', 'Эксперт', 'Учитель']), userController.listUserFiles);

router.post('/getAnswerByStudent2/:testID/:student_solution', roleMiddleware(['Ученик']), store.upload.any(), userController.getAnswerByStudent2)
router.post('/getAnswerByStudent3/:testID/:student_solution', roleMiddleware(['Ученик']), store.upload.any(), userController.getAnswerByStudent3)

//одинаковый маршрут для сохранения обратной совместимости с frontend
router.post('/add_level_1_test_with_files/:task_test/:task_description/:classes/:subject/:options', roleMiddleware(['Учитель', 'Эксперт']), store.upload.any(), userController.addTestAndUpload)
router.post('/add_level_1/:task_test_coded/:task_description_coded/:classes/:subject/:options', roleMiddleware(['Учитель', 'Эксперт']), store.upload.any(), userController.addTestAndUpload)

router.post('/add_level_2/:task_test_coded/:task_description_coded/:task_hint/:task_answer/:classes/:subject', roleMiddleware(['Учитель', 'Эксперт']), store.upload.any(), userController.addTest2AndUpload)
router.post('/add_level_3/:task_test_coded/:task_description_coded/:classes/:subject', roleMiddleware(['Учитель', 'Эксперт']), store.upload.any(), userController.addTest3AndUpload)

router.post('/delete_user_files/:file_names', roleMiddleware(['Ученик', 'Эксперт', 'Учитель']), userController.deleteUserFiles);

router.get('/download/:file_names', roleMiddleware(['Ученик', 'Эксперт', 'Учитель']), userController.download);

router.post('/add_avatar', roleMiddleware(['Учитель', 'Эксперт']), store.upload.any(), userController.addTestAndUpload)

//Работа с почтой
router.get('/verify_email/:email/', userMiddleware, userController.setEmail);
router.get('/verify_email/:email/:code/', userMiddleware, userController.getEmailCode)

module.exports = router