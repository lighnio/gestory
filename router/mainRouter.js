const router = require('express').Router();
const bcryptjs = require('bcryptjs');
const connection = require('./../database/db');

// Routing
router
    // Main page
    .get('/', (req, res) => {
        if(req.session.loggedIn){
            res.render('index', {
                login: true,
                name: req.session.data.name,
                rol: req.session.data.rol,
                user: req.session.data.user
            })
        }else{
            res.redirect('/login')
        }
    })
    // Login
    .get('/login', (req, res) => {
        if(req.session.loggedIn){
            res.redirect('/')
        }else{
            res.render('login', {alert: false});
        }
       
    })
    .get('/register', (req, res) => {
        if(req.session.loggedIn){
            res.redirect('/')
        }else{
            res.render('register', {alert : false});
        }
        
    })
    .get('/logout', (req, res) => {
        req.session.destroy(() => res.redirect('/'))
    })
    .get('*', (req, res) => {
        res.redirect('/')
    })
    .post('/register', async (req, res) => {
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

    })
    .post('/auth', async (req, res) => {
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
                alertMessage: 'Plese type your username or pasword',
                alertIcon: 'warning',
                showConfirmButton: false,
                time: 1500,
                ruta: '/login'
            })
        }

    })
    

module.exports = router;