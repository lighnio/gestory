const router = require('express').Router();
const {loginView, registerView, logOut, accountView, registerPost} = require('./../controllers/accountController');
const { indexView } = require('../controllers/dashboardController');

// Routing
router
    // Main page
    .get('/', indexView)
    // Login
    .get('/login', loginView)
    .get('/register', registerView)
    .get('/logout', logOut)
    .get('/account', accountView)
    .post('/register', registerPost)
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
    
    .get('*', (req, res) => {
        res.redirect('/')
    })
    
    module.exports = router;