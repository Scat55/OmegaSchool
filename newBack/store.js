const multer = require('multer');
const path = require('path');
const fs = require('fs');

class Store {
    constructor() {
        // Функция, которая будет генерировать путь к папке, в которую будут сохраняться загруженные файлы
        this.getUploadsPath = () => {

            const today = new Date();
            const year = today.getFullYear().toString();
            const month = (today.getMonth() + 1).toString().padStart(2, '0');
            const day = today.getDate().toString().padStart(2, '0');
            return path.join(__dirname, 'uploads', `${year}`);
        };

        // Объект storage, который задает папку для сохранения загруженных файлов и их имена.
        this.storage = multer.diskStorage({
            destination: (req, file, cb) => {
                const uploadsPath = this.getUploadsPath();
                if (!fs.existsSync(uploadsPath)) {
                    fs.mkdirSync(uploadsPath, { recursive: true });
                }
                cb(null, uploadsPath);
            },
            filename: (req, file, cb) => {
                const today = new Date();
                const year = today.getFullYear().toString();
                const month = (today.getMonth() + 1).toString().padStart(2, '0');
                const day = today.getDate().toString().padStart(2, '0');
                const filename = `${day}_${month}_${year}_${this.transliterate(file.originalname)}`;
                cb(null, filename);
            },
        });

        // Объект Multer для обработки загрузки файлов
        this.upload = multer({
            storage: this.storage,
            fileFilter: (req, file, cb) => {
                const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/msword'];
                if (!allowedTypes.includes(file.mimetype)) {
                    const error = new Error('Неподдерживаемый тип файлов. Выберите из pdf, jpeg, png, msword.');
                    error.statusCode = 400;
                    return cb(error, false);
                }
                cb(null, true);
            },
        });

        // Middleware checkReferer для проверки referer адреса
        this.checkReferer = (req, res, next) => {
            const allowedReferers = ['http://localhost:8070/api/upload/', 'http://localhost:8070/api/uploads/'];
            const referer = req.get('referer');
            if (!allowedReferers.includes(referer)) {
                return res.status(401).send('Unauthorized');
            }
            next();
        };
    }

    transliterate(text) {
        const rusToEngTranslit = {
            а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'yo',
            ж: 'zh', з: 'z', и: 'i', й: 'y', к: 'k', л: 'l', м: 'm',
            н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u',
            ф: 'f', х: 'kh', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'sch', ы: 'y',
            э: 'e', ю: 'yu', я: 'ya',
            ' ': '_',
        };

        return text.split('').map(char => { return rusToEngTranslit[char] || char;}).join('');
    }

}

module.exports = new Store();
