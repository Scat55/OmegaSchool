const express = require('express')
const session = require('express-session');
const cors = require('cors');
const pgSession = require('connect-pg-simple')(session);
const db = require('./db');

const userRouter = require('./routes/user.routes')
const authRouter = require('./routes/auth.routes')

const { secret } = require('./config')

const PORT = process.env.PORT || 8070
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(session({
//   secret: secret,
//   resave: false,
//   saveUninitialized: true
// }));

app.use(session({
  store: new pgSession({
    pool: db,
    tableName: 'session', // Название таблицы для хранения сессий
  }),
  secret: secret, // Замените на свой секретный ключ
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // Продолжительность сессии в миллисекундах
}));


app.use('/api', userRouter)
app.use('/auth', authRouter)

const customHeadersAppLevel = function (req, res, next) {
  req.headers['Custom-UUID'] = ''; // Устанавливаем кастомный заголовок 'Custom-UUID' с вашим UUID
  next();
};

app.use(customHeadersAppLevel);

app.listen(PORT, () => console.log(`server started on port ${PORT} and listen ip`))


