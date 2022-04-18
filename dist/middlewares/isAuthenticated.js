"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const isAuthenticated = (req, res, next) => {
    if (req.session.loggedIn)
        return next();
    res.redirect('/login');
};
exports.isAuthenticated = isAuthenticated;
