"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ticket = void 0;
const db_1 = require("../../database/db");
class Ticket {
    index(req, res) {
        const query = 'SELECT ticket FROM sales;';
        db_1.connection.query(query, (err, result) => {
            if (err)
                throw err;
            // @ts-ignore
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
exports.ticket = new Ticket();
