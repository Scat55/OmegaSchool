const express = require('express')
const session = require('express-session');
const cors = require('cors');
const pgSession = require('connect-pg-simple')(session);
const {pool} = require('./db');
const { secret } = require('./config')

const app = express();
app.set('port', process.env.PORT || 8070);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  store: new pgSession({ pool: pool, tableName: 'session', }),
  secret: secret, // Замените на свой секретный ключ
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // Продолжительность сессии в миллисекундах
}));

app.use('/api', require("./routes/user.routes"))
app.use('/auth', require('./routes/auth.routes'))
app.use('/commands', require('./routes/comandos.routes'))




const customHeadersAppLevel = function (req, res, next) { req.headers['Custom-UUID'] = ''; next(); };
app.use(customHeadersAppLevel);

app.listen(app.get('port'), () => { console.log(`Server listening on port ${app.get('port')}`); });