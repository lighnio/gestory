
const dashboardController = {}

dashboardController.indexView = (req, res) => {

    if(req.session.loggedIn){

        const { name, rol, user } = req.session.data;

        res.render('index', {
            login: true,
            name: name,
            rol: rol,
            user: user
        })
    }else{
        res.redirect('/login')
    }
};

dashboardController.sales = (req, res) => {
    res.redirect('/')
}

dashboardController.products = (req, res) => {
    res.redirect('/')
}

dashboardController.manageUsers = (req, res) => {
    if(req.session.loggedIn){

        const { rol } = req.session.data;

        res.render('manageUsers', {
            rol: rol,
        });
    }else{
        res.redirect('/')
    }
}
module.exports = dashboardController;
