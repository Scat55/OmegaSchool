const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const transliteration = require('transliteration');

class Store {
    constructor() {
        // Объект storage, который задает папку для сохранения загруженных файлов и их имена.
        this.storage = multer.diskStorage({
            destination: async (req, file, cb) => {
                const uploadsPath = path.join('uploads', `${req.user_id}`);
                if (!await fs.access(uploadsPath).then(() => true).catch(() => false)) {
                    await fs.mkdir(uploadsPath, { recursive: true });
                }
                cb(null, uploadsPath);
            },
            filename: async (req, file, cb) => {
                try {
                    // file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
                    // const sanitizedFileName = this.transliterate(file.originalname);
                    const sanitizedFileName = file.originalname;
                    const filename = `${sanitizedFileName}`;
                    cb(null, filename);
                } catch (error) {
                    cb(error);
                }
            },
        });

        // Объект Multer для обработки загрузки файлов
        this.upload = multer({
            storage: this.storage
        });

        this.required_files = (req) => {
            if (!req.files || req.files.length === 0) {
                throw new Error('Пожалуйста, загрузите файл');
            }
        };

        this.work_with_files = (req) => {
            try {
                let pdfFiles = [];
                let imageFiles = [];
                for (const file of req.files) {
                    if (file.mimetype === 'application/pdf') {
                        pdfFiles.push(file.originalname);
                    } else if (file.mimetype.startsWith('image/')) {
                        imageFiles.push(file.originalname);
                    }
                }
                // Объединить имена файлов через запятую
                const pdfPath = pdfFiles.join(',');
                const imgPath = imageFiles.join(',');
                // Возвращаем значения
                return { pdfPath, imgPath };
            } catch (error) {
                throw new Error(error);
            }
        };

        this.transliterate = (text) => {
            return transliteration.transliterate(text);
        };
    }
}

module.exports = new Store();
