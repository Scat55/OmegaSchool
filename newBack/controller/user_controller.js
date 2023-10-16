const db = require('../db')
const {validationResult} = require("express-validator");
const {json} = require("express");
const fs = require('fs');
const path = require('path');
const jwt = require("jsonwebtoken");
class User_controller {
    async addUser(email, hashPassword, gender, type_user) {
        try {
            const insertUserQuery = 'INSERT INTO users (email, password, gender, type_user) VALUES ($1, $2, $3, $4)';
            const insertUserValues = [email, hashPassword, gender, type_user];

            await db.query(insertUserQuery, insertUserValues);

            console.log(`Пользователь ${email} успешно добавлен`);
            return email;
        } catch (error) {
            console.error('Ошибка при выполнении SQL-запроса:', error);
            return { error: 'Ошибка на сервере' }; // Заменил `json` на объект
        }
    }

    async getUserList(req, res){
        try {
            const query = 'SELECT * FROM users';

            // Выполняем асинхронный SQL-запрос для получения пользователей
            const users = await db.query(query);

            // Отправляем список пользователей в ответе
            res.json(users.rows);
        } catch (error) {
            console.error('Ошибка при выполнении SQL-запроса:', error);
            res.status(500).json({ error: 'Ошибка на сервере' });
        }
    }//готова без шифрования

    async getUserIDForEmail(req, res){
        const { email } = req.body;

        // SQL-запрос для получения user_id по адресу электронной почты
        const sql = 'SELECT user_id FROM users WHERE email = ?';
        db.query(sql, [email], (err, row) => {
            if (err) {
                console.error('Ошибка при выполнении SQL-запроса:', err.message);
                res.status(500).json({ error: 'Ошибка на сервере' });
                return;
            }

            if (row && row.user_id) {
                console.log(`User ID для пользователя с email ${email} найден: ${row.user_id}`);
                res.json({ user_id: row.user_id }); // Отправить user_id в формате JSON
            } else {
                console.log(`User ID для пользователя с email ${email} не найден`);
                res.status(404).json({ message: 'User ID не найден' });
            }
        });


    }

    async getUserDataForEmail(req, res) {
        const { email } = req.body;

        // SQL-запрос для получения данных пользователя по email
        const userSql = 'SELECT * FROM users WHERE email = ?';
        const achievementsSql = 'SELECT * FROM achievements WHERE user_id = (SELECT user_id FROM users WHERE email = ?)';
        const gradesSql = 'SELECT * FROM student_grades WHERE user_id = (SELECT user_id FROM users WHERE email = ?)';

        db.query(userSql, [email], (err, userRow) => {
            if (err) {
                console.error('Ошибка при выполнении SQL-запроса для пользователя:', err.message);
                res.status(500).json({error: 'Ошибка на сервере'});
                return;
            }

            if (!userRow) {
                console.log(`Пользователь с email ${email} не найден`);
                res.status(404).json({message: 'Пользователь не найден'});
                return;
            }

            // Выполните запрос для получения данных об достижениях
            db.query(achievementsSql, [email], (achievementsErr, achievementsRow) => {
                if (achievementsErr) {
                    console.error('Ошибка при выполнении SQL-запроса для достижений:', achievementsErr.message);
                    res.status(500).json({error: 'Ошибка на сервере'});
                    return;
                }

                // Выполните запрос для получения данных оценок пользователя (используя db.all)
                db.query(gradesSql, [email], (gradesErr, gradesRows) => {
                    if (gradesErr) {
                        console.error('Ошибка при выполнении SQL-запроса для оценок:', gradesErr.message);
                        res.status(500).json({error: 'Ошибка на сервере'});
                        return;
                    }

                    // Соедините результаты обоих запросов в один объект
                    const userData = {
                        user: userRow,
                        grades: gradesRows,
                        achievements: achievementsRow,
                    };

                    console.log(`Данные для пользователя с email ${email} найдены`);
                    res.json(userData);
                });
            });
        });
    }

    async getUserInformation(req, res){
        const userSql = 'SELECT * FROM users WHERE user_id = ?';
        const gradesSql = 'SELECT * FROM student_grades WHERE user_id = ?';
        const achievementsSql = 'SELECT * FROM achievements WHERE user_id = ?';

        db.query(userSql, [user_id], (err, userRow) => {
            if (err) {
                console.error('Ошибка при выполнении SQL-запроса для пользователя:', err.message);
                res.status(500).json({ error: 'Ошибка на сервере' });
                return;
            }

            if (!userRow) {
                console.log(`Пользователь с ID ${user_id} не найден`);
                res.status(404).json({ message: 'Пользователь не найден' });
                return;
            }

            // Выполните запрос для получения данных об достижениях
            db.query(achievementsSql, [user_id], (achievementsErr, achievementsRow) => {
                if (achievementsErr) {
                    console.error('Ошибка при выполнении SQL-запроса для достижений:', achievementsErr.message);
                    res.status(500).json({ error: 'Ошибка на сервере' });
                    return;
                }

                // Выполните запрос для получения данных оценок пользователя (используя db.all)
                db.query(gradesSql, [user_id], (gradesErr, gradesRows) => {
                    if (gradesErr) {
                        console.error('Ошибка при выполнении SQL-запроса для оценок:', gradesErr.message);
                        res.status(500).json({ error: 'Ошибка на сервере' });
                        return;
                    }

                    // Соедините результаты обоих запросов в один объект
                    const userData = {
                        user: userRow,
                        grades: gradesRows,
                        achievements: achievementsRow,
                    };

                    console.log(`Данные для пользователя с ID ${user_id} найдены`);
                    res.json(userData);
                });
            });
        });
    }

    async checkUser(email, password) {
        try {

            // SQL-запрос для проверки наличия пользователя
            const query = 'SELECT * FROM users WHERE email = $1 AND password = $2';
            const values = [email, password];

            // Выполняем асинхронный SQL-запрос
            const row = await db.query(query, values);

            if (row) {
                console.log(`Пользователь ${email} найден в базе данных`);
                // console.log(token)
                return jwt.sign({email}, 'qhksoidbjdsknjdskmdkjcndjdsfldsnxgttwpzmzfwodn1n3udn734h5dsh82hd7h', {expiresIn: '24h'});
            } else {
                console.log(`Пользователь ${email} не найден в базе данных`);
                return json({ message: 'Пользователь не найден' });
            }
        } catch (error) {
            console.error('Ошибка при выполнении SQL-запроса:', error);
            return json({ error: 'Ошибка на сервере' });
        }
    }

    // async checkUser(req, res) {
    //     try {
    //         console.log('Запрос получен');
    //
    //         // Получение логина и пароля из JSON-тела запроса
    //         const { email, password } = req.body;
    //         console.log(req.body);
    //
    //         // SQL-запрос для проверки наличия пользователя
    //         const query = 'SELECT * FROM users WHERE email = $1 AND password = $2';
    //         const values = [email, password];
    //
    //         // Выполняем асинхронный SQL-запрос
    //         const row = await db.query(query, values);
    //
    //         if (row) {
    //             console.log(`Пользователь ${email} найден в базе данных`);
    //             res.json({ message: 'Пользователь найден' });
    //         } else {
    //             console.log(`Пользователь ${email} не найден в базе данных`);
    //             res.json({ message: 'Пользователь не найден' });
    //         }
    //     } catch (error) {
    //         console.error('Ошибка при выполнении SQL-запроса:', error);
    //         res.status(500).json({ error: 'Ошибка на сервере' });
    //     }
    // }

    async additionalData(req, res){
        const { user_id, first_name, last_name, patronymic, birthdate, classes } = req.body;
        console.log(req.body);
        // Вставка данных в таблицу users
        const sql = `UPDATE users 
               SET first_name = ?, last_name = ?, patronymic = ?, birthdate = ? ,classes = ?
               WHERE user_id = ?; s`;

        db.query(sql, [first_name, last_name, patronymic, birthdate, classes, user_id], function (err) {
            if (err) {
                console.error('Ошибка при вставке данных:', err.message);
                res.status(500).json({ message: 'Произошла ошибка при вставке данных' });
            } else {
                console.log('Дополнительные данные успешно вставлены');
                res.status(200).json({ message: 'Дополнительные данные успешно добавлены' });
            }
        });
    }

    async uploadFile(req, res) {
        res.send('Файл успешно загружен.');
    }

    async downloadFile(req, res) {
        // Получаем имя файла из параметра URL
        const requestedFilename = req.params.filename;

        const fileDirectory = 'uploads/';

        // Проверяем, есть ли файл с полным или частичным именем
        fs.readdir(fileDirectory, (err, files) => {
            if (err) {
                return res.status(500).send('Ошибка сервера');
            }

            // Ищем файл с частичным совпадением имени
            const foundFile = files.find((file) => file.includes(requestedFilename));

            if (foundFile) {
                // Формируем полный путь к найденному файлу
                const filePath = path.join(fileDirectory, foundFile);

                // Проверяем расширение файла
                const fileExtension = path.extname(filePath).toLowerCase();

                if (fileExtension === '.txt') {
                    // Если расширение .txt, отправляем его содержимое как текст
                    fs.readFile(filePath, 'utf8', (err, data) => {
                        if (err) {
                            res.status(500).send('Ошибка при чтении файла');
                        } else {
                            res.header('Content-Type', 'text/plain');
                            res.send(data);
                        }
                    });
                } else {
                    // Иначе отправляем файл для скачивания
                    res.download(filePath, (err) => {
                        if (err) {
                            // Если произошла ошибка при отправке файла, обрабатываем её
                            res.status(404).send('Файл не найден');
                        }
                    });
                }
            } else {
                res.status(404).send('Файл не найден');
            }
        });
    }

    async updateUser(req, res){
        // const {} = req.body
        // const  user = await db.query('UPDATE users')
        // res.json(user.rows[0])
    }
    async deleteUser(req, res){
        // const {} = req.body
        // const  user = await db.query('DELETE users')
        // res.json(user.rows[0])
    }
}

module.exports = new User_controller()