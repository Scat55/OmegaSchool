const jwt = require('jsonwebtoken');
const { secret } = require('../config');

module.exports = function (roles) {
    return function (req, res, next) {
        if (req.method === 'OPTIONS') {
            // Пропускаем запросы с методом OPTIONS
            next();
        }
        try {
            // Извлекаем токен из заголовков запроса
            const tokenFromHeaders = req.headers.authorization.split(' ')[1];
            if (!tokenFromHeaders) {
                // Если токен отсутствует в заголовках, возвращаем ошибку
                return res.status(403).json({ message: 'Пользователь не авторизован1' });
            }

            // Извлекаем токен из сессии
            const tokenFromSession = req.session.token;

            // Проверяем, совпадают ли токены
            if (tokenFromHeaders !== tokenFromSession) {
                return res.status(403).json({ message: 'Пользователь не авторизован2' });
            }

            // Проверяем токен и извлекаем роль пользователя
            const { type_user } = jwt.verify(tokenFromHeaders, secret);

            if (!roles.includes(type_user)) {
                // Если роль пользователя не совпадает с разрешенными ролями, возвращаем ошибку
                return res.status(403).json({ message: 'У вас нет доступа' });
            }

            // Если роль пользователя совпадает с разрешенными ролями, продолжаем выполнение запроса
            next();
        } catch (e) {
            console.log(e);
            // Если произошла ошибка при проверке токена, возвращаем ошибку
            return res.status(403).json({ message: 'Пользователь не авторизован3' });
        }
    };
};
