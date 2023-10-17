const { validationResult } = require('express-validator')
const {addUser} = require('./user_controller')

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {json} = require("express");
const db = require('../db')
const {secret} = require('../config')
const session = require('express-session');

const generateAccesToken = (user_id, type_user, email) =>{
    const payload = {
        user_id,
        type_user,
        email
    }
    return jwt.sign(payload, secret,  { expiresIn: '24H' })
}

class Auth_controller {
    async registration(req, res) {
        try {
            // Извлекаем данные из тела запроса
            const {email, password, gender, type_user} = req.body;

            // Выполняем SQL-запрос, чтобы найти пользователя по email
            const queryResult = await db.query('SELECT * FROM users WHERE email = $1', [email]);

            // Если результат запроса не пустой, отправляем сообщение о наличии пользователя
            if (queryResult.rows.length > 0) {
                res.json({message: 'Пользователь с таким email уже существует'});
            } else {
                // Хешируем пароль перед сохранением в базу данных
                const saltRounds = 10; // Уровень соли
                const hashedPassword = await bcrypt.hash(password, saltRounds);
                // Добавляем пользователя в базу данных с хешированным паролем
                const insertQuery = `
                INSERT INTO users (email, password, gender, type_user)
                VALUES ($1, $2, $3, $4)
                RETURNING user_id;`;

                const insertResult = await db.query(insertQuery, [email, hashedPassword, gender, type_user]);

                if (insertResult.rows.length > 0) {
                    res.json({message: 'Пользователь успешно добавлен', user_id: insertResult.rows[0].user_id});
                } else {
                    res.status(500).json({message: 'Ошибка при добавлении пользователя'});
                }
            }
        } catch (error) {
            // Обрабатываем ошибки, логируем их для отладки и отправляем ответ с ошибкой
            console.error(error);
            res.status(500).json({message: 'Внутренняя ошибка сервера'});
        }

    }
    async login(req, res) {
        try {
            // Извлекаем данные из тела запроса
            const { email, password } = req.body;

            // Выполняем SQL-запрос, чтобы найти пользователя по email
            const queryResult = await db.query('SELECT * FROM users WHERE email = $1', [email]);

            // Если результат запроса пустой, отправляем сообщение о неправильной электронной почте
            if (queryResult.rows.length === 0) {
                res.status(401).json({ message: 'Неправильная электронная почта' });
            } else {
                // Получаем данные пользователя
                const user = queryResult.rows[0];

                // Проверяем совпадение пароля с хешированным паролем
                const passwordMatch = await bcrypt.compare(password, user.password);

                if (passwordMatch) {
                    // Генерируем JWT токен
                    const token = generateAccesToken(user.user_id,user.type_user,user.email);

                    req.session.token = token;
                    console.log(req.session)
                    req.session.save(() => {
                        res.json({ message: 'Успешная аутентификация', token });
                    });
                    // Отправляем JWT токен в ответе

                } else {
                    // Если пароль неверен, отправляем сообщение о неправильном пароле
                    res.status(401).json({ message: 'Неправильный пароль' });
                }
            }
        } catch (error) {
            // Обрабатываем ошибки, логируем их для отладки и отправляем ответ с ошибкой
            console.error(error);
            res.status(500).json({ message: 'Внутренняя ошибка сервера' });
        }
    }

}

module.exports = new Auth_controller()