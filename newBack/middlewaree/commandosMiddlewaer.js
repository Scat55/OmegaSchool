const jwt = require('jsonwebtoken');
const { secret } = require('../config');

module.exports = function (req, res, next){

        if (req.method === 'OPTIONS') { next(); }
        try {

            const authorizationHeader = req.headers.authorization;
            if (!authorizationHeader) { return res.status(403).json({ message: 'Пользователь не авторизован1' }); }
            // Теперь вы можете разбирать заголовок, так как он существует
            const tokenFromHeaders = authorizationHeader.split(' ')[1];
            // Извлекаем токен из сессии
            const tokenFromSession = req.session.token;

            //Проверяем, совпадают ли токены
            if (tokenFromHeaders !== tokenFromSession) { return res.status(403).json({ message: 'Пользователь не авторизован2' }); }
            // Проверяем токен и извлекаем роль пользователя
            const { type_user, user_id, email } = jwt.verify(tokenFromHeaders, secret);
            req.user_id = user_id
            req.type_user = type_user
            req.email = email

            next();
        } catch (e) { console.log(e); return res.status(403).json({ message: 'Пользователь не авторизован3' }); }
    };
