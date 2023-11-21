const { validationResult } = require('express-validator')
const {addUser} = require('./user_controller')

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {json} = require("express");
const db = require('../db')
const {secret} = require('../config')
const session = require('express-session');
const {v4: uuidv4} = require("uuid");

class Commands_controller{

    async CreateComandos(req, res) {
        try {
            const { comandName, password, userLogins } = req.body;

            // Вставка команды
            const insertComandoText = 'INSERT INTO comandos (comand_name, password) VALUES ($1, $2) RETURNING comand_id;';
            const comandoResult = await db.query(insertComandoText, [comandName, password]);
            const comandId = comandoResult.rows[0].comand_id;

            for (const email of userLogins) {
                let userId;

                // Проверяем наличие email в таблице users
                const res = await db.query('SELECT user_id FROM users WHERE email = $1', [email]);
                if (res.rows.length > 0) {
                    // Email найден, используем существующий user_id
                    userId = res.rows[0].user_id;
                } else {
                    // Email не найден, генерируем новый UUID
                    userId = uuidv4(); // Функция для генерации UUID
                }

                // Вставляем данные в user_command
                const insertUserCommandText = 'INSERT INTO user_command (comand_id, user_id, email) VALUES ($1, $2, $3)';
                await db.query(insertUserCommandText, [comandId, userId, email]);
            }

            res.status(201).json({ comandId: comandId });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }

}



module.exports = new Commands_controller()