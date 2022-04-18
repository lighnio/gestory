"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUpload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const diskstorage = multer_1.default.diskStorage({
    destination: path_1.default.join(__dirname, '../images'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-dressU-' + file.originalname);
    },
});
exports.fileUpload = (0, multer_1.default)({
    storage: diskstorage,
}).single('img');
