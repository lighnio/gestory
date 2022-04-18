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
exports.getProductsByGender = exports.noValidUrl = exports.searchData = exports.getProductsByCategory = exports.productInformation = exports.apiMainPage = void 0;
const db_1 = require("../database/db");
const getProductHelper_1 = require("../helpers/api/getProductHelper");
// To return any information folow the next structure:
// If it have a error
// {
//     err: true,
//     msg : err.code
// }
// This returns the last 10 added products to the sale
const apiMainPage = (req, res) => {
    const fields = 'BIN_TO_UUID(idProduct) AS id, productName, serialNumber, productPrice, productCategory, productImage';
    const query = `SELECT ${fields} FROM products ORDER BY idProduct DESC LIMIT 8`;
    db_1.connection.query(query, (err, results) => {
        if (err) {
            let response = {
                err: true,
                msg: err.code,
            };
            res.send(response);
            throw err;
        }
        let formatedResults = [];
        // @ts-ignore
        results.map((product) => {
            formatedResults = [
                ...formatedResults,
                (0, getProductHelper_1.processProductHelper)(product),
            ];
        });
        res.send({
            err: false,
            data: formatedResults,
        });
    });
};
exports.apiMainPage = apiMainPage;
// This get a single product n' returns it
const productInformation = (req, res) => {
    const { productId } = req.params;
    if (!productId) {
        let response = {
            err: true,
            msg: 'No id was provided',
        };
        res.send(response);
    }
    else {
        const fields = 'BIN_TO_UUID(idProduct) AS id, productName, productDescription, productPrice, serialNumber, productCategory, productImage';
        const query = `SELECT ${fields} FROM products WHERE BIN_TO_UUID(idProduct) = '${productId}';`;
        db_1.connection.query(query, (err, results) => {
            console.log(err);
            if (err) {
                let response = {
                    err: true,
                    msg: err.code,
                };
                res.send(response);
            }
            else {
                let toArray = JSON.parse(JSON.stringify(results));
                let orderedData = {};
                toArray.map((element) => {
                    orderedData = (0, getProductHelper_1.processProductHelper)(element);
                });
                // console.log("orderedData: ", orderedData);
                let response = {
                    err: false,
                    data: orderedData,
                };
                res.json(response);
            }
        });
    }
};
exports.productInformation = productInformation;
// This controller get all the products by category
const getProductsByCategory = (req, res) => {
    // Getting the category
    const { category } = req.params;
    if (!category) {
        let response = {
            err: true,
            msg: 'No category was specified',
        };
        res.send(response);
    }
    else {
        let fields = 'BIN_TO_UUID(idProduct) AS idProductd, serialNumber, productPrice, productCategory, productImage';
        let query = `SELECT ${fields} FROM products WHERE productCategory = '${category}'`;
        db_1.connection.query(query, (err, results) => {
            if (err) {
                let response = {
                    err: true,
                    msg: err.code,
                };
                res.send(response);
            }
            else {
                let response = {
                    err: false,
                    data: results,
                };
                res.send(response);
            }
        });
    }
};
exports.getProductsByCategory = getProductsByCategory;
// Search by query
const searchData = (req, res) => {
    if (req.query.search) {
        const { search } = req.query;
        let fields = 'BIN_TO_UUID(idProduct) AS idProduct, productName, productCategory, productPrice';
        let whereParams = `productName LIKE '%${search}%' OR productCategory LIKE '%${search}%' OR serialNumber LIKE '%${search}%'`;
        let query = `SELECT ${fields} FROM products WHERE ${whereParams};`;
        db_1.connection.query(query, (err, results) => {
            if (err) {
                let response = {
                    err: true,
                    msg: err.code,
                };
                res.send(response);
            }
            else {
                let response = {
                    err: false,
                    data: results,
                };
                res.send(response);
            }
        });
    }
    else {
        let response = {
            err: true,
            msg: 'No query was specified',
        };
        res.send(response);
    }
};
exports.searchData = searchData;
// If there is a not valid route
const noValidUrl = (req, res) => {
    let response = {
        err: true,
        msg: 'Not valid url',
    };
    res.send(response);
};
exports.noValidUrl = noValidUrl;
const getProductsByGender = (req, res) => {
    const { gender } = req.params;
    const fields = 'BIN_TO_UUID(idproduct) AS id, productName, productPrice, productImage';
    const query = `SELECT ${fields} FROM products WHERE productGender = '${gender}' OR productGender = 'unisex';`;
    db_1.connection.query(query, (err, results) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            res.json({ err, msg: err.code });
        }
        else {
            let formatedResults = [];
            // @ts-ignore
            results.map((product) => {
                formatedResults = [
                    ...formatedResults,
                    (0, getProductHelper_1.processProductHelper)(product),
                ];
            });
            res.json({
                err: false,
                data: formatedResults,
            });
        }
    }));
};
exports.getProductsByGender = getProductsByGender;
