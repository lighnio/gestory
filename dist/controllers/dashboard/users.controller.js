"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.searchUser = exports.manageUsers = void 0;
const db_1 = require("../../database/db");
const manageUsers_1 = require("../../helpers/manageUsers");
// This function returns all the users
const manageUsers = (req, res) => {
    // @ts-ignore
    const { rol } = req.session.data;
    const pageName = 'users';
    if (req.query.search) {
        // const {search, page}: {search : string; page: number} = req.query;
        const { search, page } = req.query;
        const pagequery = page
            ? `LIMIT ${(Number(page) - 1) * 10}, 10`
            : 'LIMIT 0, 10';
        const queryCount = `SELECT * FROM users WHERE Id LIKE '%${search}' OR name LIKE '%${search}%' OR mail LIKE '%${search}%' OR user LIKE '%${search}%'`;
        const queryLimited = `${queryCount} ${pagequery}`;
        const queryAll = `${queryCount}; ${queryLimited}`;
        db_1.connection.query(queryAll, [1, 2], (err, result) => __awaiter(void 0, void 0, void 0, function* () {
            if (err)
                throw err;
            const results = JSON.parse(JSON.stringify(result));
            res.render('manageUsers', {
                rol,
                users: results[1],
                total: results[0].length,
                pageName,
                search,
            });
        }));
    }
    else {
        const { originalUrl } = req;
        // @ts-ignore
        let match = (originalUrl.match(/\d+$/) - 1) * 10;
        let aux = /page/.test(originalUrl)
            ? `LIMIT ${match}, 10`
            : 'LIMIT 0, 10';
        let query = `SELECT * FROM users ${aux}; SELECT count(*) FROM users;`;
        db_1.connection.query(query, [2, 1], (err, results) => __awaiter(void 0, void 0, void 0, function* () {
            if (err)
                throw err;
            // @ts-ignore
            const total = (0, manageUsers_1.lengthCount)(results[1]);
            res.render('manageUsers', {
                rol,
                // @ts-ignore
                users: results[0],
                total,
                pageName,
            });
        }));
    }
};
exports.manageUsers = manageUsers;
// This function process the query and redirect to a search
const searchUser = (req, res) => {
    const { user } = req.body;
    res.redirect(`/users?search=${user}`);
};
exports.searchUser = searchUser;
// This fuctions get a user by id
const getUser = (req, res) => {
    const { userId } = req.params;
    db_1.connection.query(`SELECT Id, user, name, rol, mail FROM users WHERE Id = ${userId};`, (err, results) => {
        if (err)
            throw err;
        res.send(results);
    });
};
exports.getUser = getUser;
