import { Request, Response } from 'express';
import { connection } from '../../database/db';
import { lengthCount } from '../../helpers/manageUsers';

// This function returns all the users
export const manageUsers = (req: Request, res: Response) => {
    if (req.session.loggedIn) {
        // @ts-ignore
        const { rol } = req.session.data;
        const pageName = "users"

        if (req.query.search) {

            // const {search, page}: {search : string; page: number} = req.query;
            const {search, page} = req.query;
            const pagequery: string = page ?
            `LIMIT ${((Number(page) - 1) * 10)}, 10`  
            : 'LIMIT 0, 10'
            const queryCount = `SELECT * FROM users WHERE Id LIKE '%${search}' OR name LIKE '%${search}%' OR mail LIKE '%${search}%' OR user LIKE '%${search}%'`;
            const queryLimited = `${queryCount} ${pagequery}`
            const queryAll = `${queryCount}; ${queryLimited}`
            
            connection.query(queryAll, [1, 2], async (err, results) => {
                if (err) throw err;
                
                res.render('manageUsers', {
                    rol,
                    users: results[1],
                    total: results[0].length,
                    pageName,
                    search
                });
            });
        } else {
            const { originalUrl } = req;

            // @ts-ignore
            let match = (originalUrl.match(/\d+$/) - 1) * 10;
            let aux = /page/.test(originalUrl)
                ? `LIMIT ${match}, 10`
                : 'LIMIT 0, 10';
            let query = `SELECT * FROM users ${aux}; SELECT count(*) FROM users;`;

            connection.query(query, [2, 1], async (err, results) => {
                if (err) throw err;

                const total = lengthCount(results[1]);

                res.render('manageUsers', {
                    rol,
                    users: results[0],
                    total,
                    pageName
                });
            });
        }
    } else {
        res.redirect('/');
    }
};

// This function process the query and redirect to a search
export const searchUser = (req: Request, res: Response) => {
    const { user } = req.body;

    res.redirect(`/users?search=${user}`);
};

// This fuctions get a user by id
export const getUser = (req: Request, res: Response) => {
    if (req.session.loggedIn) {
        const { userId } = req.params;

        connection.query(
            `SELECT Id, user, name, rol, mail FROM users WHERE Id = ${userId};`,
            (err, results) => {
                if (err) throw err;
                res.send(results);
            }
        );
    } else {
        res.redirect('/');
    }
};
