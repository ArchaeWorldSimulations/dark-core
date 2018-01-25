"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
var jwt = require("jsonwebtoken");
var DarkJwt = /** @class */ (function () {
    function DarkJwt() {
    }
    DarkJwt.createJwt = function (content, secret) {
        return jwt.sign(content, secret);
    };
    DarkJwt.verifyJwt = function (token, secret) {
        return jwt.verify(token, secret);
    };
    return DarkJwt;
}());
exports.DarkJwt = DarkJwt;
//# sourceMappingURL=dark-jwt.js.map