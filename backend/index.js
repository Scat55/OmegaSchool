const express = require('express');

const multer = require('multer');
const fs = require('fs');
const path = require('path');
//добавление пользователя
const bcrypt = require('bcrypt');
const saltRounds = 7; // Количество "соли", чем выше, тем безопаснее, но медленнее

const { body, validationResult } = require('express-validator');
const sqlite3 = require('sqlite3').verbose();
const PORT = process.env.PORT || 8070;
// Используйте express.json() для обработки JSON-тела запроса
app.use(express.json());

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

// app.get('/userlist', (req, res) => {
//   const query = 'SELECT * FROM users';
//
//   db.all(query, [], (err, rows) => {
//     if (err) {
//       console.error('Ошибка при выполнении SQL-запроса:', err.message);
//       res.status(500).json({ error: 'Ошибка на сервере' });
//       return;
//     }
//
//     // Преобразование результатов запроса в формат JSON
//     const usersWithHashedPasswords = rows.map((user) => {
//       // Здесь можно добавить хеширование пароля, если он не был хеширован ранее
//       if (!user.password.startsWith('$2b$')) {
//         const hashedPassword = bcrypt.hashSync(user.password, saltRounds); // Здесь 10 - стоимость хеширования
//         user.password = hashedPassword;
//       }
//       return user;
//     });
//
//     // Отправляем JSON-данные клиенту
//     res.json(usersWithHashedPasswords);
//   });
// });

// app.post('/checkUser', (req, res) => {
//   console.log('Запрос получен');
//
//   // Получение логина и пароля из JSON-тела запроса
//   const { email, password } = req.body;
//   console.log(req.body);
//
//   // SQL-запрос для проверки наличия пользователя
//   const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
//   const values = [email, password];
//   db.get(query, values, (err, row) => {
//     if (err) {
//       console.error('Ошибка при выполнении SQL-запроса:', err.message);
//       res.status(500).json({ error: 'Ошибка на сервере' });
//       return;
//     }
//
//     if (row) {
//       console.log(`Пользователь ${email} найден в базе данных`);
//       res.json({ message: 'Пользователь найден' });
//     } else {
//       console.log(`Пользователь ${email} не найден в базе данных`);
//       res.json({ message: 'Пользователь не найден' });
//     }
//   });
// });
// Обработчик POST-запроса для проверки пользователя в базе данных с хэшом

// app.post('/checkUser', (req, res) => {
//   console.log('Запрос получен');
//
//   // Получение логина и пароля из JSON-тела запроса
//   const { email, password } = req.body;
//
//   // SQL-запрос для получения хешированного пароля по email
//   const query = 'SELECT password FROM users WHERE email = ?';
//   const values = [email];
//   db.get(query, values, (err, row) => {
//     if (err) {
//       console.error('Ошибка при выполнении SQL-запроса:', err.message);
//       res.status(500).json({ error: 'Ошибка на сервере' });
//       return;
//     }
//
//     if (row) {
//       // Сравните хешированный пароль из базы данных с введенным паролем
//       bcrypt.compare(password, row.password, (compareErr, passwordMatch) => {
//         if (compareErr) {
//           console.error('Ошибка при сравнении паролей:', compareErr.message);
//           res.status(500).json({ error: 'Ошибка на сервере' });
//           return;
//         }
//
//         if (passwordMatch) {
//           console.log(`Пользователь ${email} найден в базе данных`);
//           res.json({ message: 'Пользователь найден' });
//         } else {
//           console.log(`Пользователь ${email} не найден в базе данных`);
//           res.json({ message: 'Пользователь не найден' });
//         }
//       });
//     } else {
//       console.log(`Пользователь ${email} не найден в базе данных`);
//       res.json({ message: 'Пользователь не найден' });
//     }
//   });
// });

//добавление пользователя с хэшем
app.post('/addUser',
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
        if (row) {
          console.log(`Пользователь с email ${email} уже существует`);
          res.json({ message: 'Пользователь с email уже существует' });
          return;
        }

        // Хешируем пароль
        bcrypt.hash(password, saltRounds, (hashErr, hash) => {
          if (hashErr) {
            console.error('Ошибка при хешировании пароля:', hashErr.message);
            res.status(500).json({ error: 'Ошибка на сервере' });
            return;
          }

          // Если хеширование прошло успешно, добавляем пользователя
          const insertUserQuery =
              'INSERT INTO users (email, password, gender, type_user) VALUES (?, ?, ?, ?)';
          const insertUserValues = [email, hash, gender, type_user];

          db.run(insertUserQuery, insertUserValues, function (insertErr) {
            if (insertErr) {
              console.error('Ошибка при выполнении SQL-запроса:', insertErr.message);
              res.status(500).json({ error: 'Ошибка на сервере' });
              return;
            }

            console.log(`Пользователь ${email} успешно добавлен`);
            res.json({ message: 'Пользователь успешно добавлен' });
          });
        });
      });
    }
);


//TODO: hjhhjhhj


app.get('/getUserIdForMail/:email', (req, res) => {
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
      res.json({ user_id: row.user_id }); // Отправить user_id в формате JSON
    } else {
      console.log(`User ID для пользователя с email ${email} не найден`);
      res.status(404).json({ message: 'User ID не найден' });
    }
  });
});

app.get('/getUserEmail/:email', (req, res) => {
  const email = req.params.email;

  // SQL-запрос для получения данных пользователя по email
  const userSql = 'SELECT * FROM users WHERE email = ?';
  const achievementsSql = 'SELECT * FROM achievements WHERE user_id = (SELECT user_id FROM users WHERE email = ?)';
  const gradesSql = 'SELECT * FROM student_grades WHERE user_id = (SELECT user_id FROM users WHERE email = ?)';

  db.get(userSql, [email], (err, userRow) => {
    if (err) {
      console.error('Ошибка при выполнении SQL-запроса для пользователя:', err.message);
      res.status(500).json({ error: 'Ошибка на сервере' });
      return;
    }

    if (!userRow) {
      console.log(`Пользователь с email ${email} не найден`);
      res.status(404).json({ message: 'Пользователь не найден' });
      return;
    }

    // Выполните запрос для получения данных об достижениях
    db.get(achievementsSql, [email], (achievementsErr, achievementsRow) => {
      if (achievementsErr) {
        console.error('Ошибка при выполнении SQL-запроса для достижений:', achievementsErr.message);
        res.status(500).json({ error: 'Ошибка на сервере' });
        return;
      }

      // Выполните запрос для получения данных оценок пользователя (используя db.all)
      db.all(gradesSql, [email], (gradesErr, gradesRows) => {
        if (gradesErr) {
          console.error('Ошибка при выполнении SQL-запроса для оценок:', gradesErr.message);
          res.status(500).json({ error: 'Ошибка на сервере' });
          return;
        }

        // Соедините результаты обоих запросов в один объект
        const userData = {
          user: userRow,
          grades: gradesRows,
          achievements: achievementsRow,
        };

        console.log(`Данные для пользователя с email ${email} найдены`);
        res.json(userData);
      });
    });
  });
});


app.get('/getUserIdForInf/:user_id', (req, res) => {
  const user_id = req.params.user_id;

  // SQL-запрос для получения данных пользователя по ID
  const userSql = 'SELECT * FROM users WHERE user_id = ?';
  const gradesSql = 'SELECT * FROM student_grades WHERE user_id = ?';
  const achievementsSql = 'SELECT * FROM achievements WHERE user_id = ?';

  db.get(userSql, [user_id], (err, userRow) => {
    if (err) {
      console.error('Ошибка при выполнении SQL-запроса для пользователя:', err.message);
      res.status(500).json({ error: 'Ошибка на сервере' });
      return;
    }

    if (!userRow) {
      console.log(`Пользователь с ID ${user_id} не найден`);
      res.status(404).json({ message: 'Пользователь не найден' });
      return;
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
          grades: gradesRows,
          achievements: achievementsRow,
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


// Настройка местоположения для сохранения загруженных файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Укажите путь к каталогу для хранения файлов
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Генерируйте уникальное имя файла
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Обработка загрузки файлов
app.post('/upload', upload.single('file'), (req, res) => {
  // В этой функции вы можете обработать загруженный файл
  res.send('Файл успешно загружен.');
});
app.get('/upload', upload.single('file'), (req, res) => {
  // В этой функции вы можете обработать загруженный файл
  res.send('Файл успешно загружен.');
});

// Устанавливаем путь к директории, в которой хранятся файлы
const fileDirectory = 'uploads/';

app.get('/download/:filename', (req, res) => {
  // Получаем имя файла из параметра URL
  const requestedFilename = req.params.filename;

  // Проверяем, есть ли файл с полным или частичным именем
  fs.readdir(fileDirectory, (err, files) => {
    if (err) {
      return res.status(500).send('Ошибка сервера');
    }

    // Ищем файл с частичным совпадением имени
    const foundFile = files.find((file) => file.includes(requestedFilename));

    if (foundFile) {
      // Формируем полный путь к найденному файлу
      const filePath = path.join(fileDirectory, foundFile);

      // Проверяем расширение файла
      const fileExtension = path.extname(filePath).toLowerCase();

      if (fileExtension === '.txt') {
        // Если расширение .txt, отправляем его содержимое как текст
        fs.readFile(filePath, 'utf8', (err, data) => {
          if (err) {
            res.status(500).send('Ошибка при чтении файла');
          } else {
            res.header('Content-Type', 'text/plain');
            res.send(data);
          }
        });
      } else {
        // Иначе отправляем файл для скачивания
        res.download(filePath, (err) => {
          if (err) {
            // Если произошла ошибка при отправке файла, обрабатываем её
            res.status(404).send('Файл не найден');
          }
        });
      }
    } else {
      res.status(404).send('Файл не найден');
    }
  });
});