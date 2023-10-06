const express = require('express');
const sqlite3 = require("sqlite3").verbose();


const PORT = process.env.PORT || 8070;

const app = express();

const filepath = "./New_database.db";

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
  const { user_name, password } = req.body;
  console.log(req.body)
  // SQL-запрос для проверки наличия пользователя
  const query = 'SELECT * FROM users WHERE user_name = ? AND password = ?';
  const values = [user_name, password];
  console.log(req.body)
  db.get(query, values, (err, row) => {
    if (err) {
      console.error('Ошибка при выполнении SQL-запроса:', err.message);
      res.status(500).json({ error: 'Ошибка на сервере' });
      return;
    }

    if (row) {
      console.log(`Пользователь ${user_name} найден в базе данных`);
      res.json({ message: 'Пользователь найден' });
    } else {
      console.log(`Пользователь ${user_name} не найден в базе данных`);
      res.json({ message: 'Пользователь не найден' });
    }
  });
});



//добавление пользователя

app.post('/addUser', (req, res) => {
  console.log('Запрос на добавление пользователя получен');

  // Получение данных пользователя из JSON-тела запроса
  const { user_name, password } = req.body;

  // SQL-запрос для добавления пользователя
  const query = 'INSERT INTO users (user_name, password) VALUES (?, ?)';
  const values = [user_name, password];

  db.run(query, values, function (err) {
    if (err) {
      console.error('Ошибка при выполнении SQL-запроса:', err.message);
      res.status(500).json({ error: 'Ошибка на сервере' });
      return;
    }

    console.log(`Пользователь ${user_name} успешно добавлен`);
    res.json({ message: 'Пользователь успешно добавлен' });
  });
});

