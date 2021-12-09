const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const session = require('express-session');

// Settings
app.set('port', 3000 || process.env.PORT);
    dotenv.config({
        path: './env/.env'
    })

// Middlewares
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/resources', express.static('public'));
app.use('/resources', express.static(path.join(__dirname, 'public')));                                          
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// routes
app.use('/', require('./router/mainRouter'))


module.exports = app;