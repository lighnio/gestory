const bcryptjs: any = require('bcryptjs/dist/bcrypt');
import { Request, Response } from 'express';
import { connection } from '../database/db';

export const loginView = (req: Request, res: Response) => {
    if (req.session.loggedIn) {
        res.redirect('/');
    } else {
        const { user } = req.session;

        res.render('login', { alert: false, user: user });
    }
};

export const registerView = (req: Request, res: Response) => {
    if (req.session.loggedIn) {
        res.redirect('/');
    } else {
        res.render('register', { alert: false });
    }
};

export const logOut = (req: Request, res: Response) => {
    let mail = '';
    req.session.data ? (mail = req.session.data.mail) : '';
    let query = `DELETE FROM sessions WHERE data->'$.data.mail' = '${mail}'`;

    connection.query(query, (err, req) => {
        if (err) console.log(err);
    });
    req.session.destroy(() => res.redirect('/'));
};

export const accountView = (req: Request, res: Response) => {
    if (req.session.loggedIn) {
        const name = req.session.data?.name;
        res.render('account', {
            user: name,
        });
    } else {
        res.redirect('/');
    }
};
export const registerPost = async (req: Request, res: Response) => {
    const { user, name, pass, rol, email } = req.body;
    let passHash = await bcryptjs.hash(pass, 8);
    connection.query(
        'INSERT INTO users SET ?',
        {
            user: user,
            name: name,
            pass: passHash,
            rol: rol,
            mail: email,
        },
        (err, resul) => {
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
            } else {
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
        }
    );
};

export const auth = async (req: Request, res: Response) => {
    const { user, pass } = req.body;
    if (user && pass) {
        connection.query(
            'SELECT * FROM users WHERE user = ?',
            [user],
            async (err, result) => {
                const results = JSON.parse(JSON.stringify(result));
                if (
                    results.length == 0 ||
                    !(await bcryptjs.compare(pass, results[0].pass))
                ) {
                    res.render('login', {
                        alert: true,
                        alertTitle: 'Error',
                        alertMessage: 'Username or password incorrect',
                        alertIcon: 'error',
                        showConfirmButton: true,
                        time: 13000,
                        ruta: '/login',
                    });
                } else {
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
            }
        );
    } else {
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
};
