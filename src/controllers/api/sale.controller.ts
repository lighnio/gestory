import { Request, Response } from 'express';
import PDFDocument from 'pdfkit';
import { connection } from '../../database/db';

class Sale {
    store(req: Request, res: Response) {
        const doc = new PDFDocument();
        doc.addPage();
        res.send('hola');
    }
}

export const sale = new Sale();
