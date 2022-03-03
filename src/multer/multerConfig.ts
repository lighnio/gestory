import multer from 'multer';
import path from 'path';

const diskstorage = multer.diskStorage({
    destination: path.join(__dirname, '../images'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-monkeywit-' + file.originalname);
    },
});

export const fileUpload = multer({
    storage: diskstorage,
}).single('img');
