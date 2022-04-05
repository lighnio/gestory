import { Request, Response } from 'express';
import { connection } from '../../database/db';
class Ticket {
    index(req: Request, res: Response) {
        const query = 'SELECT ticket FROM sales;';
        connection.query(query, (err, result) => {
            if (err) throw err;
            const ticket = Buffer.from(result).toString('base64');
            const resHeader = {
                'Content-Disposition': `attachment; filename=${Date.now()}.pdf; content: ${ticket}`,
                'Content-type': 'application/pdf',
            };

            res.header('Content-Type', 'application/pdf;base64');
            res.end();
        });
    }
}

export const ticket = new Ticket();
