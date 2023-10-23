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
router.post('/add_level_1_test',roleMiddleware(['Учитель']) ,userController.add_level_1_test)
router.post('/getTasksForExpert',roleMiddleware(['Эксперт']), userController.getTasksForExpert)

//маршруты для работы с файлами

//маршрут для ручной загрузки файла или файлов получения файла.
router.post('/uploads/', userMiddleware, store.upload.array('files'), async (req, res) => {
    const files = req.files;
    if (!files) {
        const error = new Error('Files upload failed');
        error.statusCode = 400;
        throw error;
    }
    console.log(files)
    const {user_id} = req.user;
    const {task_test, task_description, classes, questions} = req.body;

    // 1. Создайте запись в базе данных
    const taskQuery = 'INSERT INTO level_1_tests (user_id, task_test, task_description, classes) VALUES ($1, $2, $3, $4) RETURNING test_id';
    const taskValues = [user_id, task_test, task_description, classes];
    console.log(taskQuery)
    console.log(taskValues)

    let test_id;
    try {
        const result = await db.query(taskQuery, taskValues);
        test_id = result.rows[0].test_id;
    } catch (dbErr) { res.status(500).send('Ошибка при создании задания в базе данных.'); return; }

    const filePaths = req.files.map(file => {
        const today = new Date();
        const year = today.getFullYear().toString();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const day = today.getDate().toString().padStart(2, '0');
        const fileName = `${day}_${month}_${year}_${test_id}_${file.originalname}`;

        renameSync(file.path, join(file.destination, fileName));
        return join('uploads', fileName);
    });
    const filesString = filePaths.join(',');

    // Обновите запись в базе данных с путями к файлам
    const updateQuery = 'UPDATE level_1_tests SET add_file = $1 WHERE test_id = $2';
    const updateValues = [filesString, test_id];

    try {
        db.query(updateQuery, updateValues);
        res.send(`Файлы успешно загружены и информация обновлена в базе данных: ${filesString}`);
    } catch (updateErr) {
        console.error(updateErr);
        res.status(500).send('Ошибка при обновлении информации о файлах в базе данных.');
    }
});

//маршрут для получения файла, используя URL с датой и именем файла.
router.get('/uploads/:year/:filename', (req, res) => {
    const { year, filename } = req.params;
    const filePath = join(store.getUploadsPath(), filename);
    if (existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        const error = new Error('File not found');
        error.statusCode = 404;
        throw error;
    }
});

module.exports = router