const { redirect } = require("express/lib/response");
import { connection } from '../database/db'
import { lengthCount } from '../helpers/manageUsers';

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
            
            const { originalUrl } = req;

            let match = (originalUrl.match(/\d+$/)-1)*10;
            let aux = /page/.test(originalUrl) ? `LIMIT ${match}, 10` : 'LIMIT 0, 10';
            let query = `SELECT * FROM users ${aux}; SELECT count(*) FROM users;`;

            connection.query(query, [2, 1], async (err, results) => {
                if(err) throw err;

                const total = lengthCount(results[1])
                
                res.render('manageUsers', {
                    rol,
                    users: results[0],
                    total
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
