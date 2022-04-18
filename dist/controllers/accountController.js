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
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.registerPost = exports.accountView = exports.logOut = exports.registerView = exports.loginView = void 0;
const bcryptjs = require('bcryptjs/dist/bcrypt');
const db_1 = require("../database/db");
const loginView = (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
    }
    else {
        const { user } = req.session;
        res.render('login', { alert: false, user: user });
    }
};
exports.loginView = loginView;
const registerView = (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
    }
    else {
        res.render('register', { alert: false });
    }
};
exports.registerView = registerView;
const logOut = (req, res) => {
    let mail = '';
    req.session.data ? (mail = req.session.data.mail) : '';
    let query = `DELETE FROM sessions WHERE data->'$.data.mail' = '${mail}'`;
    db_1.connection.query(query, (err, req) => {
        if (err)
            console.log(err);
    });
    req.session.destroy(() => res.redirect('/'));
};
exports.logOut = logOut;
const accountView = (req, res) => {
    var _a;
    if (req.session.loggedIn) {
        const name = (_a = req.session.data) === null || _a === void 0 ? void 0 : _a.name;
        res.render('account', {
            user: name,
        });
    }
    else {
        res.redirect('/');
    }
};
exports.accountView = accountView;
const registerPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, name, pass, rol, email } = req.body;
    let passHash = yield bcryptjs.hash(pass, 8);
    db_1.connection.query('INSERT INTO users SET ?', {
        user: user,
        name: name,
        pass: passHash,
        rol: rol,
        mail: email,
    }, (err, resul) => {
        if (err) {
            res.render('register', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: 'Username already exists.',
                alertIcon: 'warning',
                showConfirmButton: false,
                time: 2500,
                ruta: '/register',
            });
        }
        else {
            res.render('register', {
                alert: true,
                alertTitle: 'Registered',
                alertMessage: 'Registered succesfully!',
                alertIcon: 'success',
                showConfirmButton: false,
                time: 1500,
                ruta: '/login',
            });
        }
    });
});
exports.registerPost = registerPost;
const auth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('auth');
    const { user, pass } = req.body;
    if (user && pass) {
        db_1.connection.query('SELECT * FROM users WHERE user = ?', [user], (err, result) => __awaiter(void 0, void 0, void 0, function* () {
            const results = JSON.parse(JSON.stringify(result));
            if (results.length == 0 ||
                !(yield bcryptjs.compare(pass, results[0].pass))) {
                res.render('login', {
                    alert: true,
                    alertTitle: 'Error',
                    alertMessage: 'Username or password incorrect',
                    alertIcon: 'error',
                    showConfirmButton: true,
                    time: 13000,
                    ruta: '/login',
                });
            }
            else {
                req.session.loggedIn = true;
                const { name, rol, user, mail } = results[0];
                req.session.data = {
                    name,
                    rol,
                    user,
                    mail,
                };
                res.render('login', {
                    alert: true,
                    alertTitle: 'Success',
                    alertMessage: 'Login success',
                    alertIcon: 'success',
                    showConfirmButton: false,
                    time: 1500,
                    ruta: '/',
                });
            }
        }));
    }
    else {
        res.render('login', {
            alert: true,
            alertTitle: 'Error',
            alertMessage: 'Please type your username or password',
            alertIcon: 'warning',
            showConfirmButton: false,
            time: 1500,
            ruta: '/login',
        });
    }
});
exports.auth = auth;
