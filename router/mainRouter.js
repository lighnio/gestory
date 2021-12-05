const router = require('express').Router();
const {loginView, registerView, logOut, accountView, registerPost, auth} = require('./../controllers/accountController');
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
    .post('/auth', auth)
    
    .get('*', (req, res) => {
        res.redirect('/')
    })
    
    module.exports = router;