const { validationResult, check} = require('express-validator')
const {addUser} = require('./user_controller')

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {json} = require("express");
const {poolComandos} = require('../db')
const {secret} = require('../config')
const session = require('express-session');
const {v4: uuidv4} = require("uuid");
const validator = require('validator');

const generateAccesToken = (comand_id) =>{
    const payload = {
        comand_id
    }
    return jwt.sign(payload, secret,  { expiresIn: '24H' })
}



class Commands_controller{
    async getinfo(req,res){
        res.status(200).json({ error: '' });
    }
    async CreateComandos(req, res) {
        try {
            const { comandName, password, school } = req.body;
            const registrationDeadline = new Date('2023-12-22T00:00:00'); // Установите срок регистрации
            const currentTime = new Date();
            if (currentTime > registrationDeadline) {
                return res.status(400).json({ message: 'Регистрация команд закрыта' });
            }

            const queryResult = await poolComandos.query('SELECT * FROM comandos WHERE comand_name = $1', [comandName]);

            // Если результат запроса не пустой, отправляем сообщение о наличии команды
            if (queryResult.rows.length > 0) {
                return res.status(400).json({ message: 'Команда с таким названием уже существует' });
            }

            // Хэшируем пароль перед сохранением в базу данных
            const saltRounds = 10; // Уровень соли
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Вставка команды
            const insertComandoText = 'INSERT INTO comandos (comand_name, password,school) VALUES ($1, $2, $3) RETURNING comand_id;';
            const comandoResult = await poolComandos.query(insertComandoText, [comandName, hashedPassword,school]);

            const comandId = comandoResult.rows[0].comand_id;


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
        const loginComandoResult = await poolComandos.query(loginComandoText, [comandName]);

        if (loginComandoResult.rowCount > 0) {
            // Команда найдена, возвращаем её идентификатор
            const passwordMatch = await bcrypt.compare(password, loginComandoResult.rows[0].password);

            if (passwordMatch) {
                const token = generateAccesToken(loginComandoResult.rows[0].comand_id);

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
        const command_id = req.user_id;

        try {
            // Получение списка user_id из user_command
            const userCommandsResult = await poolComandos.query("SELECT user_id, first_name,last_name FROM user_command WHERE comand_id = $1", [command_id]);
            const comandNameResult = await poolComandos.query("SELECT comand_name FROM comandos WHERE comand_id = $1", [command_id]);

            const comandName = comandNameResult.rows[0]

            const userCommands = userCommandsResult.rows;
            console.log(comandName);
            let users = []; // Renamed to 'users' for clarity
            for (const userCommand of userCommands) {
                // Получение информации о пользователе из таблицы user
                const userResult = await poolComandos.query("SELECT first_name, last_name, patronymic FROM users WHERE user_id = $1", [userCommand.user_id]);

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
                        first_name: 'NULL',
                        last_name: 'NULL',
                        patronymic: 'NULL'
                    });
                }
            }

            res.status(200).json({ comandName : comandName.comand_name,users: users });
        } catch (error) {
            console.error("Error in InfoComandos:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
    async createUsers(req, res) {
        try {
            const { users } = req.body;
            const commandId = req.user.command_id
            if (!Array.isArray(users) || users.length !== 6) {
                return res.status(400).json({ message: 'Неверный формат данных. Ожидалось 6 пользователей.' });
            }

            const insertQuery = 'INSERT INTO user_command (comand_id, first_name, last_name) VALUES ($3, $1, $2) RETURNING *';
            const createdUsers = [];

            for (const user of users) {
                const { first_name, last_name } = user;
                const result = await poolComandos.query(insertQuery, [first_name, last_name, commandId]);
                createdUsers.push(result.rows[0]);
            }

            res.status(201).json(createdUsers);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Ошибка на сервере' });
        }
    }
}



module.exports = new Commands_controller()