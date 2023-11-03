const express = require('express')
const session = require('express-session');
const nodemailer = require('nodemailer');
const app = express();
// const cors = require('cors');

const userRouter = require('./routes/user.routes')
const authRouter = require('./routes/auth.routes')

const {secret} = require('./config')

const PORT = process.env.PORT || 8070
// const IP = '0.0.0.0'



// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true
}));




const transporter = nodemailer.createTransport({
    service: 'gmail', // Используйте вашу почтовую службу
    auth: {
        user: 'omegalspu@gmail.com', // Ваша почта
        pass: '159456omega' // Ваш пароль
    }
});


// Функция для отправки письма с подтверждением
async function sendVerificationEmail(userEmail, userId) {
    const verificationCode = generateVerificationCode(); // Функция для генерации кода
    const mailOptions = {
        from: 'omegalspu@gmail.com',
        to: userEmail,
        subject: 'Подтверждение Email',
        html: `Пожалуйста, кликните <a href="http://yourdomain.com/verify-email?code=${verificationCode}&user=${userId}">здесь</a>, чтобы подтвердить ваш email.`
    };

    // Сохранение кода верификации в базу данных
    await saveVerificationCode(userId, verificationCode);

    // Отправка письма
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
app.get('/verify-email', async (req, res) => {
    const { code, user } = req.query;
    const isValid = await checkVerificationCode(user, code);
    if (isValid) {
        await setUserEmailVerified(user);
        res.send('Email успешно подтвержден!');
    } else {
        res.status(400).send('Неверный код подтверждения.');
    }
});
function generateVerificationCode() {
    return crypto.randomBytes(16).toString('hex');
}

// Функция для сохранения кода подтверждения в базе данных
async function saveVerificationCode(userId, verificationCode) {
    // Здесь вам нужно будет использовать вашего клиента базы данных для сохранения кода
    // Например, с использованием клиента PostgreSQL pg:
    const query = 'UPDATE users SET verification_code = $1 WHERE user_id = $2';
    await db.query(query, [verificationCode, userId]);
}

// Функция для проверки кода подтверждения
async function checkVerificationCode(userId, verificationCode) {
    // Получение кода из базы данных и его проверка
    const query = 'SELECT verification_code FROM users WHERE user_id = $1';
    const result = await db.query(query, [userId]);
    if (result.rows.length > 0) {
        return result.rows[0].verification_code === verificationCode;
    }
    return false;
}

// Функция для установки статуса email на "подтвержденный"
async function setUserEmailVerified(userId) {
    const query = 'UPDATE users SET email_verified = TRUE WHERE user_id = $1';
    await db.query(query, [userId]);
}



app.use('/api', userRouter)
app.use('/auth', authRouter)

const customHeadersAppLevel = function (req, res, next) {
    req.headers['Custom-UUID'] = ''; // Устанавливаем кастомный заголовок 'Custom-UUID' с вашим UUID
    next();
};

app.use(customHeadersAppLevel);





app.listen(PORT, ()=>console.log(`server started on port ${PORT} and listen ip`))


