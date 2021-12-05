const bcryptjs = require('bcryptjs');
const connection = require('./../database/db');

const accountController = {};

accountController.loginView = (req, res) => {
    if(req.session.loggedIn){
        res.redirect('/')
    }else{
        res.render('login', {alert: false});
    }
}

accountController.registerView = (req, res) => {
    if(req.session.loggedIn){
        res.redirect('/')
    }else{
        res.render('register', {alert : false});
    }
}

accountController.logOut =  (req, res) => {
    req.session.destroy(() => res.redirect('/'))
};

accountController.accountView = (req, res) => {
    if(req.session.loggedIn){
        res.render('account');
    }else{
        res.redirect('/');
    }
}

accountController.registerPost = async (req, res) => {
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
module.exports = accountController;