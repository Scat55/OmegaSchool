const { validationResult } = require('express-validator')
const {addUser} = require('./user_controller')

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {json} = require("express");
const db = require('../db')


class Auth_controller {

    async registration(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { email, password, gender, type_user } = req.body;

            const hashPassword = bcrypt.hashSync(password, 7);

            const user = addUser(email, password, gender, type_user);

            res.status(201).json(password);
        } catch (e) {
            res.status(400).json({ message: 'Ошибка регистрации' });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;

            // SQL-запрос для проверки наличия пользователя
            const query = 'SELECT * FROM users WHERE email = $1 AND password = $2';
            const values = [email, password];

            // Выполняем асинхронный SQL-запрос
            const user = await db.query(query, values);

            if (user) {
                console.log('Пользователь ${email} найден в базе данных');
                const token = jwt.sign({ email }, 'secret_key', { expiresIn: '24h' });

                // Обновляем поле token в таблице users
                const updateTokenQuery = 'UPDATE users SET token = $1 WHERE email = $2';
                const updateTokenValues = [token, email];
                await db.query(updateTokenQuery, updateTokenValues);
                console.log(updateTokenValues)
                res.status(200).json({ token });
            } else {
                console.log('Пользователь ${email} не найден в базе данных');
                res.status(400).json({ message: 'Пользователь не найден' });
            }
        } catch (error) {
            console.error('Ошибка при выполнении SQL-запроса:', error);
            res.status(500).json({ error: 'Ошибка на сервере' });
        }
    }



}
module.exports = new Auth_controller()