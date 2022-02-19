import { connection } from '../database/db'
import { formatData } from '../helpers/manageCostumersHelper';
import { lengthCount } from '../helpers/manageUsers';
import { salesByIdHelper } from '../helpers/saleById';
import { salesHelper } from '../helpers/salesHelper';

export const indexView = async (req, res) => {

    if(req.session.loggedIn){

        const { name, rol, user } = req.session.data;

        const queryAll = 'SELECT * FROM sales';
        const querySum = 'SELECT COUNT(*) AS COUNT FROM sales'
        const queryProfits = 'SELECT SUM(idSale) as profits FROM sales'

        connection.query(`${queryAll};${queryProfits};${querySum}`,[1, 2, 3], async (err, results) => {
            if(err) throw err;
            
            const { sales : allSales, profits : profitsObj, count: totalSales } = salesHelper(results);

            const { profits } = profitsObj;

            console.log(profits)
            res.render('index', {
                login: true,
                name: name,
                rol: rol,
                user: user,
                totalSales,
                allSales,
                profits  
             })
        });

        
    }else{
        res.redirect('/login')
    }
};

export const salesById = (req, res) => {

    const { saleId } = req.params;

    const query = `SELECT * FROM sales WHERE idSale = '${saleId}';`;

    connection.query(query, async (err, results) => {
        if(err) throw err;
        const sale = salesByIdHelper(results);

        res.send(sale)

    });

}

export const products = (req, res) => {

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
export const manageUsers = (req, res) => {

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

export const searchUser = (req, res) => {
    const { user } = req.body;

    res.redirect(`/users?search=${user}`)
}

export const getUser = (req, res) => {


    if(req.session.loggedIn){

        const { userId } = req.params;
    
        connection.query(`SELECT * FROM users WHERE Id = ${userId};`, (err, results) => {
            if(err) throw err;
            res.send(results);
        });
        
    }else{
        res.redirect('/')
    }


}


export const manageCostumers = (req, res) => {
    if(req.session.loggedIn){
        const { rol } = req.session.data;
        if(rol == 'admin'){

            connection.query(`SELECT BIN_TO_UUID(id) FROM costumers;`, async (err, results) => {
                if(err) throw err;
                
                let data = formatData(results);

                console.log(data)
                
            })
            res.render('manageCostumers', {
                rol
            })
        }else{
            res.redirect('/')
        }
    }else{
        res.redirect('/')
    }
}

