const  Router = require('express')
const router = new Router()

const db = require("../db");
const store = require('../store')
const mail = require('../mail')
const {existsSync, renameSync} = require("fs");
const {join} = require("path");

const userController = require("../controller/user_controller")
const userMiddleware = require('../middlewaree/userMiddlewaer');
const roleMiddleware = require('../middlewaree/roleMiddlewaer')
const {isUUID} = require("validator");
const jwt = require("jsonwebtoken");
const {secret} = require("../config");

router.get('/user_list', userController.getUserList)
router.get('/user_id/:email',roleMiddleware(['Ученик','Эксперт','Учитель']), userController.getUserIDForEmail)
router.get('/user_inf_email/:email',userMiddleware, userController.getUserDataForEmail)
router.get('/user_inf/:user_id',userMiddleware, userController.getUserInformation)
router.post('/addition_data',roleMiddleware(['Ученик','Эксперт','Учитель']), userController.additionalData)
//router.post('/add_level_1_test',roleMiddleware(['Учитель','Эксперт']) ,userController.add_level_1_test)
router.get('/getTestForExpert',roleMiddleware(['Учитель','Эксперт']), userController.getTasksForExpert)


router.get('/getTasksForStudent',roleMiddleware(['Ученик']), userController.getTasksForStudent)
router.get('/getTasksForStudent/:testID',roleMiddleware(['Ученик']), userController.getTasksByID)
router.post('/getAnswerByStudent1/:testID',roleMiddleware(['Ученик']), userController.getAnswerByStudent1)
router.post('/getAnswerByStudent2/:testID/:student_solution',roleMiddleware(['Ученик']), store.upload.array('files'), userController.getAnswerByStudent2)
router.post('/getAnswerByStudent3/:testID',roleMiddleware(['Ученик']), userController.getAnswerByStudent3)


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

router.get('/verify_email/:code/', roleMiddleware(['Ученик','Эксперт','Учитель']),  async (req, res) => {
    const {user_id} = jwt.decode(req.session.token, secret)

    //сохранения кода в бд
    await mail.saveVerificationCode(user_id, user_id)

    //пользователь получает код
    await mail.transporter.sendMail({
        from: 'omegalspu@gmail.com',
        to: 'siniukovnikita@gmail.com',
        subject: 'Подтверждение Email',
        html: `Пожалуйста, кликните <a href="http://omega-lspu.ru/verify-email?code=${user_id}&user=${user_id}">здесь</a>, чтобы подтвердить ваш email.`
    }, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    //проверка кода подтверждения с базой
    const isValid = await mail.checkVerificationCode(user_id, user_id);

    if (isValid) { await mail.setUserEmailVerified(user_id);
        res.send('Email успешно подтвержден!');
    } else { res.status(400).send('Неверный код подтверждения.'); }
});

module.exports = router