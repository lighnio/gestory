import { connection } from '../../database/db';
import { formatData } from '../../helpers/manageCostumersHelper';
import { Request, Response } from 'express';
import { getQueryForCostumersHelper } from '../../helpers/costumers/getQueryHelper';

// This is a route to manage the costumers
export const manageCostumers = (req: Request, res: Response) => {
    if (req.session.loggedIn) {
        // @ts-ignore
        const { rol } = req.session.data;
        if (rol == 'admin') {
            getQueryForCostumersHelper();
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
