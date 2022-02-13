const { redirect } = require("express/lib/response");
import { connection } from '../database/db'


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

    if(req.session.loggedIn){
        connection.query('SELECT * FROM products;', async (err, results) => {
            if(err) throw err;
    
            const { rol } = req.session.data;
            const data = {
                rol,
                products: results,
                total: results.length
            }

            res.render('products', data)
    
        });
    }else{
        res.redirect('/')
    }


}

dashboardController.manageUsers = (req, res) => {
    if(req.session.loggedIn){

        const { rol } = req.session.data;

        if(req.query.search){
            const { search } = req.query;

            const queryString = `SELECT * FROM users WHERE Id LIKE '%${search}' OR name LIKE '%${search}%' OR mail LIKE '%${search}%' OR user LIKE '%${search}%'`;
            connection.query(queryString, async (err, results) => {
                if(err) throw err;
                res.render('manageUsers', {
                    rol,
                    users: results,
                    total: results.length
                })
            })
        }else{

            connection.query('SELECT * FROM users LIMIT 10; SELECT * FROM users', [2, 1], async (err, results) => {
                if(err) throw err;
                // console.log('results: ', results)
                res.render('manageUsers', {
                    rol,
                    users: results[0],
                    total: results[1].length
                })
            }); 
        }


    }else{
        res.redirect('/')
    }
}

dashboardController.searchUser = (req, res) => {
    const { user } = req.body;

    res.redirect(`/users?search=${user}`)
}


dashboardController.manageCostumers = (req, res) => {
    if(req.session.loggedIn){
        const { rol } = req.session.data;
        if(rol == 'admin'){
            res.render('manageCostumers', {
                rol
            })
        }else{
            res.redirect('/')
        }
    }else{
        redirect('/')
    }
}

module.exports = dashboardController;
