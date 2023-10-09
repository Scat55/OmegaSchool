const express = require('express');
const { body, validationResult } = require('express-validator');
const sqlite3 = require('sqlite3').verbose();
const PORT = process.env.PORT || 8070;

const app = express();

const filepath = './New_database.db';

const db = new sqlite3.Database('./New_database.db', (err) => {
  if (err) {
    console.error('Ошибка при подключении к базе данных:', err.message);
  } else {
    console.log('Подключение к базе данных установлено');
  }
});

app.listen(PORT, () => {
  console.log(`Server starting on ${PORT} port`);
});

console.log('Подключение к базе данных установлено');

// отправка на фронт данный из таблицы users
app.get('/userlist', (req, res) => {
  const query = 'SELECT * FROM users';

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Ошибка при выполнении SQL-запроса:', err.message);
      res.status(500).json({ error: 'Ошибка на сервере' });
      return;
    }

    // Преобразуем результат запроса в формат JSON
    const jsonData = JSON.stringify(rows);

    // Отправляем JSON-данные клиенту
    res.json(jsonData);
  });
});

// Используйте express.json() для обработки JSON-тела запроса
app.use(express.json());

// Обработчик POST-запроса для проверки пользователя в базе данных
app.post('/checkUser', (req, res) => {
  console.log('Запрос получен');

  // Получение логина и пароля из JSON-тела запроса
  const { email, password } = req.body;
  console.log(req.body);

  // SQL-запрос для проверки наличия пользователя
  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  const values = [email, password];
  db.get(query, values, (err, row) => {
    if (err) {
      console.error('Ошибка при выполнении SQL-запроса:', err.message);
      res.status(500).json({ error: 'Ошибка на сервере' });
      return;
    }

    if (row) {
      console.log(`Пользователь ${email} найден в базе данных`);
      res.json({ message: 'Пользователь найден' });
    } else {
      console.log(`Пользователь ${email} не найден в базе данных`);
      res.json({ message: 'Пользователь не найден' });
    }
  });
});

//добавление пользователя

app.post(
  '/addUser',
  [
    // Валидация email
    body('email').isEmail(),
    // Валидация пароля
    body('password').isLength({ min: 8, max: 30 }),
    // Валидация пола
    body('gender').isIn(['Женский', 'Мужской']),
    // Валидация типа пользователя
    body('type_user').isIn(['Ученик', 'Учитель', 'Эксперт']),
  ],
  (req, res) => {
    console.log('Запрос на добавление пользователя получен');

    // Проверяем наличие ошибок валидации
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Ошибка валидации' });
    }

    // Получение данных пользователя из JSON-тела запроса
    const { email, password, gender, type_user } = req.body;

    // SQL-запрос для проверки уникальности email
    const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
    const checkEmailValues = [email];

    // Проверка, существует ли пользователь с таким email
    db.get(checkEmailQuery, checkEmailValues, (err, row) => {
      if (err) {
        console.error('Ошибка при выполнении SQL-запроса:', err.message);
        res.status(500).json({ error: 'Ошибка на сервере' });
        return;
      }

      // Если найден пользователь с таким email, вернуть ошибку
      // TODO: Коль, можешь убрать статус 400 и просто возвращать сообщение // сделано
      if (row) {
        console.log(`Пользователь с email ${email} уже существует`);
        res.json({ masage : 'Пользователь с email уже существует' });
        return;
      }

      // Если email уникален, выполнить добавление пользователя
      const insertUserQuery =
        'INSERT INTO users (email, password, gender, type_user) VALUES (?, ?, ?, ?)';
      const insertUserValues = [email, password, gender, type_user];

      db.run(insertUserQuery, insertUserValues, function (err) {
        if (err) {
          console.error('Ошибка при выполнении SQL-запроса:', err.message);
          res.status(500).json({ error: 'Ошибка на сервере' });
          return;
        }

        console.log(`Пользователь ${email} успешно добавлен`);
        res.json({ message: 'Пользователь успешно добавлен' });
      });
    });
  },
);

//TODO: hjhhjhhj

app.get('/getUserID/:email', (req, res) => {
  const email = req.params.email;

  // SQL-запрос для получения user_id по адресу электронной почты
  const sql = 'SELECT user_id FROM users WHERE email = ?';

  db.get(sql, [email], (err, row) => {
    if (err) {
      console.error('Ошибка при выполнении SQL-запроса:', err.message);
      res.status(500).json({ error: 'Ошибка на сервере' });
      return;
    }

    if (row && row.user_id) {
      console.log(`User ID для пользователя с email ${email} найден: ${row.user_id}`);
      res.json({ user_id: row.user_id });
    } else {
      console.log(`User ID для пользователя с email ${email} не найден`);
      res.status(404).json({ message: 'User ID не найден' });
    }
  });
});

app.get('/getUser/:user_id', (req, res) => {
  const user_id = req.params.user_id;

  // SQL-запрос для получения данных пользователя по ID
  const sql = 'SELECT * FROM users WHERE user_id = ?';

  db.get(sql, [user_id], (err, row) => {
    if (err) {
      console.error('Ошибка при выполнении SQL-запроса:', err.message);
      res.status(500).json({ error: 'Ошибка на сервере' });
      return;
    }

    if (row) {
      console.log(`Пользователь с ID ${user_id} найден`);
      res.json({ user: row });
    } else {
      console.log(`Пользователь с ID ${user_id} не найден`);
      res.status(404).json({ message: 'Пользователь не найден' });
    }

    // Выполните запрос для получения данных об достижениях
    db.get(achievementsSql, [user_id], (achievementsErr, achievementsRow) => {
      if (achievementsErr) {
        console.error('Ошибка при выполнении SQL-запроса для достижений:', achievementsErr.message);
        res.status(500).json({ error: 'Ошибка на сервере' });
        return;
      }

      // Выполните запрос для получения данных оценок пользователя (используя db.all)
      db.all(gradesSql, [user_id], (gradesErr, gradesRows) => {
        if (gradesErr) {
          console.error('Ошибка при выполнении SQL-запроса для оценок:', gradesErr.message);
          res.status(500).json({ error: 'Ошибка на сервере' });
          return;
        }

        // Соедините результаты обоих запросов в один объект
        const userData = {
          user: userRow,
          achievements: achievementsRow,
          grades: gradesRows, // Используйте gradesRows для всех оценок
        };

        console.log(`Данные для пользователя с ID ${user_id} найдены`);
        res.json(userData);
      });
    });
  });
});

// Маршрут для вставки дополнительных данных пользователя
app.post('/additionalData', (req, res) => {
  // Получите данные из тела запроса
  const { user_id, first_name, last_name, patronymic, birthdate, classes } = req.body;
  console.log(req.body);
  // Вставка данных в таблицу users
  const sql = `UPDATE users 
               SET first_name = ?, last_name = ?, patronymic = ?, birthdate = ? ,classes = ?
               WHERE user_id = ?; s`;

  db.run(sql, [first_name, last_name, patronymic, birthdate, classes, user_id], function (err) {
    if (err) {
      console.error('Ошибка при вставке данных:', err.message);
      res.status(500).json({ message: 'Произошла ошибка при вставке данных' });
    } else {
      console.log('Дополнительные данные успешно вставлены');
      res.status(200).json({ message: 'Дополнительные данные успешно добавлены' });
    }
  });
});
