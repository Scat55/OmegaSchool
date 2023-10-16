const  Router = require('express')
const router = new Router()

const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Настройка местоположения для сохранения загруженных файлов
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Укажите путь к каталогу для хранения файлов
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // Генерируйте уникальное имя файла
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const userController = require("../controller/user_controller")

const {check} = require("express-validator");


router.post('/add_user', [
    check('email',"Должен быть адресом эл.почты").isEmail().notEmpty(),
    check('password', "Должен быть больше 8, и меньше 30").isLength({ min: 8, max: 30 }).notEmpty(),
    check('gender', "Мужской или Женский").isIn(['Женский','Мужской']).notEmpty(),
    check('type_user', "Тип должен быть Ученик, Учитель, Эксперт").isIn(['Ученик', 'Учитель', 'Эксперт']).notEmpty(),
], userController.addUser)

router.post('/check_user', userController.checkUser)

router.get('/user_list', userController.getUserList)
router.get('/user_id/:email', userController.getUserIDForEmail)
router.get('/user_with_data/:email', userController.getUserDataForEmail)
router.get('/user_with_inf/:user_id', userController.getUserInformation)

router.put('/addition_data', userController.additionalData)

router.post('/upload',
    multer({ storage })
        .single('file'), userController.uploadFile
)
router.get('/download/:file',
    multer({ storage })
        .single('file'), userController.downloadFile
)

// router.put('/user:id', userController.updateUser)
// router.delete('/user:id', userController.deleteUser)

module.exports = router