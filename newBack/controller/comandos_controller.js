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
            const registrationDeadline = new Date('2023-12-27T14:00:00'); // Установите срок регистрации
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

            // Создание 6 пользователей
            const insertUserText = 'INSERT INTO user_command (first_name, last_name, patronymic, comand_id) VALUES ($1, $2, $3, $4) RETURNING *';
            const createdUsers = [];

            for (let i = 1; i <= 6; i++) {
                const result = await poolComandos.query(insertUserText, [``, ``, ``, comandId]);
                createdUsers.push(result.rows[0]);
            }

            res.status(201).json({ comandId: comandId, users: createdUsers  });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Ошибка на сервере' });
        }
    }

    async updateUsersByCommand(req, res) {
        try {
            const commandId  = req.comand_id;
            const { users } = req.body;
            console.log(commandId)
            const updateQuery = 'UPDATE user_command SET first_name = $1, last_name = $2, patronymic = $3 WHERE user_id = $4 AND comand_id = $5 RETURNING *';
            const updatedUsers = [];

            for (const user of users) {
                const { first_name, last_name, patronymic, user_id } = user;
                const result = await poolComandos.query(updateQuery, [first_name, last_name,patronymic, user_id, commandId]);
                if (result.rowCount > 0) {
                    updatedUsers.push(result.rows[0]);
                }
            }

            res.status(200).json(updatedUsers);
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

    async createTestAndTasks(req, res){
        try {
            const { test_name, tasks } = req.body;

            // Создаем запись в таблице comand_tests
            const createTestQuery = 'INSERT INTO comand_tests (test_name) VALUES ($1) RETURNING test_id';
            const testResult = await poolComandos.query(createTestQuery, [test_name]);
            const testId = testResult.rows[0].test_id;

            // Создаем записи в таблице comand_task и связываем их с созданным тестом
            const createTaskQuery = 'INSERT INTO comand_task (task_name, task_description, test_id) VALUES ($1, $2, $3)';
            for (const task of tasks) {
                await poolComandos.query(createTaskQuery, [task.task_name, task.task_description, testId]);
            }

            res.status(200).json( {testId, message: 'Тест и задания успешно созданы.' });
        } catch (error) {
            console.log(error)
            res.status(500).json({error:'Ошибка при создании теста и заданий.'});
        }
    }




}



module.exports = new Commands_controller()