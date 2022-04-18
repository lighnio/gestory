"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = require("../controllers/api/category.controller");
const costumer_controller_1 = require("../controllers/api/costumer.controller");
const gender_controller_1 = require("../controllers/api/gender.controller");
const Password_controller_1 = require("../controllers/api/Password.controller");
const product_controller_1 = require("../controllers/api/product.controller");
const products_controller_1 = require("../controllers/api/products.controller");
const sale_controller_1 = require("../controllers/api/sale.controller");
const ticket_controller_1 = require("../controllers/api/ticket.controller");
const apiController_1 = require("../controllers/apiController");
const verifyToken_1 = require("../middlewares/verifyToken");
const apiRouter = (0, express_1.Router)();
apiRouter
    // Products information
    .get('/', products_controller_1.products.index)
    .get('/product/:productId', product_controller_1.product.index)
    .get('/category/:category', category_controller_1.category.index)
    .get('/gender/:gender', gender_controller_1.gender.index)
    .get('/search', apiController_1.searchData)
    // Costumer
    .post('/signin', costumer_controller_1.authApi.index)
    .post('/signUp', costumer_controller_1.authApi.store)
    .post('/logout', costumer_controller_1.authApi.destroy)
    .post('/forgot', Password_controller_1.password.edit)
    .post('/forgot/:id', Password_controller_1.password.patch)
    // Sale
    .post('/buy', verifyToken_1.verifyToken, sale_controller_1.sale.store)
    // Tiket
    .get('/tiket/:id', verifyToken_1.verifyToken, ticket_controller_1.tiket.show)
    // Processing the 404
    .get('*', apiController_1.noValidUrl);
module.exports = apiRouter;
