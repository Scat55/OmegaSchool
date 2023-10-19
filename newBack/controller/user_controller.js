const db = require('../db')
const {validationResult} = require("express-validator");
const {json} = require("express");
const jwt = require("jsonwebtoken");
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const {randomUUID} = require("crypto");


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

    async additionalData(req,res){
        try {
            const user_id = req.user_id
            // Извлекаем данные из тела запроса
            const { first_name, last_name, patronymic, birthdate, classes,item } = req.body;
            console.log(user_id, first_name, last_name, patronymic, birthdate, classes, item)
            // Создаем SQL-запрос для обновления данных пользователя в таблице users
            const sql = `UPDATE users 
                   SET first_name = $1, last_name = $2, patronymic = $3, birthdate = $4, classes = $5, item = $6
                   WHERE user_id = $7`;

            // Используем асинхронный метод для выполнения SQL-запроса
            await db.query(sql, [first_name, last_name, patronymic, birthdate, classes, item, user_id]);

            console.log('Дополнительные данные успешно обновлены');
            res.status(200).json({ message: 'Дополнительные данные успешно обновлены' });
        } catch (error) {
            console.error('Ошибка при обновлении данных:', error);
            res.status(500).json({ message: 'Произошла ошибка при обновлении данных' });
        }
    }

    async getUserInformation(req, res) {

        const user_id = req.params.user_id;
        try {
            // Асинхронные SQL-запросы для получения данных пользователя, оценок и достижений
            const [userResult, gradesResult, achievementsResult] = await Promise.all([
                db.query('SELECT * FROM users WHERE user_id = $1', [user_id]),
                //db.query('SELECT * FROM student_grades WHERE user_id = $1', [user_id]),
                //db.query('SELECT * FROM achievements WHERE user_id = $1', [user_id]),
            ]);

            // Извлекаем результаты из объектов результата
            const user = userResult.rows[0];
           // const grades = gradesResult.rows;
           // const achievements = achievementsResult.rows;

            if (!user) {
                console.log(`Пользователь с ID ${user_id} не найден`);
                return res.status(404).json({ message: 'Пользователь не найден' });
            }

            // Соберите результаты в один объект
            const userData = {
                user//,
               // grades,
               // achievements,
            };

            console.log(`Данные для пользователя с ID ${user_id} найдены`);
            res.json(userData);
        } catch (error) {
            console.error('Ошибка при выполнении SQL-запросов:', error.message);
            res.status(500).json({ error: 'Ошибка на сервере' });
        }
    }

    async getUserIDForEmail(req, res) {
        // Извлекаем адрес электронной почты из параметров запроса
        const email = req.params.email;

        // SQL-запрос для получения user_id по адресу электронной почты
        const sql = 'SELECT user_id FROM users WHERE email = $1';

        try {
            // Выполняем SQL-запрос и ожидаем результат с использованием async/await
            const { rows } = await db.query(sql, [email]);

            if (rows.length > 0) {
                // Если есть результаты запроса, извлекаем user_id
                const user_id = rows[0].user_id;
                console.log(`User ID для пользователя с email ${email} найден: ${user_id}`);
                // Отправляем user_id в формате JSON
                res.json({ user_id });
            } else {
                // Если результаты запроса пусты, отправляем сообщение об ошибке
                console.log(`User ID для пользователя с email ${email} не найден`);
                res.status(404).json({ message: 'User ID не найден' });
            }
        } catch (error) {
            // Обрабатываем ошибку выполнения SQL-запроса
            console.error('Ошибка при выполнении SQL-запроса:', error.message);
            res.status(500).json({ error: 'Ошибка на сервере' });
        }
    }

    async getUserDataForEmail(req, res) {
        const email = req.params.email; // Получите email из параметров запроса.

        try {


            const [userResult,achievementsResult , gradesResult] = await Promise.all([
                db.query('SELECT * FROM users WHERE email = $1', [email]),
                //db.query('SELECT * FROM achievements WHERE user_id = (SELECT user_id FROM users WHERE email = $1)', [email]),
                //db.query('SELECT * FROM student_grades WHERE user_id = (SELECT user_id FROM users WHERE email = $1)', [email]),
            ]);

            // Извлекаем результаты из объектов результата
            const user = userResult.rows[0];
           // const grades = gradesResult.rows;
           // const achievements = achievementsResult.rows;


            // Соберите результаты в один объект
            const userData = {
                user//,
               // achievements,
               // grades,
            };

            console.log(`Данные для пользователя с Email ${email} найдены`);
            res.json(userData);
        } catch (error) {
            console.error('Ошибка при выполнении SQL-запросов:', error.message);
            res.status(500).json({ error: 'Ошибка на сервере' });
        }
    }




    async add_level_1_test(req,res){

        // Разбираем JSON-объект из запроса
        const { task_test, task_description, add_file, classes, questions } = req.body;
        const user_id = req.user_id
        // Вставляем данные теста в базу данных
        const insertTestQuery = `
    INSERT INTO level_1_tests (user_id, task_test, task_description, add_file, classes)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING test_id;
  `;
        const testValues = [user_id, task_test, task_description, add_file, classes];

        // Отправляем запрос и получаем ID вставленного теста
        db.query(insertTestQuery, testValues)
            .then((testResult) => {
                const testId = testResult.rows[0].test_id;

                // Вставляем вопросы и варианты ответов
                questions.forEach((question) => {
                    const { question_text, options } = question;

                    // Вставляем данные вопроса
                    const insertQuestionQuery = `
          INSERT INTO questions (text, test_id)
          VALUES ($1, $2)
          RETURNING question_id;
        `;
                    const questionValues = [question_text, testId];

                    // Отправляем запрос и получаем ID вставленного вопроса
                    db.query(insertQuestionQuery, questionValues)
                        .then((questionResult) => {
                            const questionId = questionResult.rows[0].question_id;

                            // Вставляем варианты ответов
                            options.forEach((option) => {
                                const { option_text, is_correct } = option;

                                // Вставляем данные варианта ответа
                                const insertOptionQuery = `
                INSERT INTO options (text, is_correct, question_id)
                VALUES ($1, $2, $3);
              `;
                                const optionValues = [option_text, is_correct, questionId];

                                // Отправляем запрос для вставки варианта ответа
                                db.query(insertOptionQuery, optionValues);
                            });
                        })
                        .catch((error) => {
                            console.error('Ошибка при вставке вопроса:', error.message);
                        });
                });

                // Отправляем ответ об успешном добавлении теста
                res.json({ message: 'Тест успешно добавлен' });
            })
            .catch((error) => {
                console.error('Ошибка при вставке теста:', error.message);
                res.status(500).json({ error: 'Ошибка на сервере' });
            });
    };

    async getTasksForExpert(req, res) {
        try {
            // Получение user_id из JWT токена
            const user_id = req.user_id

            // Выполнение SQL-запроса
            const sql = `
            SELECT *
            FROM level_1_tests
            WHERE ((ver_1_id IS NULL OR NOT(ver_2_id = $1)) AND
                (NOT(ver_1_id = $1) OR ver_2_id IS NULL) AND
                (ver_1_id IS NULL OR ver_2_id IS NULL))
            

    `;
            //UNION ALLs
            //SELECT *
            //FROM level_2_tests
            //WHERE ((ver_1_id IS NULL OR NOT(ver_2_id = $1)) AND
            //       (NOT(ver_1_id = $1) OR ver_2_id IS NULL) AND
            //       (ver_1_id IS NULL OR ver_2_id IS NULL))
            //UNION ALL
            //SELECT *
            //FROM level_3_tests
            //WHERE ((ver_1_id IS NULL OR NOT(ver_2_id = $1)) AND
            //       (NOT(ver_1_id = $1) OR ver_2_id IS NULL) AND
            //       (ver_1_id IS NULL OR ver_2_id IS NULL));
            const result = await db.query(sql, [user_id]);

            // Отправка результата клиенту
            res.json(result.rows);
        } catch (error) {
            console.error('Ошибка при выполнении SQL-запроса:', error.message);
            res.status(500).json({ error: 'Ошибка на сервере' });
        }
    }





    // async postFile(req, res) {
    //
    //     const {user_id} = req.user
    //
    //     const storage = multer.diskStorage({
    //         destination: (req, file, cb) => {
    //             cb(null, 'uploads/');
    //         },
    //         filename: (req, file, cb) => {
    //             const userId = user_id;
    //             const date = new Date();
    //             const day = String(date.getDate()).padStart(2, '0');
    //             const month = String(date.getMonth() + 1).padStart(2, '0');
    //             const year = date.getFullYear();
    //
    //             const fileName = `${day}_${month}_${year}_${user_id}_${file.originalname}`;
    //             cb(null, fileName);
    //         },
    //     });
    //
    //     const upload = multer({ storage }).single('file');
    //
    //     upload(req, res, (err) => {
    //         if (err) {
    //             // Если произошла ошибка при загрузке файла, вернуть соответствующий ответ
    //             res.status(500).send('Ошибка при загрузке файла.');
    //         } else {
    //             // Если файл успешно загружен, вернуть успешный ответ
    //             res.send('Файл успешно загружен.');
    //         }
    //     });
    // }


    async postFile(req, res) {
        const {user_id} = req.user;

        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'uploads/');
            },
            filename: (req, file, cb) => {
                const date = new Date();
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear();

                const fileName = `${day}_${month}_${year}_${user_id}_${file.originalname}`;
                cb(null, fileName);
            },
        });

        const upload = multer({storage}).single('file');

        upload(req, res, async (err) => {
            if (err) {
                // Если произошла ошибка при загрузке файла, вернуть соответствующий ответ
                res.status(500).send('Ошибка при загрузке файла.');
            } else {
                // Если файл успешно загружен, обновляем запись в базе данных
                const filePath = 'uploads/' + req.file.filename;

                // З
                const query = 'UPDATE level_1_tests SET add_file = $1 WHERE user_id = $2';
                const values = [filePath, user_id];
                try {
                    await db.query(query, values);
                    res.send('Файл успешно загружен и информация обновлена в базе данных.');
                } catch (dbErr) {
                    console.error(dbErr);
                    res.status(500).send('Ошибка при обновлении информации о файле в базе данных.');
                }
            }
        })
    }










    async postFilesWithType(req, res) {
        const { type_of_unit } = req.body;

        try {
            const files = fs.readdirSync('./uploads');

            const userFiles = files.filter((fileName) => {
                const userIdFromFileName = fileName.split('_')[3]; // Предполагается, что user_id в имени файла находится на четвертом месте, разделенное "_".
                return userIdFromFileName === req.user.user_id;
            });

            const updatePromises = [];

            if (type_of_unit === "level_1_tests" || type_of_unit === "level_2_tests" || type_of_unit === "level_3_tests") {
                // Собираем имена файлов в одну строку с разделителями (запятые)
                const filesString = userFiles.map(fileName => `uploads/${fileName}`).join(',');

                // Создаем один общий запрос для обновления базы данных
                const query = `UPDATE ${type_of_unit} SET add_file = $1, user_id = $2, test_id = $3`;
                const values = [filesString, req.user.user_id, randomUUID()];

                // Добавляем обновление в список промисов
                updatePromises.push(
                    db.query(query, values)
                );
            } else {
                res.status(400).json('Неизвестный тип задания.');
                return;
            }

            await Promise.all(updatePromises);
            res.json(`/uploads/${userFiles}`);
        } catch (error) {
            console.error('Ошибка при чтении директории:', error);
            res.status(500).send('Ошибка сервера.');
        }
    }

}


module.exports = new User_controller()










