const connection = require("../database/db");


const dashboardController = {}

dashboardController.indexView = (req, res) => {

    if(req.session.loggedIn){

        const { name, rol, user } = req.session.data;

        var salesInformation = {
            totalSales: 0
        };
        connection.query('SELECT count(*) FROM sales;', async (err, results) => {
            if(err){
                data.totalSales = 'Error'
            }else{
                let result = JSON.stringify(results[0]["count(*)"]);
               salesInformation = {...salesInformation, totalSales : result}
               console.log(salesInformation);
            }
        });

        const {totalSales} = salesInformation;

        res.render('index', {
            login: true,
            name: name,
            rol: rol,
            user: user,
            totalSales
        })
    }else{
        res.redirect('/login')
    }
};

dashboardController.sales = (req, res) => {

    res.redirect('/')
}

dashboardController.products = (req, res) => {

    connection.query('SELECT COUNT(*) FROM products;', async (err, results) => {
        if(err){
            console.log(err)
        }else{
            console.log(results)
        }
    });

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
