import { Request, Response } from 'express';
const bcryptjs: any = require('bcryptjs/dist/bcrypt');

class Password {
    edit(req: Request, res: Response) {
        const { id } = req.params;
        res.send('Change password');
    }

    patch(req: Request, res: Response) {
        res.send('Password cambiado');
    }
}

export const password = new Password();
