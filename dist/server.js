"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var errorhandler_1 = __importDefault(require("errorhandler"));
var app_1 = __importDefault(require("./app"));
if (process.env.NODE_ENV === 'development') {
    // only use in development
    app_1.default.use(errorhandler_1.default());
}
else {
    app_1.default.use(function (err, req, res, next) {
        console.error(err);
        res.status(500).send('Server Error');
    });
}
var normalizePort = function (val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
};
var port = normalizePort(process.env.PORT || "3000");
app_1.default.set('port', port);
var server = app_1.default.listen(app_1.default.get('port'), function () {
    console.log('%s http://localhost:%d で動いています.', chalk_1.default.green('✓'), app_1.default.get('port'));
    console.log('%s %sモードです.', chalk_1.default.green('✓'), app_1.default.get('env'));
    console.log('%s CTRL-C で停止します.', chalk_1.default.green('✓'));
});
exports.default = server;
//# sourceMappingURL=server.js.map