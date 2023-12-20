const db = require('../db')
const fs = require('fs');
const path = require('path');
const { resolve, join } = require("path");
const archiver = require('archiver');
const { v4: uuidv4 } = require('uuid');
const store = require("../utils/store");
const { statSync, existsSync, createReadStream, readdirSync } = require('fs');
const mime = require('mime-types');
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

  async getTasksForExpert(req, res) {
    try {
      const user_id = req.user_id;
      // Запрос для level_1_tests
      const level1TestsSql = `
SELECT *
FROM level_1_tests
WHERE
  (
    (ver_1_id IS NULL AND ver_2_id IS NULL) OR
    (ver_1_id IS NULL AND ver_2_id != $1) OR 
    (ver_1_id != $1 AND ver_2_id IS NULL)
  )
  AND user_id != $1
        `;
      // Запрос для level_2_tests
      const level2TestsSql = `
SELECT *
FROM level_2_tests
WHERE
  (
    (ver_1_id IS NULL AND ver_2_id IS NULL) OR
    (ver_1_id IS NULL AND ver_2_id != $1) OR 
    (ver_1_id != $1 AND ver_2_id IS NULL)
  )
  AND user_id != $1
        `;
      // Запрос для level_3_tests
      const level3TestsSql = `
SELECT *
FROM level_3_tests
WHERE
  (
    (ver_1_id IS NULL AND ver_2_id IS NULL) OR
    (ver_1_id IS NULL AND ver_2_id != $1) OR 
    (ver_1_id != $1 AND ver_2_id IS NULL)
  )
  AND user_id != $1
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
      const user_id = req.user_id; // Assuming that user_id has already been extracted from the token
      const available_level = req.available_level; // Assuming available_level is available in the token
      const user_type = req.type_user;

      if (user_type === 'Учитель' || user_type === 'Эксперт') {
        const distinctTestIdsSql = `
        SELECT DISTINCT test_id, test_level
        FROM student_solutions;
      `;

        const distinctTestIdsResult = await db.query(distinctTestIdsSql);
        const distinctTestIds = distinctTestIdsResult.rows;

        console.log(distinctTestIds);

        const testNames = await Promise.all(distinctTestIds.map(async (test) => {
          if (test.test_level !== undefined) { // Check if test_level is defined
            const levelTestSql = `
            SELECT task_test, classes, subject, likes
            FROM level_${test.test_level}_tests
            WHERE test_id = $1  ;
          `;

            const levelTestResult = await db.query(levelTestSql, [test.test_id]);

            if (levelTestResult.rows.length > 0) {
              const testDetails = levelTestResult.rows[0];
              return {
                id: test.test_id,
                complexity: test.test_level,
                title: testDetails.task_test,
                class: testDetails.classes,
                topic: testDetails.subject,
                likes: testDetails.likes,
                status: 'Не решено'
              };
            } else {
              return {
                id: test.test_id,
                complexity: test.test_level,
                title: 'Название не найдено',
                class: 'Класс не найден',
                topic: 'Предмет не найден',
                likes: 0
              };
            }
          } else {
            console.error('test_level is undefined for test_id:', test.test_id);
            return null; // You can handle this case accordingly
          }
        }));

        // Remove potential null entries caused by undefined test_level
        const filteredTestNames = testNames.filter(test => test !== null);

        // Send the result
        res.json(filteredTestNames);
      }else
      {


        // Define the base SQL query
        const baseSql = `
      SELECT test_id, test_level, decided
      FROM student_solutions
      WHERE user_id = $1 AND test_level <= $2
      ORDER BY created_at DESC;
    `;

        // Execute the query
        const studentTestsResult = await db.query(baseSql, [user_id, available_level]);

        // Fetch details for each test
        const testNames = await Promise.all(studentTestsResult.rows.map(async (test) => {
          const levelTestSql = `
        SELECT task_test, classes, subject, likes
        FROM level_${test.test_level}_tests
        WHERE test_id = $1;
      `;

          const levelTestResult = await db.query(levelTestSql, [test.test_id]);

          if (levelTestResult.rows.length > 0) {
            const testDetails = levelTestResult.rows[0];
            return {
              id: test.test_id,
              complexity: test.test_level,
              title: testDetails.task_test,
              class: testDetails.classes,
              topic: testDetails.subject,
              likes: testDetails.likes,
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

      // Send the result
      res.json(testNames);
      }
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
    const {testId, student_solution} = req.body;
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
      const { pdfPath, imgPath } = store.work_with_files(req, res);
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

  async getAnswerByStudentText2_3(req, res){
      const userId = req.user_id;
      const {testId, student_solution} = req.body;
      const insertOptionsSql = `UPDATE student_solutions SET student_solution = $3 WHERE user_id = $1 AND test_id = $2;`;
      await db.query(insertOptionsSql, [userId, testId, student_solution]);
      res.status(200).json({ message: 'Ответы успешно сохранены' },);
  }
  async getAnswerByStudentFile2_3(req,res){
      const userId = req.user_id;
      const testId= req.params.testID;
      const { pdfPath, imgPath } = store.work_with_files(req, res);
      console.log(testId)
      const updateQuery = `UPDATE student_solutions SET add_file_by_student = $1, add_img_by_student = $2 WHERE test_id = $3 and user_id = $4`;
      const updateValues = [pdfPath, imgPath, testId, userId];
      await db.query(updateQuery, updateValues);
      res.status(200).json({ message: 'Ответы и файлы успешно сохранены' });
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
      const { pdfPath, imgPath } = store.work_with_files(req, res);
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
    const typeUser = req.type_user;
    const userId = req.user_id;
    let decidedStatus;
    try {
      let test;
      let testLevel;
      let testQuery;
      let additionalFields = [];
      const questionsQuery = 'SELECT * FROM questions WHERE test_id = $1';
      const questionsResult = await db.query(questionsQuery, [testId]);
      // Check test level in level_1_tests
      testQuery = 'SELECT * FROM level_1_tests WHERE test_id = $1';
      let testResult = await db.query(testQuery, [testId]);
      if (testResult.rowCount > 0) {
        test = testResult.rows[0];
        testLevel = '1';
        if (typeUser === "Учитель" || typeUser === "Эксперт") {
          additionalFields.push('ver_1', 'ver_1_masseg', 'ver_2', 'ver_2_masseg');
        }
      } else {
        // Check test level in level_2_tests
        testQuery = 'SELECT * FROM level_2_tests WHERE test_id = $1';
        testResult = await db.query(testQuery, [testId]);

        if (testResult.rowCount > 0) {
          test = testResult.rows[0];
          testLevel = '2';
          if (typeUser === "Учитель") {
            additionalFields.push('ver_1', 'ver_1_masseg', 'ver_2', 'ver_2_masseg');
          }
        } else {
          // Check test level in level_3_tests
          testQuery = 'SELECT * FROM level_3_tests WHERE test_id = $1';
          testResult = await db.query(testQuery, [testId]);

          if (testResult.rowCount > 0) {
            test = testResult.rows[0];
            testLevel = '3';
            if (typeUser === "Учитель") {
              additionalFields.push('ver_1', 'ver_1_masseg', 'ver_2', 'ver_2_masseg');
            }
          } else {
            // Task not found in any table
            return res.status(404).json({ error: 'Задание не найдено' });
          }
        }
      }
      // Additional query logic for teacher fields can be added here if needed
      const questionsWithOptions = await Promise.all(questionsResult.rows.map(async (question) => {
        const optionsQuery = 'SELECT text, is_correct FROM options WHERE question_id = $1';
        const optionsResult = await db.query(optionsQuery, [question.question_id]);
        // Map the options and conditionally include 'is_correct' and 'decided'
        const options = optionsResult.rows.map(option => {
          const optionObj = { text: option.text };
          if (typeUser === "Ученик") { optionObj.decided = decidedStatus; }
          if (!(typeUser === "Ученик" && decidedStatus)) {
            // Include 'is_correct' only for other user types or if decidedStatus is false
            optionObj.is_correct = option.is_correct;
          }
          return optionObj;
        });
        return options;
      }));
      const flattenedOptions = questionsWithOptions.flat();
      const decidedQuery = 'SELECT decided FROM student_solutions WHERE user_id = $1 AND test_id = $2';
      const decidedResult = await db.query(decidedQuery, [userId, testId]);
      if (decidedResult.rowCount > 0) {
        // If the record is found, use its status
        decidedStatus = decidedResult.rows[0].decided;
      } else {
        // If the record is not found, you can set a default value or handle it as an error
        decidedStatus = false; // or another default value
      }
      // Formatting the final response
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
        //likes: test.likes,
        decided: (typeUser === "Ученик") ? decidedStatus : "Не решено", // добавьте проверку на тип пользователя
      };
      // Add additional fields to the response
      additionalFields.forEach(field => {
        formattedResponse[field] = test[field];
      });
      res.json(formattedResponse);
    } catch (error) {
      console.error('Error executing SQL query:', error.message);
      res.status(500).json({ error: 'Server error' });
    }
  }

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
      if (result.rowCount === 0) { return res.status(404).json({ error: 'Обновление не выполнено или тест уже проверен' }); }
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
      const updateSolutionQuery = ` UPDATE student_solutions SET opt_score = $1, user_id_ver = $2, correct_solution = $3 WHERE user_id = $4 AND test_id = $5 RETURNING test_id;`;
      const result = await db.query(updateSolutionQuery, [opt_score, user_id, text_solution, student_id, testId]);
      if (result.rowCount === 0) { return res.status(404).json({ error: 'Задание не найдено или уже оценено' }); }
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
      const studentTestsSql = `SELECT test_id, test_level, decided, decided, correct_solution,opt_score FROM student_solutions
        WHERE user_id = $1 and decided = 'Решено';`;
      // Выполнение запроса к базе данных
      const studentTestsResult = await db.query(studentTestsSql, [user_id]);
      // Теперь для каждого test_id получим название теста из соответствующей таблицы
      const testNames = await Promise.all(studentTestsResult.rows.map(async (test) => {
        const levelTestSql = `SELECT task_test, classes, subject FROM level_${test.test_level}_tests WHERE test_id = $1;`;
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

  async likeToDeskriotion(req, res) {

    try {
      const test_id = req.params.testID;
      const user_id = req.user_id; // Получение user id из токена
      const user_type = req.type_user;

      // Проверка, есть ли уже запись с лайком для данного пользователя и теста
      const existingLikeCheckSql = `
      SELECT * FROM student_solutions WHERE test_id = $1 AND user_id = $2 and likes > 0;
    `;

      const existingLikeCheckResult = await db.query(existingLikeCheckSql, [test_id, user_id]);

      if (existingLikeCheckResult.rows.length === 0) {
        // SQL для увеличения количества лайков
        const updateLikesSql = `
        UPDATE student_solutions 
        SET likes = 1 
        WHERE test_id = $1 AND user_id = $2;
      `;

        // Увеличение лайков для теста, только если записи не существует
        await db.query(updateLikesSql, [test_id, user_id]);
        res.json({ success: 'Лайк добавлен' });
      } else {
        res.json({ success: 'Лайк уже добавлен ранее' });
      }
    } catch (error) {
      console.error('Ошибка при выполнении SQL-запроса:', error.message);
      res.status(500).json({ error: 'Ошибка на сервере' });
    }
  }

  async getTasksForTeacher(req, res) {
    try {
      const user_id = req.user_id;
      // Запрос для level_1_tests
      const level1TestsSql = `SELECT * FROM level_1_tests WHERE (user_id = $1);`;
      // Запрос для level_2_tests
      const level2TestsSql = `
            SELECT *
            FROM level_2_tests
            WHERE user_id = $1;
        `;
      // Запрос для level_3_tests
      const level3TestsSql = `SELECT * FROM level_3_tests WHERE user_id = $1;`;
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
      const user_ID = req.user_id;
      // Запрос для получения test_id и user_id, где test_level = 2 или 3
      const TestsSql = `SELECT test_id, user_id FROM student_solutions
            WHERE (student_solution IS NOT NULL) AND (test_level = 2 OR test_level = 3) and (opt_score IS NULL);`;
      // Получаем список test_id и user_id для уровней 2 и 3
      const testIdsResult = await db.query(TestsSql);
      // Формируем ответ, используя полученные test_id и user_id
      const tasks = [];
      for (let row of testIdsResult.rows) {
        const test_id = row.test_id;
        const user_id = row.user_id; // Записываем user_id из результатов запроса
        // Получаем данные для уровня 2
        const level2TestsSql = `SELECT * FROM level_2_tests WHERE test_id = $1 and user_id = $2;`;
        const level2OptionsResult = await db.query(level2TestsSql, [test_id, user_ID]);
        if (level2OptionsResult.rows.length > 0) {
          tasks.push(...level2OptionsResult.rows.map(test => ({
            task_id: test.test_id,
            user_id: user_id, // Добавляем user_id в объект задачи
            task_test: test.task_test,
            level: 2
          })));
        }
        // Получаем данные для уровня 3
        const level3TestsSql = `SELECT * FROM level_3_tests WHERE test_id = $1 and user_id = $2;`;
        const level3OptionsResult = await db.query(level3TestsSql, [test_id, user_ID]);
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
        } else { return res.status(404).json({ error: 'Task not found' }); }
      }
      // Fetch the student's solution
      const studentSolutionsResult = await db.query('SELECT * FROM student_solutions WHERE test_id = $1 AND user_id = $2', [testId, userID]);
      if (studentSolutionsResult.rowCount > 0) {
        studentSolution = studentSolutionsResult.rows[0];
      } else {
        // If no solution is found, you can decide how you want to handle this
        // For example, you might want to return a different message or structure
        studentSolution = { student_solution: undefined };
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
  async addTestAndUpload(req, res) {
    try {
      const { task_test, task_description, classes, options, subject } = req.body;

      const questions = task_test;

      if (!options) {
        return res.status(400).json({ error: 'Options are missing' });
      }

      // const parsedOptions = JSON.parse(options);
      const parsedOptions = options;

      const user_id = req.user_id;

      let testId;


        // If test_id is not provided, insert a new test
        const insertTestQuery = `
        INSERT INTO level_1_tests (user_id, task_test, task_description, add_file, classes, subject, add_img)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING test_id;
      `;
        const testValues = [user_id, task_test, task_description, null, classes, subject, null];
        const testResult = await db.query(insertTestQuery, testValues);
        testId = testResult.rows[0].test_id;


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
        // console.log('option', option)
        // const { text: option_text, checked: is_correct } = option;
        const { option_text, is_correct } = option;
        console.log(option_text, is_correct);
        const insertOptionQuery = `
        INSERT INTO options (text, is_correct, question_id)
        VALUES ($1, $2, $3);
      `;
        const optionValues = [option_text, is_correct, questionId];
        await db.query(insertOptionQuery, optionValues);
      }

      return res.send({ message: 'Тест успешно загружены', testId });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Server error' });
    }
  }

  async addFileTest1(req,res) {
      const testId = req.params.test_id;
      const { pdfPath, imgPath } = store.work_with_files(req, res);
      const updateQuery = `UPDATE level_1_tests SET add_file = $1, add_img = $2 WHERE test_id = $3`;
      const updateValues = [pdfPath, imgPath, testId];
      await db.query(updateQuery, updateValues);
      return res.send({ message: 'Файл успешно загружены' });
  }


  async addFileTest2(req,res) {
    try{
      const testId = req.params.test_id;
      console.log(testId)
      // Update the record in the database with file paths
      const { pdfPath, imgPath } = store.work_with_files(req, res);
      const updateQuery = `
      UPDATE level_2_tests
      SET add_file = $1, add_img = $2
      WHERE test_id = $3;
    `;
      const updateValues = [pdfPath, imgPath, testId];
      await db.query(updateQuery, updateValues);

      return res.send({ message: 'Файл успешно загружены' });
    } catch (error){
      console.error(error.message);
      res.status(500).json({ error: 'Server error' });
    }
  }
  async addFileTest3(req,res) {
    try{
      const testId = req.params.test_id;
      // Update the record in the database with file paths
      const { pdfPath, imgPath } = store.work_with_files(req, res);
      const updateQuery = `
      UPDATE level_3_tests
      SET add_file = $1, add_img = $2
      WHERE test_id = $3;
    `;
      const updateValues = [pdfPath, imgPath, testId];
      await db.query(updateQuery, updateValues);

      return res.send({ message: 'Файл успешно загружены' });
    } catch (error){
      console.error(error.message);
      res.status(500).json({ error: 'Server error' });
    }
  }


  async addTest2AndUpload(req, res) {
    try {
      const { task_test, task_description, task_hint, task_answer, classes, subject } = req.body;
      const user_id = req.user_id;



        // If test_id is not provided, insert a new test
        const insertTestQuery = `
        INSERT INTO level_2_tests (user_id, task_test, task_description, task_hint, task_answer, classes, subject, add_file, add_img)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING test_id;
      `;
        const testValues = [user_id, task_test, task_description, task_hint, task_answer, classes, subject, null, null];
        const testResult = await db.query(insertTestQuery, testValues);
        const testId = testResult.rows[0].test_id;

      return res.send({ message: 'Тест успешно загружены', testId });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Server error' });
    }
  }

  //TODO: реализовать логику добавления аватара
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
      const { task_test, task_description, classes, subject} = req.body;

      const user_id = req.user_id;




        // If test_id is not provided, insert a new test
        const insertTestQuery = `
        INSERT INTO level_3_tests (user_id, task_test, task_description, classes, subject, add_file, add_img)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING test_id;
      `;
        const testValues = [user_id, task_test, task_description, classes, subject, null, null];
        const testResult = await db.query(insertTestQuery, testValues);
        const testId = testResult.rows[0].test_id;


      return res.send({ message: 'Тест успешно загружены', testId });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Server error' });
    }
  }


  //res.fs.unlinkSync(filePath); // Удаление файла
  downloadImage(req, res) {
    try {
      const key = req.headers['custom-uuid'];
      let fileNames = req.params.file_names;

      // Ensure fileNames is an array
      if (!Array.isArray(fileNames)) {
        fileNames = [fileNames];
      }

      console.log(fileNames);

      const mathPath = path.join('./uploads', `${key}/`);
      console.log(mathPath);

      if (!existsSync(mathPath)) {
        return res.status(404).send({ message: 'Каталог пользователя загрузившего файл/ы не найден' });
      }

      const files = readdirSync(mathPath);
      console.log(files);
      const userFiles = files.filter((fileName) => {
        return fileNames.some((name) => fileName.includes(name));
      });

      console.log(userFiles);
      if (userFiles.length === 0) {
        return res.status(404).send({ message: 'Каталог пользователя загрузившего файл/ы существует, но файлы в нем не найдены' });
      }

      // Iterate over each file to determine its type
      for (const file of userFiles) {
        const filePath = join(mathPath, file);
        const fileType = mime.lookup(filePath);

        // Send each image as a separate response
        const fileData = fs.readFileSync(filePath);
        const mimeType = 'image/png';

        res.status(200).send({
          filename: file,
          data: Buffer.from(fileData).toString('base64'),
          contentType: `${mimeType}`,
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: 'Ошибка сервера' });
    }
  }
  downloadFile(req, res) {
    try {
      // Получение ключа пользователя из заголовков запроса
      const key = req.headers['custom-uuid'];
      console.error('key', key);
      // Разбивка строки с именами файлов на массив
      const fileNames = req.params.file_names.split(',');
      console.error('fileNames', fileNames);

      const mathPath = path.join('./uploads', `${key}/`);
      console.log(mathPath);

      if (!existsSync(mathPath)) {
        return res.status(404).send({ message: 'Каталог пользователя загрузившего файл/ы не найден' });
      }

      const files = readdirSync(mathPath);
      console.log(files);
      const userFiles = files.filter((fileName) => {
        return fileNames.some((name) => fileName.includes(name));
      });

      console.log(userFiles);
      if (userFiles.length === 0) {
        return res.status(404).send({ message: 'Каталог пользователя загрузившего файл/ы существует, но файлы в нем не найдены' });
      }

      // Создание архива для скачивания файлов
      const archive = archiver('zip');
      res.attachment('files.zip');

      // Добавление файлов в архив
      userFiles.forEach(fileName => {
        const filePath = path.join(mathPath, fileName);
        archive.file(filePath, { name: fileName });
      });

      // Завершение формирования архива и отправка его пользователю
      archive.finalize();
      archive.pipe(res);
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: 'Ошибка сервера' });
    }
  }

}

module.exports = new User_controller()










