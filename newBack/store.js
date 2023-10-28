const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {join} = require("path");
const {transcode} = require("buffer");

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
                const today = new Date();
                const year = today.getFullYear().toString();
                const month = (today.getMonth() + 1).toString().padStart(2, '0');
                const day = today.getDate().toString().padStart(2, '0');
                file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8')
                const filename = `${day}_${month}_${year}_${req.user_id}_${file.originalname}`;
                cb(null, filename);
            },
        });

        // Объект Multer для обработки загрузки файлов
        this.upload = multer({
            storage: this.storage,
            fileFilter: (req, file, cb) => {
                const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
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

        // Функция, которая будет генерировать путь к папке, в которую будут сохраняться загруженные файлы
        this.getUploadsPath = () => {

            const today = new Date();
            const year = today.getFullYear().toString();
            const month = (today.getMonth() + 1).toString().padStart(2, '0');
            const day = today.getDate().toString().padStart(2, '0');
            return path.join(__dirname, 'uploads', `${year}`);
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
            '[': '_',
            ']': '_',
            '{': '_',
            '}': '_',
        };

        return text.split('').map(char => { return rusToEngTranslit[char] || char;}).join('');
    }

}

// class InitFile {
//     constructor() {
//         this.init = (req, res) => {
//             try {
//                 const fileNames = req.params.file_names.split(','); // Преобразование строки в массив имен файлов
//                 console.log(fileNames);
//
//                 const user_id = req.user_id;
//                 console.log(user_id);
//
//                 const math_path = join('./uploads', `${user_id}`);
//                 console.log(math_path);
//
//             } catch (error) { return res.status(500).send({message: 'Ошибка инициализации файла'}); }
//         }
//
//         this.read = (req, res) => {
//             try {
//                 const files = fs.readdirSync(math_path);
//                 // Проверка, соответствует ли какое-либо из имен файлов
//                 const userFiles = files.filter((fileName) => { return fileNames.some(name => fileName.includes(name)); });
//
//                 if (userFiles.length === 0) { return res.status(404).send({message: 'Файлы не найдены'}); }
//
//             } catch (error) { return res.status(500).send({message: 'Ошибка сервера'}); }
//         }
//     }
// }

module.exports = new Store();
// module.exports = new InitFile();
