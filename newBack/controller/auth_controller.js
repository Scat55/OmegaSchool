const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db')
const {secret} = require('../config')
const mail = require("../utils/mail");
const {check} = require("express-validator");

const generateAccesToken = (user_id, type_user, email, available_level) =>{
    const payload = { user_id, type_user, email ,available_level }
    return jwt.sign(payload, secret,  { expiresIn: '24H' })
}

class Auth_controller {
    async registration(req, res) {
        try {
            const { email, password, gender, type_user } = req.body;
            // Проверяем, что email не занят
            const queryResult = await db.query('SELECT * FROM users WHERE email = $1', [email]);
            if (queryResult.rows.length > 0) { return res.status(409).json({ message: 'Пользователь с таким email уже существует' }); }
            // Хешируем пароль
            const hashedPassword = await bcrypt.hash(password, 10);
            // Добавляем пользователя в базу данных
            const insertQuery = `INSERT INTO users (email, password, gender, type_user) VALUES ($1, $2, $3, $4) RETURNING user_id;`;
            const insertResult = await db.query(insertQuery, [email, hashedPassword, gender, type_user]);
            // Генерируем код подтверждения
            const verificationCode = await mail.generateVerificationCode(email);
            console.log('verificationCode', verificationCode)
            // Отправляем письмо с кодом подтверждения для локальной разработки
            // const verificationLink = `http://localhost:8070/auth/${email}/${verificationCode}`;
            // Отправляем письмо с кодом подтверждения для production
            const verificationLink = `https://omega-lspu.ru/auth/${email}/${verificationCode}`;
            await mail.transporter.sendMail({
                from: 'omegalspu@gmail.com', to: email, subject: 'Подтверждение Email',
                html: `Пожалуйста, кликните <a href="${verificationLink}">здесь</a>, чтобы подтвердить ваш email.`
            });
            // Сохраняем код подтверждения в базе данных
            await mail.saveVerificationCode(email, verificationCode);
            return res.status(201).json({ message: 'Пользователь успешно добавлен' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Внутренняя ошибка сервера' });
        }
    }

    async access_email(req, res) {
        try {
            const verificationCode = req.params.verificationCode;
            const email_from_params = req.params.email;

            const queryResult = await db.query('SELECT * FROM users WHERE email = $1', [email_from_params]);
            if (queryResult.rows.length === 0) {
                return res.status(401).json({message: 'Пользователь с таким email не существует'});
            }

            const user = queryResult.rows[0];

            if (user.verification_code === verificationCode) {
                // Код подтверждения совпадает, устанавливаем поле verification_code в значение 'true'
                await db.query('UPDATE users SET verification_code = $1 WHERE email = $2', ['true', email_from_params]);
                return res.status(402).json({message: 'Электронная почта подтверждена. Вы можете войти в личный кабинет'});
            } else {
                // Код подтверждения не совпадает, возвращаем сообщение об ошибке
                return res.status(401).json({message: 'Код подтверждения не совпадает'});
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({message: 'Внутренняя ошибка сервера'});
        }
    }


    async login(req, res) {
        try {
            const {email, password} = req.body;
            // Получаем данные пользователя
            const queryResult = await db.query('SELECT * FROM users WHERE email = $1', [email]);
            if (queryResult.rows.length === 0) { return res.status(401).json({message: 'Неправильная электронная почта'}); }
            const user = queryResult.rows[0];
            // Проверяем совпадение пароля с хешированным паролем
            const passwordMatch = await bcrypt.compare(password, user.password);
            // Если пароль совпадает, проверяем подтверждение email
            if (passwordMatch) {
                if (user.verification_code === 'true') {
                    // Генерируем JWT токен
                    const token = generateAccesToken(user.user_id, user.type_user, user.email, user.available_level);
                    req.session.token = token;

                    return req.session.save(() => { res.json({message: 'Успешная аутентификация', token}); });
                } else {
                    return res.status(401).json({message: 'Электронная почта не подтверждена. Пожалуйста перейдите по ссылке в электронном письме.'});
                }
            } else {return res.status(401).json({message: 'Пароль не совпадает'});}
        } catch (error) {
            console.error(error);
            res.status(500).json({message: 'Внутренняя ошибка сервера'});
        }
    }

}

module.exports = new Auth_controller()