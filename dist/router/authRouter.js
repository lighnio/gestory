"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const accountController_1 = require("../controllers/accountController");
const { notFound } = require('../controllers/mainController');
const router = (0, express_1.Router)();
// Routing
router
    // Dashboard
    // Login and authentication
    .get('/login', accountController_1.loginView)
    .get('/register', accountController_1.registerView)
    .get('/logout', accountController_1.logOut)
    .get('/account', accountController_1.accountView)
    .post('/register', accountController_1.registerPost)
    .post('/auth', accountController_1.auth)
    .get('*', notFound);
module.exports = router;
