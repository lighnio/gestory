import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import session from 'express-session';
import * as expressSession from "express-session";
import morgan from 'morgan';
import cors from 'cors';
import expressMySqlSession from "express-mysql-session";
// Settings
export const app = express();
app.set('port', process.env.DB_PORT || 3000);
dotenv.config({
    path: path.join(`${__dirname}/env/.env`)
})

declare var process : {
    env: {
        DB_HOST:string,
        DB_PORT: number,
        DB_USER: string,
        DB_PASSWORD: string,
        DB_NAME: string
    }
  }
var options = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

const MySQLStore   = expressMySqlSession(expressSession);
const sessionStore = new MySQLStore(options);

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
app.set('views', path.join(`${__dirname}/views`))
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/resources', express.static('public'));
app.use('/resources', express.static(path.join(__dirname, 'public')));    
app.use(cors())                                      
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: sessionStore
   
}));
app.use(morgan('tiny'));

// routes
app.use('/api/', require('./router/apiRouter'))
app.use('/', require('./router/mainRouter'));


