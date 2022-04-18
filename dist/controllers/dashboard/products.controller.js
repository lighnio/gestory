"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductById = exports.saveProduct = exports.createProduct = exports.getProductById = exports.products = void 0;
const db_1 = require("../../database/db");
const getProductByIdHellper_1 = require("../../helpers/products/getProductByIdHellper");
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
// This returns all the products
const products = (req, res) => {
    const fields = 'BIN_TO_UUID( idProduct ) AS idProduct, productName, serialNumber, productPrice, productCategory';
    const query = `SELECT ${fields} from products`;
    db_1.connection.query(query, (err, results) => __awaiter(void 0, void 0, void 0, function* () {
        if (err)
            throw err;
        // @ts-ignore
        const { rol } = req.session.data;
        const data = {
            rol,
            products: results,
            // @ts-ignore
            total: results.length,
        };
        res.render('products', data);
    }));
};
exports.products = products;
// This controller gets a single product
const getProductById = (req, res) => {
    const { loggedIn, data } = req.session;
    if (data) {
        console.log('Sí funciona');
        const { rol } = data;
        const { id } = req.params;
        const fields = 'BIN_TO_UUID(idProduct) AS idProduct, productName, productDescription, serialNumber, productPrice, productCategory, purchasePrice, productImage';
        const query = `SELECT ${fields} FROM products WHERE BIN_TO_UUID(idProduct) = '${id}';`;
        db_1.connection.query(query, (err, results) => {
            if (err)
                throw err;
            let formatedData = JSON.parse(JSON.stringify(results));
            const data = (0, getProductByIdHellper_1.productByIdHelper)(formatedData);
            // const imgProcessed = Buffer.from(img).toString('base64');
            console.log('Antes de renderizar');
            res.render('viewProduct', {
                rol,
                data,
            });
        });
    }
    else {
        res.redirect('/');
    }
};
exports.getProductById = getProductById;
// This function returns the newProduct form
const createProduct = (req, res) => {
    if (req.session.data) {
        // @ts-ignore
        const { rol } = req.session.data;
        if (rol == 'admin') {
            db_1.connection.query(`SELECT category FROM categories`, (err, results) => {
                if (err)
                    throw err;
                let categories = JSON.parse(JSON.stringify(results));
                const responseFormat = {
                    rol,
                    categories,
                };
                res.render('newProduct', responseFormat);
            });
        }
        else {
            res.redirect('/');
        }
    }
    else {
        res.redirect('/');
    }
};
exports.createProduct = createProduct;
// This controller save the image on the db
const saveProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const { name: productName, price: productPrice, category: productCategory, purchase: purchasePrice, description: productDescription, gender: productGender, } = req.body;
    // @ts-ignore
    const productImageType = (_a = req.file) === null || _a === void 0 ? void 0 : _a.mimetype;
    // @ts-ignore
    const productImageName = (_b = req.file) === null || _b === void 0 ? void 0 : _b.originalname;
    const productImage = fs_1.default.readFileSync(
    // @ts-ignore
    (0, path_1.join)(__dirname, '../../images/' + ((_c = req.file) === null || _c === void 0 ? void 0 : _c.filename)));
    const path = (0, path_1.join)(__dirname, '../../images');
    var deleteFolderRecursive = function (path) {
        if (fs_1.default.existsSync(path)) {
            fs_1.default.readdirSync(path).forEach(function (file) {
                ``;
                var curPath = path + '/' + file;
                if (fs_1.default.lstatSync(curPath).isDirectory()) {
                    // recurse
                    deleteFolderRecursive(curPath);
                }
                else {
                    // delete file
                    fs_1.default.unlinkSync(curPath);
                }
            });
            fs_1.default.rmdirSync(path);
        }
    };
    const query = `INSERT INTO products SET ?`;
    yield db_1.connection.query(query, {
        productName,
        productDescription,
        productPrice,
        productCategory,
        productImage,
        purchasePrice,
        productImageType,
        productImageName,
        productGender,
    }, (err, resp) => {
        console.log(err);
    });
    deleteFolderRecursive(path);
    res.redirect('/products');
});
exports.saveProduct = saveProduct;
const deleteProductById = (req, res) => {
    const { id } = req.params;
    let query = `DELETE FROM products WHERE BIN_TO_UUID(idProduct) = "${id}";`;
    db_1.connection.query(query, (err) => {
        if (err)
            throw err;
        res.redirect('/products');
    });
};
exports.deleteProductById = deleteProductById;
