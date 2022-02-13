import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import session from 'express-session';

export const app = express();
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


