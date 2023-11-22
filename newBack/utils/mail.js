const nodemailer = require('nodemailer');
const db = require('../db')
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
        this.saveVerificationCode = async (email, verificationCode) => {
            // Здесь вам нужно будет использовать вашего клиента базы данных для сохранения кода
            const query = 'UPDATE users SET verification_code = $1 WHERE email = $2';
            await db.query(query, [verificationCode, email]);
        }

        // Функция для проверки кода подтверждения
        this.checkVerificationCode = async (email, verificationCode) => {
            // Получение кода из базы данных и его проверка
            const query = 'SELECT verification_code FROM users WHERE email = $1';
            const result = await db.query(query, [email]);
            if (result.rows.length > 0) { return result.rows[0].verification_code === verificationCode; }

            return false;
        }

        // Функция для установки статуса email на "подтвержденный"
        this.setUserEmailVerified = async (email) => {
            const query = 'UPDATE users SET verification_code = TRUE WHERE email = $1';
            await db.query(query, [email]);
        }
    }

    async generateVerificationCode(email) {
        const hashedEmail = await bcrypt.hash(email, 1);

        // Удаляем все специальные символы из хэша
        const verificationCode = hashedEmail.replace(/[/]/g, '');

        return verificationCode;
    }
}

module.exports = new Mail();
