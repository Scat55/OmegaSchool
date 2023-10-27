const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        const userDir = path.join('uploads', req.user.user_id.toString());
        const testDir = path.join(userDir, req.body.test_id.toString());

        // Если нет папки пользователя, создайте её
        if (!fs.existsSync(userDir)) {
            fs.mkdirSync(userDir);
        }

        // Если нет папки теста, создайте её
        if (!fs.existsSync(testDir)) {
            fs.mkdirSync(testDir);
        }

        cb(null, testDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

module.exports = multer({ storage: storage });
