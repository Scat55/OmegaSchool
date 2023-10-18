const db = require('../db')
const {validationResult} = require("express-validator");
const {json} = require("express");
const jwt = require("jsonwebtoken");
const fs = require('fs');
const path = require('path');
const multer = require('multer');


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
            const { first_name, last_name, patronymic, birthdate, classes } = req.body;

            // Создаем SQL-запрос для обновления данных пользователя в таблице users
            const sql = `UPDATE users 
                   SET first_name = $1, last_name = $2, patronymic = $3, birthdate = $4, classes = $5
                   WHERE user_id = $6`;

            // Используем асинхронный метод для выполнения SQL-запроса
            await db.query(sql, [first_name, last_name, patronymic, birthdate, classes, user_id]);

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

    async postFile(req, res) {
        const { user_id } = req.user;

        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'uploads/');
            },
            filename: (req, file, cb) => {
                const userId = user_id;
                // const fileType = file.mimetype.split('/')[1];
                const date = new Date();
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear();

                const fileName = `${day}_${month}_${year}_${userId}_${file.originalname}`;
                cb(null, fileName);
            },
        });

        const upload = multer({ storage }).single('file');

        upload(req, res, (err) => {
            if (err) {
                // Если произошла ошибка при загрузке файла, вернуть соответствующий ответ
                res.status(500).send('Ошибка при загрузке файла.');
            } else {
                // Если файл успешно загружен, вернуть успешный ответ
                res.send('Файл успешно загружен.');
            }
        });
    }

    async getFile(req, res) {

    }
}


module.exports = new User_controller()