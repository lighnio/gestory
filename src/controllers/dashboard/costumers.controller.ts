import { connection } from '../../database/db';
import { formatData } from '../../helpers/manageCostumersHelper';
import { Request, Response } from 'express';
import { getQueryForCostumersHelper } from '../../helpers/costumers/getQueryHelper';

// This is a route to manage the costumers
export const manageCostumers = (req: Request, res: Response) => {
    // @ts-ignore
    const { rol } = req.session.data;
    if (rol == 'admin') {
        let query: string = getQueryForCostumersHelper();

        connection.query(query, [1, 2], async (err, results) => {
            if (err) throw err;

            let { costumers, total } = formatData(results);

            res.render('manageCostumers', {
                rol,
                costumers,
                total,
            });
        });
    } else {
        res.redirect('/');
    }
};
