import { connection } from '../database/db';
import { formatData } from '../helpers/manageCostumersHelper';
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

// This is the route to manage the users
