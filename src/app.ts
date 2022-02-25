import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import session from 'express-session';
import morgan from 'morgan';

// Settings
export const app = express();
app.set('port', process.env.PORT || 3000);
dotenv.config({
    path: './env/.env'
})

declare module 'express-session'{

    interface Data {
        name : string,
        rol : string,
        user : string
    }

    interface SessionData{
        loggedIn : boolean,
        data : Data,
        user : string
    }
}



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
app.use(morgan('tiny'));

// routes
app.use('/api/', require('./router/apiRouter'))
app.use('/', require('./router/mainRouter'));


