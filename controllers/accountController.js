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

module.exports = accountController;