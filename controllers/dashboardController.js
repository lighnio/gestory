const bcryptjs = require('bcryptjs');
const connection = require('./../database/db');
const dashboardController = {}

dashboardController.indexView = (req, res) => {

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
};

module.exports = dashboardController;
