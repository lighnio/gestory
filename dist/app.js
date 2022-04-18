"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const express_session_1 = __importDefault(require("express-session"));
const expressSession = __importStar(require("express-session"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const express_mysql_session_1 = __importDefault(require("express-mysql-session"));
// Settings
exports.app = (0, express_1.default)();
exports.app.set('port', process.env.DB_PORT || 3000);
dotenv_1.default.config({
    path: path_1.default.join(`${__dirname}/env/.env`),
});
var options = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: false,
    },
};
const MySQLStore = (0, express_mysql_session_1.default)(expressSession);
const sessionStore = new MySQLStore(options);
// Middlewares
exports.app.set('view engine', 'ejs');
exports.app.set('views', path_1.default.join(`${__dirname}/views`));
exports.app.use(express_1.default.urlencoded({ extended: false }));
exports.app.use(express_1.default.json());
exports.app.use('/resources', express_1.default.static('public'));
exports.app.use('/resources', express_1.default.static(path_1.default.join(__dirname, 'public')));
exports.app.use((0, cors_1.default)());
exports.app.use((0, express_session_1.default)({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    store: sessionStore,
}));
exports.app.use((0, morgan_1.default)('tiny'));
// routes
exports.app.use('/api/', require('./router/apiRouter'));
exports.app.use('/', require('./router/dashboardRouter'));
exports.app.use('/', require('./router/authRouter'));
