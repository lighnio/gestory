import { connection } from '../database/db';
import { formatData } from '../helpers/manageCostumersHelper';
import { lengthCount } from '../helpers/manageUsers';
import { salesByIdHelper } from '../helpers/saleById';
import { salesHelper } from '../helpers/salesHelper';
import { Request, Response } from 'express';

// THis is the main view
export const indexView = async (req: Request, res: Response) => {
    if (req.session.loggedIn) {
        // @ts-ignore
        const { name, rol, user } = req.session.data;

        const queryAll: string =
            'SELECT BIN_TO_UUID(idSale) AS idSale, saleProfit, dateSale, BIN_TO_UUID(costumerId) AS costumerId FROM sales ORDER BY dateSale DESC';
        const querySum: string = 'SELECT COUNT(*) AS COUNT FROM sales';
        const queryProfits: string =
            'SELECT ROUND(SUM(saleProfit), 2) as profits FROM sales';
        const queryAvg: string = `SELECT ROUND(AVG(saleProfit), 2) AS avgSum FROM sales`;

        connection.query(
            `${queryAll};${queryProfits};${querySum};${queryAvg}`,
            [1, 2, 3, 4],
            async (err, results) => {
                if (err) throw err;

                const {
                    sales: allSales,
                    profits: profitObj,
                    count: totalSales,
                    avgSum: averageSum,
                } = salesHelper(results);

                const { profits } = profitObj;
                const { avgSum } = averageSum;

                console.log(allSales);

                res.render('index', {
                    login: true,
                    name: name,
                    rol: rol,
                    user: user,
                    totalSales,
                    allSales,
                    profits,
                    avgSum,
                });
            }
        );
    } else {
        res.redirect('/login');
    }
};

// This return the sale by id

export const salesById = (req: Request, res: Response) => {
    const { saleId } = req.params;

    const query = `SELECT * FROM sales WHERE idSale = '${saleId}';`;

    connection.query(query, async (err, results) => {
        if (err) throw err;
        const sale = salesByIdHelper(results);

        res.send(sale);
    });
};

// This get all products

export const products = (req: Request, res: Response) => {
    if (req.session.loggedIn) {
        connection.query('SELECT * FROM products;', async (err, results) => {
            if (err) throw err;

            // @ts-ignore
            const { rol } = req.session.data;

            const data = {
                rol,
                products: results,
                total: results.length,
            };

            res.render('products', data);
        });
    } else {
        res.redirect('/');
    }
};

// This function returns all the users
export const manageUsers = (req: Request, res: Response) => {
    if (req.session.loggedIn) {
        // @ts-ignore
        const { rol } = req.session.data;

        if (req.query.search) {
            const { search } = req.query;

            const queryString = `SELECT * FROM users WHERE Id LIKE '%${search}' OR name LIKE '%${search}%' OR mail LIKE '%${search}%' OR user LIKE '%${search}%'`;

            connection.query(queryString, async (err, results) => {
                if (err) throw err;
                res.render('manageUsers', {
                    rol,
                    users: results,
                    total: null,
                });
            });
        } else {
            const { originalUrl } = req;

            // @ts-ignore
            let match = (originalUrl.match(/\d+$/) - 1) * 10;
            let aux = /page/.test(originalUrl)
                ? `LIMIT ${match}, 10`
                : 'LIMIT 0, 10';
            let query = `SELECT * FROM users ${aux}; SELECT count(*) FROM users;`;

            connection.query(query, [2, 1], async (err, results) => {
                if (err) throw err;

                const total = lengthCount(results[1]);

                res.render('manageUsers', {
                    rol,
                    users: results[0],
                    total,
                });
            });
        }
    } else {
        res.redirect('/');
    }
};

// This function process the query and redirect to a search

export const searchUser = (req: Request, res: Response) => {
    const { user } = req.body;

    res.redirect(`/users?search=${user}`);
};

// This fuctions get a user by id

export const getUser = (req: Request, res: Response) => {
    if (req.session.loggedIn) {
        const { userId } = req.params;

        connection.query(
            `SELECT Id, user, name, rol, mail FROM users WHERE Id = ${userId};`,
            (err, results) => {
                if (err) throw err;
                res.send(results);
            }
        );
    } else {
        res.redirect('/');
    }
};

// This is the route to manage the users

export const manageCostumers = (req: Request, res: Response) => {
    if (req.session.loggedIn) {
        // @ts-ignore
        const { rol } = req.session.data;
        if (rol == 'admin') {
            let selectedFields: string = `BIN_TO_UUID(costumerId) AS costumerId, costumerUsername, costumerMail, costumerName`;
            let query: string = `SELECT ${selectedFields} FROM costumers;`;

            connection.query(query, async (err, results) => {
                if (err) throw err;

                let data: Array<object> = formatData(results);
                console.log(data);
            });
            res.render('manageCostumers', {
                rol,
            });
        } else {
            res.redirect('/');
        }
    } else {
        res.redirect('/');
    }
};

// This function returns the ticket by sale id
export const downloadTicket = (req: Request, res: Response) => {
    if (req.session.loggedIn) {
        const { saleId } = req.params;
        res.send(saleId);
    } else {
        res.redirect('/');
    }
};
