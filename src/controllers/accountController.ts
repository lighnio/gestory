import bcryptjs from 'bcryptjs/dist/bcrypt';
import { connection } from './../database/db';


export const loginView = (req, res) => {
    if(req.session.loggedIn){
        res.redirect('/')
    }else{
        res.render('login', {alert: false,
            user: req.session.user
        });
    }
}

export const registerView = (req, res) => {
    if(req.session.loggedIn){
        res.redirect('/')
    }else{
        res.render('register', {alert : false});
    }
}

export const logOut =  (req, res) => {
    req.session.destroy(() => res.redirect('/'))
};

export const accountView = (req, res) => {

    if(req.session.loggedIn){
        const { name  } = req.session.data;
        res.render('account', {
            user: name
        });
    }else{
        res.redirect('/');
    }
}

export const registerPost = async (req, res) => {
    const {user, name, rol, pass} = req.body;
    let passHash = await bcryptjs.hash(pass, 8);
    connection.query('INSERT INTO users SET ?', {
        user: user,
        name: name,
        rol: rol,
        pass: passHash
    }, (err, resul) => {
        if(err) {
            res.render('register', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: 'Username already exists.',
                alertIcon: 'warning',
                showConfirmButton: false,
                time: 2500,
                ruta: '/register'
            })
        }else{
            res.render('register', {
                alert: true,
                alertTitle: 'Registered',
                alertMessage: 'Registered succesfully!',
                alertIcon: 'success',
                showConfirmButton: false,
                time: 1500,
                ruta: '/login'
            })
        }
    });
    
}

export const auth = async (req, res) => {
    const {user, pass} = req.body;
    if(user && pass){
        connection.query('SELECT * FROM users WHERE user = ?', [user], async(err, results) => {
            if(results.length == 0 || !(await bcryptjs.compare(pass, results[0].pass))){
                res.render('login', {
                    alert: true,
                    alertTitle: 'Error',
                    alertMessage: 'Username or password incorrect',
                    alertIcon: 'error',
                    showConfirmButton: true,
                    time: 13000,
                    ruta: '/login'
                })
            }else{
                req.session.loggedIn = true;
                const {name, rol, user} = results[0]
                req.session.data = {
                    name, rol, user
                }
                res.render('login', {
                    alert: true,
                    alertTitle: 'Success',
                    alertMessage: 'Login success',
                    alertIcon: 'success',
                    showConfirmButton: false,
                    time: 1500,
                    ruta: '/'
                })
            }
        });
    }else{
        res.render('login', {
            alert: true,
            alertTitle: 'Error',
            alertMessage: 'Please type your username or password',
            alertIcon: 'warning',
            showConfirmButton: false,
            time: 1500,
            ruta: '/login'
        })
    }
    
};