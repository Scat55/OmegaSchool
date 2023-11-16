const Router = require('express')
const router = new Router()

const db = require("../db");
const store = require('../store')
const mail = require('../mail')
const { existsSync, renameSync } = require("fs");
const { join } = require("path");

const userController = require("../controller/user_controller")
const userMiddleware = require('../middlewaree/userMiddlewaer');
const roleMiddleware = require('../middlewaree/roleMiddlewaer')
const { isUUID } = require("validator");
const jwt = require("jsonwebtoken");
const { secret } = require("../config");

router.get('/user_list', userController.getUserList)
// roleMiddleware(['Ученик', 'Эксперт', 'Учитель']),
router.get('/user_id/:email',roleMiddleware(['Ученик', 'Эксперт', 'Учитель']), userController.getUserIDForEmail)
router.get('/user_inf_email/:email', userMiddleware, userController.getUserDataForEmail)
router.get('/user_inf/:user_id', userMiddleware, userController.getUserInformation)
router.post('/addition_data', roleMiddleware(['Ученик', 'Эксперт', 'Учитель']), userController.additionalData)
//router.post('/add_level_1_test',roleMiddleware(['Учитель','Эксперт']) ,userController.add_level_1_test)
router.get('/getTestForExpert', roleMiddleware(['Учитель', 'Эксперт']), userController.getTasksForExpert)
router.get('/getTypeOfUser', userController.getTypeOfUser)
router.post('/CreateComandos', userController.CreateComandos);


router.get('/getTasksForStudent', roleMiddleware(['Ученик', 'Учитель', 'Эксперт']), userController.getTasksForStudent)
router.get('/getTasksForStudent/:testID', roleMiddleware(['Ученик', 'Учитель', 'Эксперт']), userController.getTasksByID)
router.post('/getAnswerByStudent1/:testID', roleMiddleware(['Ученик']), userController.getAnswerByStudent1)
router.post('/getAnswerByStudent2/:testID/:student_solution', roleMiddleware(['Ученик']), store.upload.any(), userController.getAnswerByStudent2)
router.post('/getAnswerByStudent3/:testID/:student_solution', roleMiddleware(['Ученик']), store.upload.any(), userController.getAnswerByStudent3)
router.get('/getTasksForStudentWithOcenka', roleMiddleware(['Ученик']), userController.getTasksForStudentWithOcenka)


router.post('/getTasksHintForStudent/:testID', roleMiddleware(['Ученик']), userController.getTasksHintForStudent)
router.post('/getTasksAnswerForStudent/:testID', roleMiddleware(['Ученик']), userController.getTasksAnswerForStudent)


router.get('/getTasksForExpertByID/:testID', roleMiddleware(['Эксперт']), userController.getTasksByID)
router.post('/updateTestByExpert', roleMiddleware(['Эксперт']), userController.updateTestByExpert)//проставление ver_1 ver_2


router.get('/getTasksForTeacherByID/:testID', roleMiddleware(['Учитель', 'Эксперт']), userController.getTasksByID)
router.get('/getTasksForTeacher', roleMiddleware(['Учитель', 'Эксперт']), userController.getTasksForTeacher)
router.get('/getTasksForTeacherByStudent', roleMiddleware(['Учитель', 'Эксперт']), userController.getTasksForTeacherByStudent)
router.get('/getTasksForTeacherByStudentByID/:testID/:userID', roleMiddleware(['Учитель', 'Эксперт']), userController.getTasksForTeacherByStudentByID)
router.post('/updateTestByTeacher/:testID/:userID', roleMiddleware(['Учитель', 'Эксперт']), userController.updateTestByTeacher)

//
//
//
//
//
//маршруты для работы с файлами
//маршрут для ручной загрузки файла или файлов получения файла.
router.post('/uploads/', roleMiddleware(['Ученик', 'Эксперт', 'Учитель']), userController.uploads)
router.post('/add_level_1_test_with_files/:task_test/:task_description/:classes/:subject/:options', roleMiddleware(['Учитель', 'Эксперт']), store.upload.array('files'), userController.addTestAndUpload)
router.post('/add_level_1/:task_test_coded/:task_description_coded/:classes/:subject/:options', roleMiddleware(['Учитель', 'Эксперт']), store.upload.any(), userController.addTestAndUpload)

router.post('/add_level_2/:task_test_coded/:task_description_coded/:task_hint/:task_answer/:classes/:subject', roleMiddleware(['Учитель', 'Эксперт']), store.upload.any(), userController.addTest2AndUpload)
router.post('/add_level_3/:task_test_coded/:task_description_coded/:classes/:subject', roleMiddleware(['Учитель', 'Эксперт']), store.upload.any(), userController.addTest3AndUpload)

//Маршрут для получения файла или файлов.
//Поиск всех файлов, загруженных пользователем
router.get('/list_all_files', roleMiddleware(['Ученик', 'Эксперт', 'Учитель']), userController.listUserFiles);
router.post('/delete_user_files/:file_names', roleMiddleware(['Ученик', 'Эксперт', 'Учитель']), userController.deleteUserFiles);
router.get('/download/:file_names', roleMiddleware(['Ученик', 'Эксперт', 'Учитель']), userController.download);

router.get('/verify_email/:email/', async (req, res) => {
  try {
    const email = req.params.email;

    // Выводим для отладки
    console.log(email);

    // Генерируем код подтверждения
    const verificationCode = await mail.generateVerificationCode(email);

    // Отправляем письмо с кодом подтверждения
    try {
      console.log('sendVerificationEmail', email, verificationCode)
      const verificationLink = `http://localhost:8080/verify-email/${email}/${verificationCode}`;

      mail.transporter.sendMail({
        from: 'omegalspu@gmail.com',
        to: email,
        subject: 'Подтверждение Email',
        html: `Пожалуйста, кликните <a href="${verificationLink}">здесь</a>, чтобы подтвердить ваш email.`
      });

      await mail.saveVerificationCode(email, verificationCode);
      console.log('Email успешно отправлен');
    } catch (error) {
      console.error('Ошибка при отправке email:', error);
      throw error;
    }

    await mail.checkVerificationCode(email, verificationCode);
    await mail.setUserEmailVerified(email);

    res.send('Письмо с кодом подтверждения отправлено на ваш email.');
  } catch (error) {
    console.error('Ошибка при обработке запроса на подтверждение email:', error);
    res.status(500).send('Произошла ошибка при обработке запроса.');
  }
});
router.get('/verify_email/:email/:code/', async (req, res) => {
  const verificationCode = req.params.code;
  const email = req.params.email;

  await mail.checkVerificationCode(email, verificationCode);
  await mail.setUserEmailVerified(email);
  console.log('Email успешно отправлен 2');

  res.send('Аккаунт активирован');
})

module.exports = router