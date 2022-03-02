import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import session from 'express-session';
import morgan from 'morgan';
import cors from 'cors';

// Settings
export const app = express();
app.set('port', process.env.PORT || 3000);
dotenv.config({
    path: path.join(`${__dirname}/env/.env`),
});

declare module 'express-session' {
    interface Data {
        name: string;
        rol: string;
        user: string;
    }

    interface SessionData {
        loggedIn: boolean;
        data: Data;
        user: string;
    }
}

// Middlewares
app.set('view engine', 'ejs');
app.set('views', path.join(`${__dirname}/views`));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/resources', express.static('public'));
app.use('/resources', express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
    })
);
app.use(morgan('tiny'));

// routes
app.use('/api/', require('./router/apiRouter'));
app.use('/', require('./router/mainRouter'));
