"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var app = express_1.default();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    next();
});
app.get('/', function (req, res, next) {
    var posts = [
        {
            id: '123',
            title: 'First title',
            content: 'First content'
        },
        {
            id: '456',
            title: 'Secont title',
            content: 'Secont content'
        }
    ];
    res.status(200).json({
        message: 'fetch success',
        posts: posts
    });
});
app.post('/', function (req, res, next) {
    var post = req.body;
    console.log(req.body);
    res.status(200).json({
        message: 'Post success!!!'
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map