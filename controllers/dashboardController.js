
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

module.exports = dashboardController;
