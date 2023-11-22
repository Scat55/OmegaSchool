const { validationResult, check} = require('express-validator')
const {addUser} = require('./user_controller')

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {json} = require("express");
const db = require('../db')
const {secret} = require('../config')
const session = require('express-session');
const {v4: uuidv4} = require("uuid");
const validator = require('validator');

const generateAccesToken = (user_id, type_user, email) =>{
    const payload = {
        user_id,
        type_user,
        email
    }
    return jwt.sign(payload, secret,  { expiresIn: '24H' })
}



class Commands_controller{

    async CreateComandos(req, res) {
        try {
            const { comandName, password, userLogins } = req.body;

            const queryResult = await db.query('SELECT * FROM comandos WHERE comand_name = $1', [comandName]);
            for (const email of userLogins) {

                if (!validator.isEmail(email)) {
                    return res.status(400).json({message: 'Некорректный формат электронной почты', email});
                }
            }

            // Если результат запроса не пустой, отправляем сообщение о наличии команды
            if (queryResult.rows.length > 0) {
                return res.status(400).json({ message: 'Команда с таким названием уже существует' });
            }

            // Хэшируем пароль перед сохранением в базу данных
            const saltRounds = 10; // Уровень соли
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Вставка команды
            const insertComandoText = 'INSERT INTO comandos (comand_name, password) VALUES ($1, $2) RETURNING comand_id;';
            const comandoResult = await db.query(insertComandoText, [comandName, hashedPassword]);

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
            res.status(500).json({ error: 'Ошибка на сервере' });
        }
    }

    async LoginComandos(req,res){
        const { comandName, password } = req.body;

        // Проверка наличия команды по email и паролю
        const loginComandoText = 'SELECT * FROM comandos WHERE comand_name = $1';
        const loginComandoResult = await db.query(loginComandoText, [comandName]);

        if (loginComandoResult.rowCount > 0) {
            // Команда найдена, возвращаем её идентификатор
            const passwordMatch = await bcrypt.compare(password, loginComandoResult.rows[0].password);

            if (passwordMatch) {
                const token = generateAccesToken(loginComandoResult.rows[0].comand_id, "Команда", loginComandoResult.rows[0].email);

                req.session.token = token;
                req.session.save(() => {
                    res.json({ message: 'Успешная аутентификация', token });
                });
            } else {
                // Если пароль неверен, отправляем сообщение о неправильном пароле
                res.status(401).json({ message: 'Неправильный пароль' });
            }
        } else {
            // Команда не найдена
            res.status(401).json({ error: 'Неверный email или пароль' });
        }
    }

    async InfoComandos(req, res){
        const command_id = req.user_id; // или как вы получаете command_id

        try {
            // Получение списка user_id из user_command
            const userCommandsResult = await db.query("SELECT user_id, email FROM user_command WHERE comand_id = $1", [command_id]);

            const userCommands = userCommandsResult.rows;
            console.log(userCommands);

            let users = []; // Renamed to 'users' for clarity
            for (const userCommand of userCommands) {
                // Получение информации о пользователе из таблицы user
                const userResult = await db.query("SELECT first_name, last_name, patronymic FROM users WHERE user_id = $1", [userCommand.user_id]);

                const userData = userResult.rows[0]; // Renamed to 'userData' for clarity
                console.log('пользователь', userCommand);

                if (userData) { // Checking if userData is not empty
                    // Сборка данных пользователя
                    users.push({
                        user_id: userCommand.user_id,
                        email: userCommand.email,
                        first_name: userData.first_name,
                        last_name: userData.last_name,
                        patronymic: userData.patronymic
                    });
                }else {
                    users.push({
                        user_id: userCommand.user_id,
                        email: userCommand.email,
                        first_name: 'Логинся ПИДоР',
                        last_name: 'Логинся ПИДоР',
                        patronymic: 'Логинся ПИДоР'
                    });
                }
            }

            res.status(200).json({ users: users });
        } catch (error) {
            console.error("Error in InfoComandos:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
}



module.exports = new Commands_controller()