const nodemailer = require('nodemailer');
const db = require('./db')
const crypto = require('crypto');
const bcrypt = require("bcryptjs");
class Mail {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'omegalspu@gmail.com', // Ваша почта
                pass: 'lueb vjew cupn qlvf' // Ваш пароль
            }
        });

        // Функция для сохранения кода подтверждения в базе данных
        this.saveVerificationCode = async (user_id, verificationCode) => {
            // Здесь вам нужно будет использовать вашего клиента базы данных для сохранения кода
            const query = 'UPDATE users SET verification_code = $1 WHERE user_id = $2';
            await db.query(query, [verificationCode, user_id]);
        }

        // Функция для проверки кода подтверждения
        this.checkVerificationCode = async (user_id, verificationCode) => {
            // Получение кода из базы данных и его проверка
            const query = 'SELECT verification_code FROM users WHERE user_id = $1';
            const result = await db.query(query, [user_id]);
            if (result.rows.length > 0) { return result.rows[0].verification_code === verificationCode; }

            return false;
        }

        // Функция для установки статуса email на "подтвержденный"
        this.setUserEmailVerified = async (user_id) => {
            const query = 'UPDATE users SET verification_code = TRUE WHERE user_id = $1';
            await db.query(query, [user_id]);
        }

    }

    generateVerificationCode(user_id) {
        const saltRounds = 10; // Уровень соли
        return bcrypt.hash(user_id, saltRounds);
    }
}

module.exports = new Mail();