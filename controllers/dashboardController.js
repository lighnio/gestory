const connection = require("../database/db");


const dashboardController = {}

dashboardController.indexView = async (req, res) => {

    if(req.session.loggedIn){

        const { name, rol, user } = req.session.data;

        connection.query('select * from sales;', async (err, results) => {
            if(err) throw err;
            
            let salesJson = JSON.parse(JSON.stringify(results));
            let sales = {
                totalSales: results.length,
                allSales: salesJson
            }
            
            const {totalSales, allSales} = sales;

            res.render('index', {
                login: true,
                name: name,
                rol: rol,
                user: user,
                totalSales,
                allSales
             })
        });

        
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
