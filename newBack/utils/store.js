const multer = require('multer');
const path = require('path');
const fs = require('fs');
class Store {
    constructor() {
        // Объект storage, который задает папку для сохранения загруженных файлов и их имена.
        this.storage = multer.diskStorage({
            destination: (req, file, cb) => {
                const uploadsPath = path.join('uploads', `${req.user_id}`);
                if (!fs.existsSync(uploadsPath)) { fs.mkdirSync(uploadsPath, { recursive: true }); }
                cb(null, uploadsPath);
            },
            filename: (req, file, cb) => {
                file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8')
                const filename = `${file.originalname}`;
                cb(null, filename);
            },
        });

        // Объект Multer для обработки загрузки файлов
        this.upload = multer({
            storage: this.storage,
            fileFilter: (req, file, cb) => {
                const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
                if (!allowedTypes.includes(file.mimetype)) {
                    const error = new Error('Неподдерживаемый тип файлов. Выберите из pdf, jpeg, png, msword.');
                    error.statusCode = 400;
                    return cb(error, false);
                }
                cb(null, true);
            },
        });
    }

}

module.exports = new Store();
