import { salesByIdHelper } from '../../helpers/saleById';
import { salesHelper } from '../../helpers/salesHelper';
import { connection } from '../../database/db';
import { Request, Response } from 'express';

// THis is the main view and it retuns all the sales
export const indexView = async (req: Request, res: Response) => {
    if (req.session.loggedIn) {
        // @ts-ignore
        const { name, rol, user } = req.session.data;
        const {date} = req.query;
        const datequery = date? `WHERE dateSale BETWEEN '${date}-01-01' AND '${date}-12-31'` : '';

        const currencyPrefix = 'Q';
        
        const queryAll: string =
            `SELECT BIN_TO_UUID(idSale) AS idSale, saleProfit, dateSale, BIN_TO_UUID(costumerId) AS costumerId FROM sales ${datequery} ORDER BY dateSale DESC`;
        const querySum: string = `SELECT COUNT(*) AS COUNT FROM sales ${datequery}`;
        const queryProfits: string =
            `SELECT ROUND(SUM(saleProfit), 2) as profits FROM sales ${datequery}`;
        const queryAvg: string = `SELECT ROUND(AVG(saleProfit), 2) AS avgSum FROM sales ${datequery}`;

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

                const creationDate = new Date();
                const auxdate = date? date : creationDate.getFullYear();
                res.render('index', {
                    login: true,
                    name: name,
                    rol: rol,
                    user: user,
                    totalSales,
                    allSales,
                    profits,
                    avgSum,
                    auxdate,
                    currencyPrefix
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
    const {date} = req.body;

    res.redirect(`/?date=${date}`);
};