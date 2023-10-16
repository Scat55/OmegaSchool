const db = require('../db')
const {validationResult} = require("express-validator");
const {json} = require("express");
const fs = require('fs');
const path = require('path');
const jwt = require("jsonwebtoken");
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
}

module.exports = new User_controller()