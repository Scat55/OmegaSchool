const jwt = require("jsonwebtoken");
const { secret } = require("../config");

// Middleware для проверки ролей пользователей
module.exports = function (roles) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            // Пропускаем запросы с методом OPTIONS
            next();
        }
        try {
            // Извлекаем токен из заголовков запроса
            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                // Если токен отсутствует, возвращаем ошибку
                console.log(e);
                return res.status(403).json({ message: "Пользователь не авторизован" });
            }
            // Проверяем токен и извлекаем роль пользователя
            const { type_user } = jwt.verify(token, secret);
            if (!roles.includes(type_user)) {
                // Если роль пользователя не совпадает с разрешенными ролями, возвращаем ошибку
                return res.status(403).json({ message: "У вас нет доступа" });
            }
            // Если роль пользователя совпадает с разрешенными ролями, продолжаем выполнение запроса
            next();
        } catch (e) {
            console.log(e);
            // Если произошла ошибка при проверке токена, возвращаем ошибку
            return res.status(403).json({ message: "Пользователь не авторизован" });
        }
    };
};
