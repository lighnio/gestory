import { Router } from "express";
import { accountView, auth, loginView, logOut, registerPost, registerView } from "../controllers/accountController";
import { notFound } from "../controllers/mainController";

export const authRouter = Router();

authRouter
    .get('/login', loginView)
    .get('/register', registerView)
    .get('/logout', logOut)
    .get('/account', accountView)
    .post('/register', registerPost)
    .post('/auth', auth)
    .get('*', notFound);