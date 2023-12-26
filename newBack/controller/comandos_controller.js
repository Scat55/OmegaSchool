const { validationResult, check } = require('express-validator');
const { addUser } = require('./user_controller');
const ExcelJS = require('exceljs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { json } = require('express');
const { poolComandos } = require('../db');
const { secret } = require('../config');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');
const validator = require('validator');
const moment = require('moment-timezone');
moment.tz.setDefault('Europe/Moscow');
const generateAccesToken = comand_id => {
	const payload = {
		comand_id,
	};
	return jwt.sign(payload, secret, { expiresIn: '365d' });
};
const currentTime = moment().format();
const registrationDeadline = moment('2023-12-27T14:00:00'); // Установите срок регистрации
const startTest = moment('2023-12-25T14:00:00');
const endTest = moment('2023-12-27T15:00:00');

class Commands_controller {
	async CreateComandos(req, res) {
		try {
			const { comandName, password, school, email } = req.body;

			console.log(moment());
			if (moment() > registrationDeadline) {
				return res.status(400).json({ message: 'Регистрация команд закрыта' });
			}

			const queryResult = await poolComandos.query(
				'SELECT * FROM comandos WHERE comand_name = $1',
				[comandName]
			);

			// Если результат запроса не пустой, отправляем сообщение о наличии команды
			if (queryResult.rows.length > 0) {
				return res
					.status(400)
					.json({ message: 'Команда с таким названием или уже существует' });
			}

			// Хэшируем пароль перед сохранением в базу данных
			const saltRounds = 10; // Уровень соли
			const hashedPassword = await bcrypt.hash(password, saltRounds);

			// Вставка команды
			const insertComandoText =
				'INSERT INTO comandos (comand_name, password,school, email) VALUES ($1, $2, $3, $4) RETURNING comand_id;';
			const comandoResult = await poolComandos.query(insertComandoText, [
				comandName,
				hashedPassword,
				school,
				email,
			]);

			const comandId = comandoResult.rows[0].comand_id;

			// Создание 6 пользователей
			const insertUserText =
				'INSERT INTO user_command (first_name, last_name, patronymic, comand_id) VALUES ($1, $2, $3, $4) RETURNING *';
			const createdUsers = [];

			for (let i = 1; i <= 6; i++) {
				const result = await poolComandos.query(insertUserText, [
					``,
					``,
					``,
					comandId,
				]);
				createdUsers.push(result.rows[0]);
			}

			res
				.status(201)
				.json({ comandId: comandId, email: email, users: createdUsers });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Ошибка на сервере' });
		}
	}

	async updateUsersByCommand(req, res) {
		try {
			const commandId = req.comand_id;
			const { users } = req.body;
			console.log(commandId);
			const updateQuery =
				'UPDATE user_command SET first_name = $1, last_name = $2, patronymic = $3 WHERE user_id = $4 AND comand_id = $5 RETURNING *';
			const updatedUsers = [];

			for (const user of users) {
				const { first_name, last_name, patronymic, user_id } = user;
				const result = await poolComandos.query(updateQuery, [
					first_name,
					last_name,
					patronymic,
					user_id,
					commandId,
				]);
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

	async LoginComandos(req, res) {
		const { comandName, password } = req.body;

		// Проверка наличия команды по email и паролю
		const loginComandoText = 'SELECT * FROM comandos WHERE comand_name = $1';
		const loginComandoResult = await poolComandos.query(loginComandoText, [
			comandName,
		]);

		if (loginComandoResult.rowCount > 0) {
			// Команда найдена, возвращаем её идентификатор
			const passwordMatch = await bcrypt.compare(
				password,
				loginComandoResult.rows[0].password
			);

			if (passwordMatch) {
				const token = generateAccesToken(loginComandoResult.rows[0].comand_id);

				req.session.token = token;
				req.session.save(() => {
					res.json({
						message: 'Успешная аутентификация',
						id: loginComandoResult.rows[0].comand_id,
						token,
					});
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

	async InfoComandos(req, res) {
		const command_id = req.comand_id;

		try {
			// Получение списка user_id из user_command
			const userCommandsResult = await poolComandos.query(
				'SELECT user_id, first_name,last_name FROM user_command WHERE comand_id = $1',
				[command_id]
			);
			const comandNameResult = await poolComandos.query(
				'SELECT comand_name, email, school FROM comandos WHERE comand_id = $1',
				[command_id]
			);

			const comandName = comandNameResult.rows[0];

			const userCommands = userCommandsResult.rows;
			let users = []; // Renamed to 'users' for clarity
			for (const userCommand of userCommands) {
				// Получение информации о пользователе из таблицы user
				const userResult = await poolComandos.query(
					'SELECT first_name, last_name, patronymic FROM user_command WHERE user_id = $1',
					[userCommand.user_id]
				);

				const userData = userResult.rows[0]; // Renamed to 'userData' for clarity
				if (userData) {
					// Checking if userData is not empty
					// Сборка данных пользователя
					users.push({
						user_id: userCommand.user_id,
						email: userCommand.email,
						first_name: userData.first_name,
						last_name: userData.last_name,
						patronymic: userData.patronymic,
					});
				} else {
					users.push({
						user_id: userCommand.user_id,
						email: userCommand.email,
						first_name: 'NULL',
						last_name: 'NULL',
						patronymic: 'NULL',
					});
				}
			}

			res.status(200).json({
				comandName: comandName.comand_name,
				email: comandName.email,
				school: comandName.school,
				users: users,
			});
		} catch (error) {
			console.error('Error in InfoComandos:', error);
			res.status(500).json({ message: 'Internal Server Error' });
		}
	}

	async createTestAndTasks(req, res) {
		try {
			const { test_name, tasks } = req.body;

			// Создаем запись в таблице comand_tests
			const createTestQuery =
				'INSERT INTO comand_tests (test_name) VALUES ($1) RETURNING test_id';
			const testResult = await poolComandos.query(createTestQuery, [test_name]);
			const testId = testResult.rows[0].test_id;

			// Создаем записи в таблице comand_task и связываем их с созданным тестом
			const createTaskQuery =
				'INSERT INTO comand_task (task_name, task_description, test_id) VALUES ($1, $2, $3)';
			for (const task of tasks) {
				await poolComandos.query(createTaskQuery, [
					task.task_name,
					task.task_description,
					testId,
				]);
			}

			res
				.status(200)
				.json({ testId, message: 'Тест и задания успешно созданы.' });
		} catch (error) {
			console.log(error);
			res.status(500).json({ error: 'Ошибка при создании теста и заданий.' });
		}
	}

	async GetTasks(req, res) {
		try {
			const command_id = req.comand_id;
			console.log('+', moment());
			console.log(startTest);
			if (moment() < startTest) {
				return res.status(400).json({ message: 'Тест еще не начался' });
			}
			if (moment() > endTest) {
				return res.status(400).json({ message: 'Тест уже закончился' });
			}
			// Получение test_id из таблицы user_tests
			const userTestResult = await poolComandos.query(
				`
            SELECT test_id, start_time
            FROM user_tests
            WHERE comand_id = $1
        `,
				[command_id]
			);

			if (userTestResult.rows.length === 0) {
				return res.status(404).json({ message: 'Тест не найден' });
			}
			console.log(userTestResult.rows[0].start_time);
			// запрет наповторное отправление теста
			if (userTestResult.rows[0].start_time) {
				return res.status(200).json({ message: 'Тест уже взят' });
			}

			const test_id = userTestResult.rows[0].test_id;

			// Получение информации о задании из comand_task по test_id
			const taskInfo = await poolComandos.query(
				`
            SELECT task_name, task_description
            FROM comand_task
            WHERE test_id = $1
            LIMIT 1;
        `,
				[test_id]
			);

			// Получение информации о тесте и задании из comand_task по test_id
			const testInfo = await poolComandos.query(
				`
            SELECT task_name, task_description, numkol
            FROM comand_task task
            WHERE test_id = $1 
            ORDER BY numkol;            
        `,
				[test_id]
			);

			const testName = await poolComandos.query(
				`
            SELECT test_name
            FROM comand_tests
            WHERE test_id = $1
      `,
				[test_id]
			);

			if (taskInfo.rows.length === 0) {
				return res.status(404).json({ message: 'Задание не найдено' });
			}

			// Обновление start_time и вставка данных о задании при взятии теста
			await poolComandos.query(
				`
            UPDATE user_tests
            SET start_time = $2
            WHERE comand_id = $1
        `,
				[command_id, moment()]
			);

			res.json({
				message: 'Тест успешно взят',
				test_id: test_id,
				test_name: testName.rows[0].test_name,
				task: testInfo.rows,
			});
		} catch (error) {
			console.log('Error in InfoComandos:', error);
			res.status(500).json({ massage: 'Internal Server Error' });
		}
	}

	async SubmitAnswer(req, res) {
		try {
			const requestData = req.body;
			const command_id = req.comand_id;
			if (moment() > endTest) {
				return res.status(400).json({ message: 'Тест уже закончился' });
			}

			requestData.data.forEach(async element => {
				const result = await poolComandos.query(
					'SELECT task_id, test_id FROM comand_task WHERE task_name = $1',
					[element.task_name]
				);
				await poolComandos.query(
					`
                UPDATE user_answers
                SET user_response = $4, answer_time = $5
                WHERE comand_id = $1
                  AND test_id = $2
                  AND task_id = $3;
            `,
					[
						command_id,
						result.rows[0].test_id,
						result.rows[0].task_id,
						element.answer,
						element.time,
					]
				);
			});
			// Обновление start_time и вставка данных о задании при взятии теста
			await poolComandos.query(
				`
            UPDATE user_tests
            SET end_time = $2
            WHERE comand_id = $1
        `,
				[command_id, moment()]
			);
			res.status(200).json({ massage: 'Данные успешно получены!' });
		} catch (error) {
			console.log('error: ', error);
			res.status(500).json({ error: error });
		}
	}

	async getResult(req, res) {
		try {
			const commands = await poolComandos.query(`
      
      SELECT
      c.school AS school_name,
      c.comand_name AS team_name
      FROM
      user_answers ua
      JOIN
      comandos c ON ua.comand_id = c.comand_id
      JOIN
      comand_task ct ON ua.task_id = ct.task_id
      GROUP BY
          c.comand_name,
      c.school;
    `);

			const tests = await poolComandos.query(`
      SELECT
        c.school AS school_name,
        c.comand_name AS team_name,
        t.test_name
      FROM
        user_answers ua
      JOIN
        comandos c ON ua.comand_id = c.comand_id
      JOIN
        comand_task ct ON ua.task_id = ct.task_id
      JOIN
        public.comand_tests t on t.test_id = ua.test_id
      GROUP BY
        c.school,
        c.comand_name,
        ct.test_id, t.test_name;
    `);

			const answers = await poolComandos.query(`
      SELECT
        c.school AS school_name,
        c.comand_name AS team_name,
        t.task_name as task_name,
        t.task_answer as true_answer,
        ua.user_response AS answer,
        ua.is_correct as is_correct,
        ua.answer_time AS time
      FROM
        user_answers ua
      JOIN
        comandos c ON ua.comand_id = c.comand_id
      JOIN
        comand_task ct ON ua.task_id = ct.task_id
      join
        public.comand_task t on t.task_id = ua.task_id
        ORDER BY
        t.task_name;
    `);
			// console.log(answers.rows)

			const data = [];

			commands.rows.forEach(command => {
				const { school_name, team_name } = command;
				const testInfo = tests.rows.find(
					test =>
						test.school_name === school_name && test.team_name === team_name
				);
				const answerInfo = answers.rows.filter(
					answer =>
						answer.school_name === school_name && answer.team_name === team_name
				);
				const entry = {
					school_name,
					team_name,
					test_name: testInfo.test_name,
					task_names: [],
					is_correct: [],
					answer_comand: [],
					true_answer: [],
					time: [],
				};
				// Dynamically add answer and time properties based on the number of questions
				answerInfo.forEach((answer, index) => {
					entry.task_names[index] = answer.task_name;
				});
				answerInfo.forEach((answer, index) => {
					entry.is_correct[index] = answer.is_correct;
				});
				answerInfo.forEach((answer, index) => {
					entry.true_answer[index] = answer.true_answer;
				});
				answerInfo.forEach((answer, index) => {
					entry.answer_comand[index] = answer.answer;
				});
				answerInfo.forEach((answer, index) => {
					entry.time[index] = answer.time;
				});

				data.push(entry);
			});

			res.json(data);
		} catch (error) {
			console.error('Error retrieving data:', error);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	}

	async getResultToExcel(req, res) {
		try {
			const commands = await poolComandos.query(`
      
      SELECT
      c.school AS school_name,
      c.comand_name AS team_name
      FROM
      user_answers ua
      JOIN
      comandos c ON ua.comand_id = c.comand_id
      JOIN
      comand_task ct ON ua.task_id = ct.task_id
      GROUP BY
          c.comand_name,
      c.school;
    `);

			const tests = await poolComandos.query(`
      SELECT
        c.school AS school_name,
        c.comand_name AS team_name,
        t.test_name
      FROM
        user_answers ua
      JOIN
        comandos c ON ua.comand_id = c.comand_id
      JOIN
        comand_task ct ON ua.task_id = ct.task_id
      JOIN
        public.comand_tests t on t.test_id = ua.test_id
      GROUP BY
        c.school,
        c.comand_name,
        ct.test_id, t.test_name;
    `);

			const answers = await poolComandos.query(`
      SELECT
        c.school AS school_name,
        c.comand_name AS team_name,
        t.task_name as task_name,
        t.task_answer as true_answer,
        ua.user_response AS answer,
        ua.is_correct as is_correct,
        ua.answer_time AS time
      FROM
        user_answers ua
      JOIN
        comandos c ON ua.comand_id = c.comand_id
      JOIN
        comand_task ct ON ua.task_id = ct.task_id
      join
        public.comand_task t on t.task_id = ua.task_id
        ORDER BY
        t.task_name;
    `);
			// console.log(answers.rows)

			const data = [];

			commands.rows.forEach(command => {
				const { school_name, team_name } = command;
				const testInfo = tests.rows.find(
					test =>
						test.school_name === school_name && test.team_name === team_name
				);
				const answerInfo = answers.rows.filter(
					answer =>
						answer.school_name === school_name && answer.team_name === team_name
				);
				const entry = {
					school_name,
					team_name,
					test_name: testInfo.test_name,
				};

				answerInfo.forEach((answer, index) => {
					entry[`task_name_${index + 1}`] = answer.task_name;
					entry[`is_correct_${index + 1}`] = answer.is_correct;
					entry[`true_answer_${index + 1}`] = answer.true_answer;
					entry[`answer_comand_${index + 1}`] = answer.answer;
					entry[`time_${index + 1}`] = answer.time;
				});

				data.push(entry);
			});

			// Create a new workbook and add a worksheet
			const workbook = new ExcelJS.Workbook();
			const worksheet = workbook.addWorksheet('Results');

			// Define the header row dynamically based on data structure
			const headers = Object.keys(data[0]);
			worksheet.addRow(headers);

			// Populate the worksheet with data
			data.forEach(entry => {
				const rowValues = headers.map(header => entry[header]);
				worksheet.addRow(rowValues);
			});

			const sumFormula = `SUM(${String.fromCharCode(
				65 + headers.indexOf('is_correct_')
			)}2:${String.fromCharCode(65 + headers.indexOf('is_correct_'))}${
				data.length + 1
			})`;
			worksheet.addRow([{ formula: sumFormula, result: 'Sum' }]);
			// Set up the response headers to send an Excel file
			res.setHeader(
				'Content-Type',
				'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
			);
			res.setHeader('Content-Disposition', 'attachment; filename=results.xlsx');

			// Write the workbook to the response
			await workbook.xlsx.write(res);

			// End the response
			res.end();
		} catch (error) {
			console.error('Error retrieving data:', error);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	}
}

module.exports = new Commands_controller();
