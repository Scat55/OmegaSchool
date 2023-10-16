const { validationResult } = require('express-validator')
const {addUser, checkUser} = require('./user_controller')

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {json} = require("express");


class Auth_controller {

    async registration(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { email, password, gender, type_user } = req.body;

            const hashPassword = bcrypt.hashSync(password, 7);

            const user = addUser(email, password, gender, type_user);

            res.status(201).json(password);
        } catch (e) {
            res.status(400).json({ message: 'Ошибка регистрации' });
        }
    }



    async login(req, res) {
        try {
            const { email, password } = req.body;

            const user = checkUser(email, password);

            if (user) {
                const token = jwt.sign({ email }, 'qhksoidbjdsknjdskmdkjcndjdsfldsnxgttwpzmzfwodn1n3udn734h5dsh82hd7h', { expiresIn: '24h' });
                res.status(200).json({ token });
            } else {
                res.status(400).json({ message: 'Введен неверный пароль или пользователь не найден' });
            }
        } catch (e) {
            res.status(400).json({ message: 'Ошибка входа' });
        }
    }

}
module.exports = new Auth_controller()