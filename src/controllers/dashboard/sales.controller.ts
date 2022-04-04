// ---------Imports-------------
// Helpers
import { salesByIdHelper } from '../../helpers/saleById';
import { salesHelper } from '../../helpers/salesHelper';
import { getDateHelper } from '../../helpers/getDateHelper';
import { getQuery } from '../../helpers/getSalesQuery';
// Db
import { connection } from '../../database/db';
// Express
import { Request, Response } from 'express';

// THis is the main view and it returns all the sales
export const indexView = async (req: Request, res: Response) => {
    if (req.session.loggedIn) {
        // @ts-ignore
        const { name, rol, user } = req.session.data;
        const { date, page } = req.query;

        const currencyPrefix = 'Q';

        // let match = (originalUrl.match(/\d+$/) - 1) * 10;
        // let match = (originalUrl.match(/\d+$/));
        const query = getQuery(date, page);

        connection.query(query, [1, 2, 3, 4, 5, 6], async (err, results) => {
            if (err) throw err;

            const {
                sales,
                profits: profitObj,
                count: total,
                avgSum: averageSum,
            } = salesHelper(results);

            const pageName = 'sales';

            const { profits } = profitObj;
            const { avgSum } = averageSum;

            const auxdate = getDateHelper(date);

            const responseData = {
                name,
                rol,
                user,
                total,
                sales,
                profits,
                avgSum,
                auxdate,
                currencyPrefix,
                pageName,
                
            };

            res.render('index', responseData);
        });
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

// This function returns the ticket by sale id
export const downloadTicket = (req: Request, res: Response) => {
    if (req.session.loggedIn) {
        const { saleId } = req.params;
        res.send(saleId);
    } else {
        res.redirect('/');
    }
};

// This return the order by date

export const dateSales = async (req: Request, res: Response) => {
    const { date } = req.body;

    res.redirect(`/?date=${date}`);
};

// export const page = async (req: Request, res: Response) => {
//     const { page } = req.body;
// };
