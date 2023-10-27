const db = require('../db')
const {validationResult} = require("express-validator");
const {json} = require("express");
const jwt = require("jsonwebtoken");
const fs = require('fs');
const multer = require('multer');
const {randomUUID} = require("crypto");
//const { upload } = require('../multer/multerConfig');
const store = require('../store')
const {resolve, join} = require("path");
const archiver = require('archiver');
const {fsync} = require("fs");


class User_controller {

    async getUserList(req, res) {
        try {
            const query = 'SELECT * FROM users';

            // Выполняем асинхронный SQL-запрос для получения пользователей
            const users = await db.query(query);

            // Отправляем список пользователей в ответе
            res.json(users.rows);
        } catch (error) {
            console.error('Ошибка при выполнении SQL-запроса:', error);
            res.status(500).json({error: 'Ошибка на сервере'});
        }
    }

    async additionalData(req, res) {
        try {
            const user_id = req.user_id
            // Извлекаем данные из тела запроса
            const {first_name, last_name, patronymic, birthdate, classes, item} = req.body;
            console.log(user_id, first_name, last_name, patronymic, birthdate, classes, item)
            // Создаем SQL-запрос для обновления данных пользователя в таблице users
            const sql = `UPDATE users 
                   SET first_name = $1, last_name = $2, patronymic = $3, birthdate = $4, classes = $5, item = $6
                   WHERE user_id = $7`;

            // Используем асинхронный метод для выполнения SQL-запроса
            await db.query(sql, [first_name, last_name, patronymic, birthdate, classes, item, user_id]);

            console.log('Дополнительные данные успешно обновлены');
            res.status(200).json({message: 'Дополнительные данные успешно обновлены'});
        } catch (error) {
            console.error('Ошибка при обновлении данных:', error);
            res.status(500).json({message: 'Произошла ошибка при обновлении данных'});
        }
    }

    async getUserInformation(req, res) {

        const user_id = req.params.user_id;
        try {
            // Асинхронные SQL-запросы для получения данных пользователя, оценок и достижений
            const [userResult, gradesResult, achievementsResult, achievements_teacherResult] = await Promise.all([
                db.query('SELECT * FROM users WHERE user_id = $1', [user_id]),
                db.query('SELECT * FROM student_grades WHERE user_id = $1', [user_id]),
                db.query('SELECT * FROM achievements WHERE user_id = $1', [user_id]),
                db.query('SELECT * FROM teacher_grades WHERE user_id = $1', [user_id])
            ]);

            // Извлекаем результаты из объектов результата
            const user = userResult.rows[0];
            const grades = gradesResult.rows;
            const achievements = achievementsResult.rows;
            const grades_teacher = achievements_teacherResult.rows;

            if (!user) {
                console.log(`Пользователь с ID ${user_id} не найден`);
                return res.status(404).json({message: 'Пользователь не найден'});
            }

            // Соберите результаты в один объект
            const userData = {
                user,
                grades,
                achievements,
                grades_teacher,
            };

            console.log(`Данные для пользователя с ID ${user_id} найдены`);
            res.json(userData);
        } catch (error) {
            console.error('Ошибка при выполнении SQL-запросов:', error.message);
            res.status(500).json({error: 'Ошибка на сервере'});
        }
    }

    async getUserIDForEmail(req, res) {
        // Извлекаем адрес электронной почты из параметров запроса
        const email = req.params.email;

        // SQL-запрос для получения user_id по адресу электронной почты
        const sql = 'SELECT user_id FROM users WHERE email = $1';

        try {
            // Выполняем SQL-запрос и ожидаем результат с использованием async/await
            const {rows} = await db.query(sql, [email]);

            if (rows.length > 0) {
                // Если есть результаты запроса, извлекаем user_id
                const user_id = rows[0].user_id;
                console.log(`User ID для пользователя с email ${email} найден: ${user_id}`);
                // Отправляем user_id в формате JSON
                res.json({user_id});
            } else {
                // Если результаты запроса пусты, отправляем сообщение об ошибке
                console.log(`User ID для пользователя с email ${email} не найден`);
                res.status(404).json({message: 'User ID не найден'});
            }
        } catch (error) {
            // Обрабатываем ошибку выполнения SQL-запроса
            console.error('Ошибка при выполнении SQL-запроса:', error.message);
            res.status(500).json({error: 'Ошибка на сервере'});
        }
    }

    async getUserDataForEmail(req, res) {
        const email = req.params.email; // Получите email из параметров запроса.

        try {


            const [userResult, achievementsResult, gradesResult, achievements_teacherResult] = await Promise.all([
                db.query('SELECT * FROM users WHERE email = $1', [email]),
                db.query('SELECT * FROM achievements WHERE email = (SELECT user_id FROM users WHERE email = $1)', [email]),
                db.query('SELECT * FROM student_grades WHERE email = (SELECT user_id FROM users WHERE email = $1)', [email]),
                db.query('SELECT * FROM teacher_grades WHERE email = $1', [user_id])
            ]);

            // Извлекаем результаты из объектов результата
            const user = userResult.rows[0];
            const grades = gradesResult.rows;
            const achievements = achievementsResult.rows;
            const grades_teacher = achievements_teacherResult.rows;


            // Соберите результаты в один объект
            const userData = {
                user,
                achievements,
                grades,
                grades_teacher,
            };

            console.log(`Данные для пользователя с Email ${email} найдены`);
            res.json(userData);
        } catch (error) {
            console.error('Ошибка при выполнении SQL-запросов:', error.message);
            res.status(500).json({error: 'Ошибка на сервере'});
        }
    }

  //   async add_level_1_test(req, res) {
  //
  //       // Разбираем JSON-объект из запроса
  //       const {task_test, task_description, add_file, classes, questions} = req.body;
  //       const user_id = req.user_id
  //
  //       if (!Array.isArray(questions)) {
  //           return res.status(400).json({error: 'Questions should be an array'});
  //       }
  //
  //       // Вставляем данные теста в базу данных
  //       const insertTestQuery = `
  //   INSERT INTO level_1_tests (user_id, task_test, task_description, add_file, classes)
  //   VALUES ($1, $2, $3, $4, $5)
  //   RETURNING test_id;
  // `;
  //       const testValues = [user_id, task_test, task_description, add_file, classes];
  //
  //       // Отправляем запрос и получаем ID вставленного теста
  //       db.query(insertTestQuery, testValues)
  //           .then((testResult) => {
  //               const testId = testResult.rows[0].test_id;
  //
  //               // Вставляем вопросы и варианты ответов
  //               questions.forEach((question) => {
  //                   const {question_text, options} = question;
  //
  //                   // Вставляем данные вопроса
  //                   const insertQuestionQuery = `
  //         INSERT INTO questions (text, test_id)
  //         VALUES ($1, $2)
  //         RETURNING question_id;
  //       `;
  //
  //                   const questionValues = [question_text, testId];
  //
  //                   // Отправляем запрос и получаем ID вставленного вопроса
  //                   db.query(insertQuestionQuery, questionValues)
  //                       .then((questionResult) => {
  //                           const questionId = questionResult.rows[0].question_id;
  //                           // console.log(req.body)
  //                           // Вставляем варианты ответовs
  //                           for (let question in questions) {
  //                               const {option_text, is_correct} = questions[question];
  //                               // console.log(question)
  //                               // Вставляем данные варианта ответа
  //                               const insertOptionQuery = `
  //               INSERT INTO options (text, is_correct, question_id)
  //               VALUES ($1, $2, $3);
  //             `;
  //                               const optionValues = [option_text, is_correct, questionId];
  //
  //                               // Отправляем запрос для вставки варианта ответа
  //                               db.query(insertOptionQuery, optionValues);
  //                           }
  //                           ;
  //                       })
  //                       .catch((error) => {
  //                           console.error('Ошибка при вставке вопроса:', error.message);
  //                       });
  //               });
  //
  //               // Отправляем ответ об успешном добавлении теста
  //               res.json({message: 'Тест успешно добавлен'});
  //           })
  //           .catch((error) => {
  //               console.error('Ошибка при вставке теста:', error.message);
  //               res.status(500).json({error: 'Ошибка на сервере'});
  //           });
  //   };

    async getTasksForExpert(req, res) {
        try {
            const user_id = req.user_id;

            // Запрос для level_1_tests
            const testsSql = `
        SELECT *
        FROM level_1_tests
        WHERE (ver_1_id IS NULL OR ver_1_id != $1) AND (ver_2_id IS NULL OR ver_2_id != $1);
    `;

            const optionsResult = await db.query(testsSql, [user_id]);

            const formattedResponse = optionsResult.rows.map(test => {
                    return {
                    tast_id: test.test_id, // предполагаю что это поле у вас в базе данных
                    task_test: test.task_test, // предполагаю что это поле у вас в базе данных

                }
            });

            res.json(formattedResponse);

        } catch (error) {
            console.error('Ошибка при выполнении SQL-запроса:', error.message);
            res.status(500).json({error: 'Ошибка на сервере'});
        }
    }

    async getTasksForExpertbyID(req, res){
        const testId = req.params.testID;

        try {
            // Fetch the main test information
            const testQuery = 'SELECT * FROM level_1_tests WHERE test_id = $1';
            const testResult = await db.query(testQuery, [testId]);

            if (testResult.rowCount === 0) {
                return res.status(404).json({ error: 'Task not found' });
            }

            const test = testResult.rows[0];

            // Fetch questions related to the test
            const questionsQuery = 'SELECT * FROM questions WHERE test_id = $1';
            const questionsResult = await db.query(questionsQuery, [testId]);

            const questionsWithOptions = await Promise.all(questionsResult.rows.map(async (question) => {
                // For each question, fetch the related answer options
                const optionsQuery = 'SELECT text, is_correct FROM options WHERE question_id = $1';
                const optionsResult = await db.query(optionsQuery, [question.question_id]);

                return {
                    question_text: question.text,
                    options: optionsResult.rows
                };
            }));

            // Format the final response
            const formattedResponse = {
                test_id: test.test_id,
                test_text: test.task_test,
                test_description: test.task_description,
                add_file: test.add_file,
                classes: test.classes,
                questions: questionsWithOptions
            };

            res.json(formattedResponse);

        } catch (error) {
            console.error('Error executing SQL query:', error.message);
            res.status(500).json({ error: 'Server error' });
        }
    }

    async updateTestByExpert(req, res){
    console.log(req.body);
    console.log(req.user_id);
    try {
        const { ver, ver_masseg, test_id } = req.body;
        const user_id = req.user_id; // предположим, что user_id вы устанавливаете через middleware аутентификации

        const client = await db.connect();

        const updateVer1 = `
      UPDATE level_1_tests
      SET ver_1 = $1, ver_1_masseg = $2, ver_1_id = $3
      WHERE test_id = $4 AND ver_1 IS NULL
      RETURNING test_id
    `;

        const result = await client.query(updateVer1, [ver, ver_masseg, user_id, test_id]);

        if (result.rowCount === 0) { // Если обновление для ver_1 не прошло
            const updateVer2 = `
        UPDATE level_1_tests
        SET ver_2 = $1, ver_2_masseg = $2, ver_2_id = $3
        WHERE test_id = $4 AND ver_2 IS NULL
      `;

            await client.query(updateVer2, [ver, ver_masseg, user_id, test_id]);
        }

        client.release();

        res.json({ success: true });
    } catch (error) {
        console.error('Ошибка при выполнении SQL-запроса:', error.message);
        res.status(500).json({ error: 'Ошибка на сервере' });
    }
}

    async uploads(req, res) {
        store.upload.array('files')(req, res, async (err) => { // Предположим, что вы загружаете несколько файлов под именем "files"
            if (err) {
                return res.status(500).send({message: 'Ошибка загрузки файла'});
            }

            if (!req.files || req.files.length === 0) {
                return res.status(400).send({message: 'Пожалуйста, загрузите файл'});
            }

            // Теперь у вас есть доступ к req.files, где содержится информация о загруженных файлах

            const fileDetails = req.files.map(file => ({
                name: file.originalname,
                path: file.path
            }));
            const test_id = '243fbc4a-2be8-46c4-994c-73ac30eb9b74';
            const filePaths = req.files.map(file => file.path);
            const filesString = filePaths.join(',');
            console.log("Путь к файлу:", fileDetails);

            // Обновите запись в базе данных с путями к файлам
            const updateQuery = 'UPDATE level_1_tests SET add_file = $1 WHERE test_id = $2';
            const updateValues = [filesString, test_id];
            try {
                await db.query(updateQuery, updateValues);
            } catch (updateErr) {
                console.error(updateErr);
                res.status(500).send('Ошибка при обновлении информации о файлах в базе данных.');
                return;
            }
            // Здесь вы можете сохранить fileDetails в вашу базу данных или выполнить любую другую обработку

            return res.send({message: 'Файлы успешно загружены', files: fileDetails});
        });
    }

    async addTestAndUpload(req, res) {
        try {
            // Parse data from the request


            const {task_test, task_description, classes,  options} = req.params;
            const questions = task_test
            const {files} = req.body;
            console.log(files)

            if (!options) {
                return res.status(400).json({error: 'Options are missing'});
            }
            const parsedOptions = JSON.parse(options);

            console.log(parsedOptions);
            const user_id = req.user_id;

            // Insert test data into the database
            const insertTestQuery = `
            INSERT INTO level_1_tests (user_id, task_test, task_description, add_file, classes)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING test_id;
        `;
            const testValues = [user_id, task_test, task_description, null, classes];
            const testResult = await db.query(insertTestQuery, testValues);
            const testId = testResult.rows[0].test_id;

            // Insert question
            const insertQuestionQuery = `
            INSERT INTO questions (text, test_id)
            VALUES ($1, $2)
            RETURNING question_id;
        `;
            const questionValues = [questions, testId];
            const questionResult = await db.query(insertQuestionQuery, questionValues);
            const questionId = questionResult.rows[0].question_id;

            // Insert options
            for (const option of parsedOptions) {
                const {option_text, is_correct} = option;
                const insertOptionQuery = `
                INSERT INTO options (text, is_correct, question_id)
                VALUES ($1, $2, $3);
            `;
                const optionValues = [option_text, is_correct, questionId];
                await db.query(insertOptionQuery, optionValues);
            }
            // console.log(req.files)

            if (!req.files || req.files.length === 0) {
                throw new Error('Пожалуйста, загрузите файл');
            }
            const filePaths = req.files.map(file => file.path);
            const filesString = filePaths.join(',');

            // Update the database record with file paths
            const updateQuery = 'UPDATE level_1_tests SET add_file = $1 WHERE test_id = $2';
            const updateValues = [filesString, testId];
            await db.query(updateQuery, updateValues);

            return res.send({message: 'Тест и файлы успешно добавлены'});
        } catch (error) {
            console.error(error.message);
            res.status(500).json({error: 'Ошибка на сервере'});
        }
    }

    //Эта функция будет возвращать список всех файлов, загруженных конкретным пользователем.
    async listUserFiles(req, res) {
        try {
            const userId = req.user_id;
            const math_path = join('./uploads', `${req.user_id}`);

            // Проверка существования каталога
            if (!fs.existsSync(math_path)) {
                return res.status(404).send({message: 'Каталог не найден'});
            }

            const files = fs.readdirSync(math_path);
            return res.send({ files });

        } catch (error) {
            console.error("Произошла ошибка при поиске файлов:", error);
            return res.status(500).send({message: 'Ошибка сервера'});
        }
    }

    //переделать логику удаления файла
    async deleteUserFiles(req, res) {
        try {
            const fileNames = req.params.file_names.split(','); // Преобразование строки в массив имен файлов

            const userDirectory = join('./uploads', `${req.user_id}`);

            // Проверка существования каталога
            if (!fs.existsSync(userDirectory)) {
                return res.status(404).send({message: 'Каталог не найден'});
            }

            const existingFiles = fs.readdirSync(userDirectory);

            fileNames.forEach(fileName => {
                // Проверка, существует ли файл в каталоге пользователя
                if (existingFiles.includes(fileName)) {
                    const filePath = join(userDirectory, fileName);
                    res.fs.unlinkSync(filePath); // Удаление файла
                }
            });

            return res.send({message: 'Файлы успешно удалены'});

        } catch (error) {
            console.error("Произошла ошибка при удалении файлов:", error);
            return res.status(500).send({message: 'Ошибка сервера'});
        }
    }

    download(req, res) {
        try {
            const fileNames = req.params.file_names.split(','); // Преобразование строки в массив имен файлов
            console.log(fileNames);

            const math_path = join('./uploads', `${req.user_id}`);

            // Проверка существования каталога
            if (!fs.existsSync(math_path)) {
                return res.status(404).send({message: 'Каталог не найден'});
            }

            const files = fs.readdirSync(math_path);
            const userFiles = files.filter((fileName) => {
                // Проверка, соответствует ли какое-либо из имен файлов
                return fileNames.some(name => fileName.includes(name));
            });

            if (userFiles.length === 0) {
                return res.status(404).send({message: 'Файлы не найдены'});
            }

            // Если найден только один файл, отправьте его напрямую
            if (userFiles.length === 1) {
                const absolutePath = resolve(math_path, userFiles[0]);
                return res.sendFile(absolutePath);
            } else {
                // Если найдено несколько файлов, вы можете упаковать их в архив и отправить архив
                // или предоставить ссылки для загрузки каждого файла отдельно.
                // Здесь я просто отправлю имена файлов в качестве примера.
                // Создаем архив и отправляем его пользователю
                const archive = archiver('zip');
                res.attachment('files.zip'); // это задает имя файла для скачивания

                userFiles.forEach(file => {
                    archive.file(join(math_path, file), { name: file });
                });

                archive.finalize();
                archive.pipe(res);
            }

        } catch (error) {
            console.error(error);
            return res.status(500).send({message: 'Ошибка сервера'});
        }
    }

}

module.exports = new User_controller()










