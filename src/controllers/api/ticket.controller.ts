import { Request, Response } from 'express';
import { connection } from '../../database/db';
import { processTiket } from '../../helpers/api/processTiket';
import { saleForTicket } from '../../helpers/api/saleForTicket.helper';

class Tiket {
    async show(req: Request, res: Response) {
        const { id } = req.params;
        const fields = 'dateSale, products, saleTotal';
        const query: string = `SELECT ${fields} FROM sales WHERE BIN_TO_UUID(idSale) = '${id}';`;
        connection.query(query, async (err, results) => {
            if (err)
                return res.json({
                    err: true,
                    msg: err.sqlMessage,
                });

            const { products, date, total } = saleForTicket(results[0]);
            res.json({
                err: false,
                products,
                date,
                total,
            });
        });
    }
}

export const tiket = new Tiket();
