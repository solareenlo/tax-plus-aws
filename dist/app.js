"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var apiController = __importStar(require("./controllers/api"));
var multer_1 = __importDefault(require("multer"));
var MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};
var upload = multer_1.default({ dest: 'uploads/' });
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        var isValid = MIME_TYPE_MAP[file.mimetype];
        var error = new Error('無効なファイル形式です.');
        // if (isValid) {
        //   error = null;
        // }
        cb(null, 'dist/images');
    },
    filename: function (req, file, cb) {
        var name = file.originalname
            .toLowerCase()
            .split(' ')
            .join('-');
        var ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + "-" + Date.now() + "." + ext);
    }
});
var app = express_1.default();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use('/images', express_1.default.static(path_1.default.join('dist/images')));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'PUT, GET, POST, PATCH, DELETE, OPTIONS');
    next();
});
app.get('/api/v1', apiController.home);
app.post('/api/v1', multer_1.default({ storage: storage }).single('image'), apiController.calculate);
exports.default = app;
//# sourceMappingURL=app.js.map