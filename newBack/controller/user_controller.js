const db = require('../db')
const fs = require('fs');
const { resolve, join } = require("path");
const archiver = require('archiver');
const { v4: uuidv4 } = require('uuid');
const mail = require("../utils/mail");
const store = require("../utils/store");

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
      res.status(500).json({ error: 'Ошибка на сервере' });
    }
  }

  async additionalData(req, res) {
    try {
      const user_id = req.user_id
      // Извлекаем данные из тела запроса
      const { first_name, last_name, patronymic, birthdate, classes, item } = req.body;
      console.log(user_id, first_name, last_name, patronymic, birthdate, classes, item)
      // Создаем SQL-запрос для обновления данных пользователя в таблице users
      const sql = `UPDATE users 
                   SET first_name = $1, last_name = $2, patronymic = $3, birthdate = $4, classes = $5, item = $6
                   WHERE user_id = $7`;

      // Используем асинхронный метод для выполнения SQL-запроса
      await db.query(sql, [first_name, last_name, patronymic, birthdate, classes, item, user_id]);

      console.log('Дополнительные данные успешно обновлены');
      res.status(200).json({ message: 'Дополнительные данные успешно обновлены' });
    } catch (error) {
      console.error('Ошибка при обновлении данных:', error);
      res.status(500).json({ message: 'Произошла ошибка при обновлении данных' });
    }
  }

  async getUserInformation(req, res) {
    console.log(req.body)
    const user_id = req.params.user_id;
    try {
      // Асинхронные SQL-запросы для получения данных пользователя, оценок и достижений
      const [userResult, gradesResult, achievementsResult, achievements_teacherResult] = await Promise.all([
        db.query('SELECT * FROM users WHERE user_id = $1', [user_id]),
        db.query('SELECT * FROM student_grades WHERE user_id = $1', [user_id]),
        db.query('SELECT * FROM achievements WHERE user_id = $1', [user_id]),
        db.query('SELECT * FROM teacher_grades WHERE user_id = $1', [user_id])
      ]);

      // Извлекаем результаты из объектов результата
      const user = userResult.rows[0];
      const grades = gradesResult.rows;
      const achievements = achievementsResult.rows;
      const grades_teacher = achievements_teacherResult.rows;

      if (!user) {
        console.log(`Пользователь с ID ${user_id} не найден`);
        return res.status(404).json({ message: 'Пользователь не найден' });
      }

      // Соберите результаты в один объект
      const userData = {
        user,
        grades,
        achievements,
        grades_teacher,
      };

      console.log(`Данные для пользователя с ID ${user_id} найдены`);
      res.json(userData);
    } catch (error) {
      console.error('Ошибка при выполнении SQL-запросов:', error.message);
      res.status(500).json({ error: 'Ошибка на сервере' });
    }
  }

  async getTypeOfUser(req, res) {
    const sql = 'SELECT DISTINCT type_user FROM users'; // Запрос на получение уникальных типов пользователей

    try {
      const result = await db.query(sql); // Выполнение запроса без параметров
      const typesUser = result.rows.map(row => row.type_user);
      res.json({ typesUser });
    } catch (error) {
      console.error('Ошибка при выполнении SQL-запроса:', error.message);
      res.status(500).json({ error: 'Ошибка на сервере' });
    }
  }

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
        const insertUserCommandText = 'INSERT INTO user_command (comand_id, user_id) VALUES ($1, $2)';
        await db.query(insertUserCommandText, [comandId, userId]);
      }

      res.status(201).json({ comandId: comandId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }


  async getUserIDForEmail(req, res) {
    // Извлекаем адрес электронной почты из параметров запроса
    const email = req.params.email;

    // SQL-запрос для получения user_id по адресу электронной почты
    const sql = 'SELECT user_id FROM users WHERE email = $1';
    console.log(email)
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


      const [userResult, achievementsResult, gradesResult, achievements_teacherResult] = await Promise.all([
        db.query('SELECT * FROM users WHERE email = $1', [email]),
        db.query('SELECT * FROM achievements WHERE email = (SELECT user_id FROM users WHERE email = $1)', [email]),
        db.query('SELECT * FROM student_grades WHERE email = (SELECT user_id FROM users WHERE email = $1)', [email]),
        db.query('SELECT * FROM teacher_grades WHERE email = $1', [user_id])
      ]);

      // Извлекаем результаты из объектов результата
      const user = userResult.rows[0];
      const grades = gradesResult.rows;
      const achievements = achievementsResult.rows;
      const grades_teacher = achievements_teacherResult.rows;


      // Соберите результаты в один объект
      const userData = {
        user,
        achievements,
        grades,
        grades_teacher,
      };

      console.log(`Данные для пользователя с Email ${email} найдены`);
      res.json(userData);
    } catch (error) {
      console.error('Ошибка при выполнении SQL-запросов:', error.message);
      res.status(500).json({ error: 'Ошибка на сервере' });
    }
  }

  //   async add_level_1_test(req, res) {
  //
  //       // Разбираем JSON-объект из запроса
  //       const {task_test, task_description, add_file, classes, questions} = req.body;
  //       const user_id = req.user_id
  //
  //       if (!Array.isArray(questions)) {
  //           return res.status(400).json({error: 'Questions should be an array'});
  //       }
  //
  //       // Вставляем данные теста в базу данных
  //       const insertTestQuery = `
  //   INSERT INTO level_1_tests (user_id, task_test, task_description, add_file, classes)
  //   VALUES ($1, $2, $3, $4, $5)
  //   RETURNING test_id;
  // `;
  //       const testValues = [user_id, task_test, task_description, add_file, classes];
  //
  //       // Отправляем запрос и получаем ID вставленного теста
  //       db.query(insertTestQuery, testValues)
  //           .then((testResult) => {
  //               const testId = testResult.rows[0].test_id;
  //
  //               // Вставляем вопросы и варианты ответов
  //               questions.forEach((question) => {
  //                   const {question_text, options} = question;
  //
  //                   // Вставляем данные вопроса
  //                   const insertQuestionQuery = `
  //         INSERT INTO questions (text, test_id)
  //         VALUES ($1, $2)
  //         RETURNING question_id;
  //       `;
  //
  //                   const questionValues = [question_text, testId];
  //
  //                   // Отправляем запрос и получаем ID вставленного вопроса
  //                   db.query(insertQuestionQuery, questionValues)
  //                       .then((questionResult) => {
  //                           const questionId = questionResult.rows[0].question_id;
  //                           // console.log(req.body)
  //                           // Вставляем варианты ответовs
  //                           for (let question in questions) {
  //                               const {option_text, is_correct} = questions[question];
  //                               // console.log(question)
  //                               // Вставляем данные варианта ответа
  //                               const insertOptionQuery = `
  //               INSERT INTO options (text, is_correct, question_id)
  //               VALUES ($1, $2, $3);
  //             `;
  //                               const optionValues = [option_text, is_correct, questionId];
  //
  //                               // Отправляем запрос для вставки варианта ответа
  //                               db.query(insertOptionQuery, optionValues);
  //                           }
  //                           ;
  //                       })
  //                       .catch((error) => {
  //                           console.error('Ошибка при вставке вопроса:', error.message);
  //                       });
  //               });
  //
  //               // Отправляем ответ об успешном добавлении теста
  //               res.json({message: 'Тест успешно добавлен'});
  //           })
  //           .catch((error) => {
  //               console.error('Ошибка при вставке теста:', error.message);
  //               res.status(500).json({error: 'Ошибка на сервере'});
  //           });
  //   };

  async getTasksForExpert(req, res) {
    try {
      const user_id = req.user_id;

      // Запрос для level_1_tests
      const level1TestsSql = `
            SELECT *
            FROM level_1_tests
            WHERE (ver_1_id IS NULL OR ver_1_id != $1) AND (ver_2_id IS NULL OR ver_2_id != $1) and (user_id != $1);
        `;

      // Запрос для level_2_tests
      const level2TestsSql = `
            SELECT *
            FROM level_2_tests
            WHERE (ver_1_id IS NULL OR ver_1_id != $1) AND (ver_2_id IS NULL OR ver_2_id != $1) and (user_id != $1);
        `;

      // Запрос для level_3_tests
      const level3TestsSql = `
            SELECT *
            FROM level_3_tests
            WHERE (ver_1_id IS NULL OR ver_1_id != $1) AND (ver_2_id IS NULL OR ver_2_id != $1) and (user_id != $1);
        `;

      // Выполнение запросов для каждого уровня
      const level1OptionsResult = await db.query(level1TestsSql, [user_id]);
      const level2OptionsResult = await db.query(level2TestsSql, [user_id]);
      const level3OptionsResult = await db.query(level3TestsSql, [user_id]);

      // Формирование ответа
      const formattedResponse = [
        ...level1OptionsResult.rows.map(test => ({
          task_id: test.test_id,
          task_test: test.task_test,
          level: 1
        })),
        ...level2OptionsResult.rows.map(test => ({
          task_id: test.test_id,
          task_test: test.task_test,
          level: 2
        })),
        ...level3OptionsResult.rows.map(test => ({
          task_id: test.test_id,
          task_test: test.task_test,
          level: 3
        }))
      ];

      res.json(formattedResponse);

    } catch (error) {
      console.error('Ошибка при выполнении SQL-запроса:', error.message);
      res.status(500).json({ error: 'Ошибка на сервере' });
    }
  }

  async getTasksForStudent(req, res) {
    try {
      const user_id = req.user_id; // Предполагаем, что user_id уже извлечен из токена
      console.log(user_id)
      // Получаем список test_id и test_level для данного user_id
      const studentTestsSql = `
        SELECT test_id, test_level, decided
        FROM student_solutions
        WHERE user_id = $1;
    `;

      // Выполнение запроса к базе данных
      const studentTestsResult = await db.query(studentTestsSql, [user_id]);

      // Теперь для каждого test_id получим название теста из соответствующей таблицы
      const testNames = await Promise.all(studentTestsResult.rows.map(async (test) => {
        const levelTestSql = `
            SELECT task_test, classes, subject
            FROM level_${test.test_level}_tests
            WHERE test_id = $1;
        `;
        console.log([test.test_id]); // Убедитесь, что этот console.log нужен для отладки
        const levelTestResult = await db.query(levelTestSql, [test.test_id]);
        if (levelTestResult.rows.length > 0) {
          const testDetails = levelTestResult.rows[0];
          return {
            id: test.test_id,
            complexity: test.test_level,
            title: testDetails.task_test,
            class: testDetails.classes,
            topic: testDetails.subject,
            status: test.decided
          };
        } else {
          return {
            id: test.test_id,
            complexity: test.test_level,
            title: 'Название не найдено',
            class: 'Класс не найден',
            topic: 'Предмет не найден',
            status: 'Предмет не найден'
          };
        }
      }));

      // Отправляем результат
      res.json(testNames);

    } catch (error) {
      console.error('Ошибка при выполнении SQL-запроса:', error.message);
      res.status(500).json({ error: 'Ошибка на сервере' });
    }
  }

  //передать предмет класс сложность название и т.д.
  async getTasksHintForStudent(req, res) {
    try {
      const user_id = req.user_id;
      const test_id = req.params.testID;
      console.log(test_id, user_id);

      // SQL to get the hint for the test
      const studentTestsHintSql = `
            SELECT task_hint
            FROM level_2_tests
            WHERE test_id = $1;
        `;

      // SQL to update the hint check status
      const studentTestsHintCheckSql = `
            UPDATE student_solutions
            SET check_hint = 'Да'
            WHERE user_id = $1 AND test_id = $2;       
        `;

      // Execute the query to get the hint
      const studentTestsHintResult = await db.query(studentTestsHintSql, [test_id]);

      // If a hint exists, update the check status
      if (studentTestsHintResult.rows.length > 0) {
        await db.query(studentTestsHintCheckSql, [user_id, test_id]);
        // Send the hint back to the client
        res.json(studentTestsHintResult.rows[0]);
      } else {
        res.status(404).json({ error: 'Подсказка не найдена' });
      }
    } catch (error) {
      console.error('Ошибка при выполнении SQL-запроса:', error.message);
      res.status(500).json({ error: 'Ошибка на сервере' });
    }
  }

  async getTasksAnswerForStudent(req, res) {
    try {
      const user_id = req.user_id;
      const test_id = req.params.testID;
      console.log(test_id, user_id);

      // SQL to get the hint for the test
      const studentTestsHintSql = `
            SELECT task_answer
            FROM level_2_tests
            WHERE test_id = $1;
        `;

      // SQL to update the hint check status
      const studentTestsHintCheckSql = `
            UPDATE student_solutions
            SET check_answer = 'Да'
            WHERE user_id = $1 AND test_id = $2;       
        `;

      // Execute the query to get the hint
      const studentTestsHintResult = await db.query(studentTestsHintSql, [test_id]);

      // If a hint exists, update the check status
      if (studentTestsHintResult.rows.length > 0) {
        await db.query(studentTestsHintCheckSql, [user_id, test_id]);
        // Send the hint back to the client
        res.json(studentTestsHintResult.rows[0]);
      } else {
        res.status(404).json({ error: 'Ответ не найдена' });
      }
    } catch (error) {
      console.error('Ошибка при выполнении SQL-запроса:', error.message);
      res.status(500).json({ error: 'Ошибка на сервере' });
    }
  }

  async getAnswerByStudent1(req, res) {
    const userId = req.user_id;
    const testId = req.params.testID;
    const options = req.body;
    console.log('id', userId)
    console.log('test', testId)
    console.log('варианты', options)

    try {
      // Сохраняем обработанную строку в базу данных
      const insertOptionsSql = `
        UPDATE student_solutions
        SET opt_score = $3, decided = 'Решено'
        WHERE user_id = $1 AND test_id = $2;
      `;

      // Выполнение запроса на вставку обработанных вариантов ответов
      await db.query(insertOptionsSql, [userId, testId, options.options]);

      res.status(200).json({ message: 'Ответы успешно сохранены' });
    } catch (error) {
      console.error('Ошибка при выполнении запроса к базе данных:', error);
      res.status(500).json({ error: 'Ошибка на сервере' });
    }
  }

  async getAnswerByStudent2(req, res) {

    const userId = req.user_id;
    const testId = req.params.testID;
    const student_solution = req.params.student_solution; // Предполагается, что userId и testId также отправляются в теле запроса

    console.log('student_solution', student_solution)
    try {
      // Сохраняем обработанную строку в базу данных
      const insertOptionsSql = `
        UPDATE student_solutions
        SET student_solution = $3
        WHERE user_id = $1 AND test_id = $2;
      `;

      // Выполнение запроса на вставку обработанных вариантов ответов
      await db.query(insertOptionsSql, [userId, testId, student_solution]);

      if (!req.files || req.files.length === 0) {
        throw new Error('Пожалуйста, загрузите файл');
      }

      let pdfPath = null;
      let imgPath = null;

      for (const file of req.files) {
        if (file.mimetype === 'application/pdf') {
          pdfPath = file.originalname;  // или любой другой путь, где вы сохраняете файл
        } else if (file.mimetype.startsWith('image/')) { imgPath = file.originalname; }  // или любой другой путь, где вы сохраняете файл
      }

      // Обновление записей в базе данных с путями к файлам
      const updateQuery = 'UPDATE student_solutions SET add_file_by_student = $1, add_img_by_student = $2 WHERE test_id = $3 and user_id = $4';
      const updateValues = [pdfPath, imgPath, testId, userId];

      await db.query(updateQuery, updateValues);


      res.status(200).json({ message: 'Ответы и файлы успешно сохранены' });

    } catch (error) {
      console.error('Ошибка при выполнении запроса к базе данных:', error);
      res.status(500).json({ error: 'Ошибка на сервере' });
    }
  }


  async getAnswerByStudent3(req, res) {
    const userId = req.user_id;
    const testId = req.params.testID;
    const student_solution = req.params.student_solution; // Предполагается, что userId и testId также отправляются в теле запроса


    try {
      // Сохраняем обработанную строку в базу данных
      const insertOptionsSql = `
        UPDATE student_solutions
        SET student_solution = $3
        WHERE user_id = $1 AND test_id = $2;
      `;

      // Выполнение запроса на вставку обработанных вариантов ответов
      await db.query(insertOptionsSql, [userId, testId, student_solution]);

      let pdfPath = null;
      let imgPath = null

      for (const file of req.files) {
        if (file.mimetype === 'application/pdf') {
          pdfPath = file.originalname;  // или любой другой путь, где вы сохраняете файл
        } else if (file.mimetype.startsWith('image/')) {
          imgPath = file.originalname;  // или любой другой путь, где вы сохраняете файл
        }
      }

      // Обновление записей в базе данных с путями к файлам
      const updateQuery = 'UPDATE student_solutions SET add_file_by_student = $1, add_img_by_student = $2 WHERE test_id = $3 and user_id = $4';
      const updateValues = [pdfPath, imgPath, testId, userId];

      await db.query(updateQuery, updateValues);


      res.status(200).json({ message: 'Ответы и файлы успешно сохранены' });
    } catch (error) {
      console.error('Ошибка при выполнении запроса к базе данных:', error);
      res.status(500).json({ error: 'Ошибка на сервере' });
    }
  }

  async getTasksByID(req, res) {
    const testId = req.params.testID;
    const typeUser = req.type_user
    const userId = req.user_id
    console.log(typeUser)
    try {
      let test;
      let testLevel;
      let testQuery;
      let decidedStatus;
      const questionsQuery = 'SELECT * FROM questions WHERE test_id = $1';
      const questionsResult = await db.query(questionsQuery, [testId]);

      // Проверяем наличие теста в таблице level_1_tests
      testQuery = 'SELECT * FROM level_1_tests WHERE test_id = $1';
      let testResult = await db.query(testQuery, [testId]);

      if (testResult.rowCount > 0) {
        test = testResult.rows[0];
        testLevel = '1';
      } else {
        // Проверяем наличие теста в таблице level_2_tests
        testQuery = 'SELECT * FROM level_2_tests WHERE test_id = $1';
        testResult = await db.query(testQuery, [testId]);

        if (testResult.rowCount > 0) {
          test = testResult.rows[0];
          testLevel = '2';
        } else {
          // Проверяем наличие теста в таблице level_3_tests
          testQuery = 'SELECT * FROM level_3_tests WHERE test_id = $1';
          testResult = await db.query(testQuery, [testId]);

          if (testResult.rowCount > 0) {
            test = testResult.rows[0];
            testLevel = '3';
          } else {
            // Тест не найден ни в одной из таблиц
            return res.status(404).json({ error: 'Task not found' });
          }
        }
      }

      const questionsWithOptions = await Promise.all(questionsResult.rows.map(async (question) => {
        const optionsQuery = 'SELECT text, is_correct FROM options WHERE question_id = $1';
        const optionsResult = await db.query(optionsQuery, [question.question_id]);

        // Map the options and conditionally include 'is_correct'
        const options = optionsResult.rows.map(option => {
          if (typeUser === "Ученик" && decidedStatus) {
            // Return only text for students if decidedStatus is true
            return { text: option.text };
          } else {
            // Return both text and is_correct for other user types or if decidedStatus is false
            return { text: option.text, is_correct: option.is_correct };
          }
        });

        return options; // Return the options directly
      }));
      const flattenedOptions = questionsWithOptions.flat();
      const decidedQuery = 'SELECT decided FROM student_solutions WHERE user_id = $1 AND test_id = $2';
      const decidedResult = await db.query(decidedQuery, [userId, testId]);

      if (decidedResult.rowCount > 0) {
        // Если запись найдена, используем её статус
        decidedStatus = decidedResult.rows[0].decided;
      } else {
        // Если запись не найдена, можно установить стандартное значение или обработать как ошибку
        decidedStatus = false; // или другое стандартное значение
      }
      // Форматирование итогового ответа
      const formattedResponse = {
        level: testLevel,
        user_id: test.user_id,
        test_id: test.test_id,
        test_text: test.task_test,
        test_description: test.task_description,
        add_file: test.add_file,
        task_hint: test.task_hint,
        task_answer: test.task_answer,
        classes: test.classes,
        subject: test.subject,
        add_img: test.add_img,
        questions: flattenedOptions,
        decided: decidedStatus
      };

      res.json(formattedResponse);

    } catch (error) {
      console.error('Error executing SQL query:', error.message);
      res.status(500).json({ error: 'Server error' });
    }
  }



  // async getTasksByID(req, res){
  //     const testId = req.params.testID;
  //     try {
  //         // Fetch the main test information
  //         const testQuery = 'SELECT test_id, task_test, task_description, add_file, classes, ver_1, ver_1_masseg, ver_2, ver_2_masseg FROM level_1_tests WHERE test_id = $1';
  //         const testResult = await db.query(testQuery, [testId]);
  //
  //         if (testResult.rowCount === 0) {
  //             return res.status(404).json({ error: 'Task not found' });
  //         }
  //
  //         const test = testResult.rows[0];
  //
  //         // Fetch questions related to the test
  //         const questionsQuery = 'SELECT * FROM questions WHERE test_id = $1';
  //         const questionsResult = await db.query(questionsQuery, [testId]);
  //
  //         const questionsWithOptions = await Promise.all(questionsResult.rows.map(async (question) => {
  //             // For each question, fetch the related answer options
  //             const optionsQuery = 'SELECT text, is_correct FROM options WHERE question_id = $1';
  //             const optionsResult = await db.query(optionsQuery, [question.question_id]);
  //
  //             return {
  //                 question_text: question.text,
  //                 options: optionsResult.rows
  //             };
  //         }));
  //
  //         // Format the final response
  //         const formattedResponse = {
  //             test_id: test.test_id,
  //             test_text: test.task_test,
  //             test_description: test.task_description,
  //             add_file: test.add_file,
  //             classes: test.classes,
  //             ver_1: test.ver_1, // Added
  //             ver_1_message: test.ver_1_masseg, // Added
  //             ver_2: test.ver_2, // Added
  //             ver_2_message: test.ver_2_masseg, // Added
  //             questions: questionsWithOptions
  //         };
  //
  //         res.json(formattedResponse);
  //
  //     } catch (error) {
  //         console.error('Error executing SQL query:', error.message);
  //         res.status(500).json({ error: 'Server error' });
  //     }
  // }

  async updateTestByExpert(req, res) {
    console.log(req.body);
    console.log(req.user_id);

    try {
      const { ver, ver_masseg, test_id } = req.body;
      const user_id = req.user_id;

      let testLevel;
      const testLevels = ['level_1_tests', 'level_2_tests', 'level_3_tests'];
      const client = await db.connect();

      // Определяем уровень теста
      for (let i = 0; i < testLevels.length; i++) {
        const testQuery = `SELECT * FROM ${testLevels[i]} WHERE test_id = $1`;
        const testResult = await client.query(testQuery, [test_id]);

        if (testResult.rowCount > 0) {
          testLevel = testLevels[i];
          break;
        }
      }

      if (!testLevel) {
        client.release();
        return res.status(404).json({ error: 'тест не найден!' });
      }

      // Обновляем верификацию для найденного уровня теста
      const updateVerQuery = `
            UPDATE ${testLevel}
            SET ver_1 = COALESCE(ver_1, $1), ver_1_masseg = COALESCE(ver_1_masseg, $2), ver_1_id = COALESCE(ver_1_id, $3)
            WHERE test_id = $4 AND ver_1 IS NULL
            RETURNING test_id;
        `;

      let result = await client.query(updateVerQuery, [ver, ver_masseg, user_id, test_id]);

      if (result.rowCount === 0) {
        // Если обновление для ver_1 не прошло, пробуем обновить ver_2
        const updateVer2Query = `
                UPDATE ${testLevel}
                SET ver_2 = COALESCE(ver_2, $1), ver_2_masseg = COALESCE(ver_2_masseg, $2), ver_2_id = COALESCE(ver_2_id, $3)
                WHERE test_id = $4 AND ver_2 IS NULL
                RETURNING test_id;
            `;

        result = await client.query(updateVer2Query, [ver, ver_masseg, user_id, test_id]);
      }

      client.release();

      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Обновление не выполнено или тест уже проверен' });
      }

      res.json({ success: true, test_id: result.rows[0].test_id });
    } catch (error) {
      console.error('Ошибка при выполнении SQL-запроса:', error.message);
      res.status(500).json({ error: 'Ошибка на сервере' });
    }
  }

  async updateTestByTeacher(req, res) {
    try {
      const testId = req.params.testID;
      const student_id = req.params.userID; // ID студента, чье задание оценивается
      const user_id = req.user_id; // ID учителя, оценивающего задание
      const { opt_score, text_solution } = req.body; // Исправлено на деструктуризацию объекта

      // Обновляем оценку задания в таблице student_solutions
      const updateSolutionQuery = `
            UPDATE student_solutions
            SET opt_score = $1, user_id_ver = $2, correct_solution = $3
            WHERE user_id = $4 AND test_id = $5
            RETURNING test_id;
        `;

      const result = await db.query(updateSolutionQuery, [opt_score, user_id, text_solution, student_id, testId]);

      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Задание не найдено или уже оценено' });
      }

      res.json({ success: true, test_id: result.rows[0].test_id, message: "Задание успешно оценено" });
    } catch (error) {
      console.error('Ошибка при выполнении SQL-запроса:', error.message);
      res.status(500).json({ error: 'Ошибка на сервере' });
    }
  }

  async getTasksForStudentWithOcenka(req, res) {
    try {
      const user_id = req.user_id; // Предполагаем, что user_id уже извлечен из токена

      // Получаем список test_id и test_level для данного user_id
      const studentTestsSql = `
        SELECT test_id, test_level, decided, decided, correct_solution
        FROM student_solutions
        WHERE user_id = $1 and decided = 'Решено';
    `;

      // Выполнение запроса к базе данных
      const studentTestsResult = await db.query(studentTestsSql, [user_id]);

      // Теперь для каждого test_id получим название теста из соответствующей таблицы
      const testNames = await Promise.all(studentTestsResult.rows.map(async (test) => {
        const levelTestSql = `
            SELECT task_test, classes, subject    
            FROM level_${test.test_level}_tests
            WHERE test_id = $1;
        `;
        console.log([test.test_id]); // Убедитесь, что этот console.log нужен для отладки
        const levelTestResult = await db.query(levelTestSql, [test.test_id]);
        if (levelTestResult.rows.length > 0) {
          const testDetails = levelTestResult.rows[0];
          return {
            id: test.test_id,
            complexity: test.test_level,
            title: testDetails.task_test,
            class: testDetails.classes,
            topic: testDetails.subject,
            status: test.decided,
            opt_score: test.opt_score,
            decided: test.decided,
            ocenka: test.correct_solution
          };
        } else {
          return {
            id: test.test_id,
            complexity: test.test_level,
            title: 'Название не найдено',
            class: 'Класс не найден',
            topic: 'Предмет не найден',
            status: 'Предмет не найден'
          };
        }
      }));

      // Отправляем результат
      res.json(testNames);

    } catch (error) {
      console.error('Ошибка при выполнении SQL-запроса:', error.message);
      res.status(500).json({ error: 'Ошибка на сервере' });
    }
  }



  async getTasksForTeacher(req, res) {
    try {
      const user_id = req.user_id;
      // Запрос для level_1_tests
      const level1TestsSql = `
            SELECT *
            FROM level_1_tests
            WHERE (user_id = $1);
        `;

      // Запрос для level_2_tests
      const level2TestsSql = `
            SELECT *
            FROM level_2_tests
            WHERE user_id = $1;
        `;

      // Запрос для level_3_tests
      const level3TestsSql = `
            SELECT *
            FROM level_3_tests
            WHERE user_id = $1;
        `;

      // Выполнение запросов для каждого уровня
      const level1OptionsResult = await db.query(level1TestsSql, [user_id]);
      const level2OptionsResult = await db.query(level2TestsSql, [user_id]);
      const level3OptionsResult = await db.query(level3TestsSql, [user_id]);

      // Формирование ответа
      const formattedResponse = [
        ...level1OptionsResult.rows.map(test => ({
          task_id: test.test_id,
          task_test: test.task_test,
          level: 1
        })),
        ...level2OptionsResult.rows.map(test => ({
          task_id: test.test_id,
          task_test: test.task_test,
          level: 2
        })),
        ...level3OptionsResult.rows.map(test => ({
          task_id: test.test_id,
          task_test: test.task_test,
          level: 3
        }))
      ];

      res.json(formattedResponse);

    } catch (error) {
      console.error('Ошибка при выполнении SQL-запроса:', error.message);
      res.status(500).json({ error: 'Ошибка на сервере' });
    }
  }

  async getTasksForTeacherByStudent(req, res) {
    try {
      const user_id = req.user_id;

      // Запрос для получения test_id и user_id, где test_level = 2 или 3
      const TestsSql = `
            SELECT test_id, user_id
            FROM student_solutions
            WHERE (student_solution IS NOT NULL) AND (test_level = 2 OR test_level = 3);
        `;

      // Получаем список test_id и user_id для уровней 2 и 3
      const testIdsResult = await db.query(TestsSql);

      // Формируем ответ, используя полученные test_id и user_id
      const tasks = [];

      for (let row of testIdsResult.rows) {
        const test_id = row.test_id;
        const user_id = row.user_id; // Записываем user_id из результатов запроса

        // Получаем данные для уровня 2
        const level2TestsSql = `
                SELECT *
                FROM level_2_tests
                WHERE test_id = $1;
            `;
        const level2OptionsResult = await db.query(level2TestsSql, [test_id]);

        if (level2OptionsResult.rows.length > 0) {
          tasks.push(...level2OptionsResult.rows.map(test => ({
            task_id: test.test_id,
            user_id: user_id, // Добавляем user_id в объект задачи
            task_test: test.task_test,
            level: 2
          })));
        }

        // Получаем данные для уровня 3
        const level3TestsSql = `
                SELECT *
                FROM level_3_tests
                WHERE test_id = $1;
            `;
        const level3OptionsResult = await db.query(level3TestsSql, [test_id]);

        if (level3OptionsResult.rows.length > 0) {
          tasks.push(...level3OptionsResult.rows.map(test => ({
            task_id: test.test_id,
            user_id: user_id, // Добавляем user_id в объект задачи
            task_test: test.task_test,
            level: 3
          })));
        }
      }

      res.json(tasks);

    } catch (error) {
      console.error('Ошибка при выполнении SQL-запроса:', error.message);
      res.status(500).json({ error: 'Ошибка на сервере' });
    }
  }


  async getTasksForTeacherByStudentByID(req, res) {
    const testId = req.params.testID;
    const userID = req.params.userID;

    try {
      let test;
      let testLevel;
      let testResult;
      let studentSolution;

      // Try to fetch from level_2_tests first
      testResult = await db.query('SELECT * FROM level_2_tests WHERE test_id = $1', [testId]);

      if (testResult.rowCount > 0) {
        test = testResult.rows[0];
        testLevel = '2';
      } else {
        // If not found, try to fetch from level_3_tests
        testResult = await db.query('SELECT * FROM level_3_tests WHERE test_id = $1', [testId]);

        if (testResult.rowCount > 0) {
          test = testResult.rows[0];
          testLevel = '3';
        } else {
          // If not found in either, return error
          return res.status(404).json({ error: 'Task not found' });
        }
      }

      // Fetch the student's solution
      const studentSolutionsResult = await db.query('SELECT * FROM student_solutions WHERE test_id = $1 AND user_id = $2', [testId, userID]);

      if (studentSolutionsResult.rowCount > 0) {
        studentSolution = studentSolutionsResult.rows[0];
      } else {
        // If no solution is found, you can decide how you want to handle this
        // For example, you might want to return a different message or structure
        studentSolution = {
          student_solution: undefined
        };
      }

      // Format the final response
      const formattedResponse = {
        level: testLevel,
        user_id: userID, // assuming userID should come from params, as it is more specific
        test_id: test.test_id,
        test_text: test.task_test,
        add_file: test.add_file,
        task_hint: test.task_hint,
        task_answer: test.task_answer,
        classes: test.classes,
        subject: test.subject,
        add_img: test.add_img,
        // Include the student solution details
        answer_student: studentSolution.student_solution,
        checked: studentSolution.checked, // Replace with actual column name
        check_hint: studentSolution.check_hint, // Replace with actual column name
        check_answer: studentSolution.check_answer, // Replace with actual column name
        add_img_by_student: studentSolution.add_img_by_student, // Replace with actual column name
        add_file_by_student: studentSolution.add_file_by_student // Replace with actual column name
      };

      res.json(formattedResponse);
    } catch (error) {
      console.error('Error executing SQL query:', error.message);
      res.status(500).json({ error: 'Server error' });
    }
  }

  async uploads(req, res) {
    store.upload.array('files')(req, res, async (err) => { // Предположим, что вы загружаете несколько файлов под именем "files"
      if (err) {
        return res.status(500).send({ message: 'Ошибка загрузки файла' });
      }

      if (!req.files || req.files.length === 0) {
        return res.status(400).send({ message: 'Пожалуйста, загрузите файл' });
      }

      // Теперь у вас есть доступ к req.files, где содержится информация о загруженных файлах

      const fileDetails = req.files.map(file => ({
        name: file.originalname,
        path: file.path
      }));
      const filePaths = req.files.map(file => file.path);
      const filesString = filePaths.join(',');
      console.log("Путь к файлу:", fileDetails);

      // Обновите запись в базе данных с путями к файлам
      const updateQuery = 'UPDATE level_1_tests SET add_file = $1 WHERE test_id = $2';
      const updateValues = [filesString, test_id];
      try {
        await db.query(updateQuery, updateValues);
      } catch (updateErr) {
        console.error(updateErr);
        res.status(500).send('Ошибка при обновлении информации о файлах в базе данных.');
        return;
      }
      // Здесь вы можете сохранить fileDetails в вашу базу данных или выполнить любую другую обработку

      return res.send({ message: 'Файлы успешно загружены', files: fileDetails });
    });
  }

  async addTestAndUpload(req, res) {
    try {
      const { task_test_coded, task_description_coded, classes, options, subject } = req.params;
      const task_test = decodeURIComponent(task_test_coded)
      const task_description = decodeURIComponent(task_description_coded)
      const questions = task_test
      if (!options) {
        return res.status(400).json({ error: 'Options are missing' });
      }
      const parsedOptions = JSON.parse(options);

      console.log(parsedOptions);
      const user_id = req.user_id;

      // Insert test data into the database
      const insertTestQuery = `
          INSERT INTO level_1_tests (user_id, task_test, task_description, add_file, classes,subject, add_img)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          RETURNING test_id;
      `;
      const testValues = [user_id, task_test, task_description, null, classes, subject, null];
      const testResult = await db.query(insertTestQuery, testValues);
      const testId = testResult.rows[0].test_id;

      // Insert question
      const insertQuestionQuery = `
          INSERT INTO questions (text, test_id)
          VALUES ($1, $2)
          RETURNING question_id;
      `;
      const questionValues = [questions, testId];
      const questionResult = await db.query(insertQuestionQuery, questionValues);
      const questionId = questionResult.rows[0].question_id;

      // Insert options
      for (const option of parsedOptions) {
        const { text: option_text, checked: is_correct } = option;
        console.log(option_text, is_correct)
        const insertOptionQuery = `
              INSERT INTO options (text, is_correct, question_id)
              VALUES ($1, $2, $3);
          `;

        const optionValues = [option_text, is_correct, questionId];

        await db.query(insertOptionQuery, optionValues);
      }

      const { pdfPath, imgPath } = store.work_with_files(req, res);

      // Обновить запись в БД
      const updateQuery = `UPDATE level_1_tests SET add_file = $1, add_img = $2 WHERE test_id = $3`;

      const updateValues = [pdfPath, imgPath, testId];

      await db.query(updateQuery, updateValues);

      return res.send({ message: 'Тест и файлы успешно добавлены' });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Ошибка на сервере' });
    }
  }

  async addTest2AndUpload(req, res) {
    try {
      const { task_test_coded, task_description_coded, task_hint, task_answer, classes, subject } = req.params;

      const task_test = decodeURIComponent(task_test_coded)
      const task_description = decodeURIComponent(task_description_coded)
      const user_id = req.user_id;

      const insertTestQuery = `
            INSERT INTO level_2_tests (user_id, task_test, task_description, task_hint, task_answer, classes, subject, add_file, add_img)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING test_id;
        `;

      const testValues = [user_id, task_test, task_description, task_hint, task_answer, classes, subject, null, null];
      const testResult = await db.query(insertTestQuery, testValues);
      const testId = testResult.rows[0].test_id;

      // Используйте await для работы с файлами
      const { pdfPath, imgPath } = await store.work_with_files(req, res);

      // Обновить запись в БД
      const updateQuery = `UPDATE level_2_tests SET add_file = $1, add_img = $2 WHERE test_id = $3`;
      const updateValues = [pdfPath, imgPath, testId];

      await db.query(updateQuery, updateValues);

      return res.send({ message: 'Тест и файлы успешно добавлены' });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Ошибка на сервере' });
    }
  }


  async addAvatar(req, res) {
    try {
      let { imgPath } = store.work_with_files(req, res);

      for (const file of req.files) {
        if (file.mimetype.startsWith('image/')) {
          imgPath = file.originalname;  // или любой другой путь, где вы сохраняете файл
        } else res.status(500).json({ error: 'Неверный формат изображения' });
      }

      // Обновление записей в базе данных с путями к файлам
      const updateQuery = 'UPDATE users SET avatar = $1';
      const updateValues = [imgPath];

      await db.query(updateQuery, updateValues);

      return res.send({ message: 'Аватар успешно добавлены' });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Ошибка на сервере' });
    }
  }

  async addTest3AndUpload(req, res) {
    try {

      const { task_test_coded, task_description_coded, classes, subject } = req.params;
      const task_test = decodeURIComponent(task_test_coded)
      const task_description = decodeURIComponent(task_description_coded)
      const user_id = req.user_id;

      const insertTestQuery = `
            INSERT INTO level_3_tests (user_id, task_test, task_description, classes, subject)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING test_id;
        `;

      const testValues = [user_id, task_test, task_description, classes, subject];
      const testResult = await db.query(insertTestQuery, testValues);
      const testId = testResult.rows[0].test_id;

      const { pdfPath, imgPath } = store.work_with_files(req, res);

      // Обновление записей в базе данных с путями к файлам
      const updateQuery = 'UPDATE level_3_tests SET add_file = $1, add_img = $2 WHERE test_id = $3';
      const updateValues = [pdfPath, imgPath, testId];

      await db.query(updateQuery, updateValues);

      return res.send({ message: 'Тест и файлы успешно добавлены' });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Ошибка на сервере' });
    }
  }

  //Эта функция будет возвращать список всех файлов, загруженных конкретным пользователем.
  async listUserFiles(req, res) {
    try {
      const userId = req.user_id;
      const math_path = join('./uploads', `${req.user_id}`);

      // Проверка существования каталога
      if (!fs.existsSync(math_path)) {
        return res.status(404).send({ message: 'Каталог не найден' });
      }

      const files = fs.readdirSync(math_path);

      const userFiles = files.filter((fileName) => {
        return fileName.split('_')[4];
      });
      return res.send({ userFiles });

    } catch (error) {
      console.error("Произошла ошибка при поиске файлов:", error);
      return res.status(500).send({ message: 'Ошибка сервера' });
    }
  }

  //переделать логику удаления файла
  async deleteUserFiles(req, res) {
    try {
      const fileNames = req.params.file_names.split(','); // Преобразование строки в массив имен файлов

      const userDirectory = join('./uploads', `${req.user_id}`);

      // Проверка существования каталога
      if (!fs.existsSync(userDirectory)) {
        return res.status(404).send({ message: 'Каталог не найден' });
      }

      const existingFiles = fs.readdirSync(userDirectory);

      fileNames.forEach(fileName => {
        // Проверка, существует ли файл в каталоге пользователя
        if (existingFiles.includes(fileName)) {
          const filePath = join(userDirectory, fileName);
          res.fs.unlinkSync(filePath); // Удаление файла
        }
      });

      return res.send({ message: 'Файлы успешно удалены' });

    } catch (error) {
      console.error("Произошла ошибка при удалении файлов:", error);
      return res.status(500).send({ message: 'Ошибка сервера' });
    }
  }

  download(req, res) {
    try {

      const key = req.headers['custom-uuid'];

      console.log(key)

      const fileNames = req.params.file_names.split(','); // Преобразование строки в массив имен файлов
      console.log(fileNames);

      const math_path = join('./uploads', `${key}`);

      // Проверка существования каталога
      if (!fs.existsSync(math_path)) { return res.status(404).send({ message: 'Каталог не найден' }); }

      const files = fs.readdirSync(math_path);
      // Проверка, соответствует ли какое-либо из имен файлов
      const userFiles = files.filter((fileName) => { return fileNames.some(name => fileName.includes(name)); });

      if (userFiles.length === 0) { return res.status(404).send({ message: 'Файлы не найдены' }); }

      // Если найден только один файл, отправляет его напрямую
      if (userFiles.length === 1) {
        const absolutePath = resolve(math_path, userFiles[0]);
        return res.sendFile(absolutePath);
      } else {
        // Создаем архив и отправляем его пользователю
        const archive = archiver('zip');
        res.attachment('files.zip'); // это задает имя файла для скачивания

        userFiles.forEach(file => { archive.file(join(math_path, file), { name: file }); });

        archive.finalize();
        archive.pipe(res);
      }

    } catch (error) { return res.status(500).send({ message: 'Ошибка сервера' }); }
  }

  async setEmail(req, res) {
    try {
      const email = req.params.email;

      // Выводим для отладки
      console.log(email);

      // Генерируем код подтверждения
      const verificationCode = await mail.generateVerificationCode(email);

      // Отправляем письмо с кодом подтверждения
      try {
        console.log('sendVerificationEmail', email, verificationCode)
        const verificationLink = `http://localhost:8080/verify-email/${email}/${verificationCode}`;

        mail.transporter.sendMail({
          from: 'omegalspu@gmail.com',
          to: email,
          subject: 'Подтверждение Email',
          html: `Пожалуйста, кликните <a href="${verificationLink}">здесь</a>, чтобы подтвердить ваш email.`
        });

        await mail.saveVerificationCode(email, verificationCode);
        console.log('Email успешно отправлен');
      } catch (error) {
        console.error('Ошибка при отправке email:', error);
        throw error;
      }

      await mail.checkVerificationCode(email, verificationCode);
      await mail.setUserEmailVerified(email);

      res.send('Письмо с кодом подтверждения отправлено на ваш email.');
    } catch (error) {
      console.error('Ошибка при обработке запроса на подтверждение email:', error);
      res.status(500).send('Произошла ошибка при обработке запроса.');
    }
  }

  async getEmailCode(req, res) {
    const verificationCode = req.params.code;
    const email = req.params.email;

    await mail.checkVerificationCode(email, verificationCode);
    await mail.setUserEmailVerified(email);
    console.log('Email успешно отправлен 2');

    res.send('Аккаунт активирован');
  }

}

module.exports = new User_controller()










