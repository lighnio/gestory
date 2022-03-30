import { Request, Response } from 'express';
import { connection } from '../../database/db';

class Tiket {
    async show(req: Request, res: Response) {
        const { id } = req.params;

        const fields = 'ticket';
        const query: string = `SELECT ${fields} FROM sales WHERE BIN_TO_UUID(idSale) = '${id}';`;
        connection.query(query, async (err, tiket) => {
            if (err)
                return res.send({
                    err: true,
                    msg: err.sqlMessage,
                });

            res.send(tiket);
        });
    }
}

export const tiket = new Tiket();
