import multer from 'multer';
import path from 'path';

const diskStorage = multer.diskStorage({
    destination: path.join(__dirname, '../images'),
    filename: (req, file, cb) => {
        let uniqueName = `${Date.now()}-ecommerce-${file.originalname}`;
        cb(null, uniqueName);
    },
});

export const fileupload = multer({
    storage: diskStorage,
}).single('image');
