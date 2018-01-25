"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
var jsonwebtoken_1 = require("jsonwebtoken");
var DarkJwt = /** @class */ (function () {
    function DarkJwt() {
    }

    DarkJwt.createJwt = function (content, secret) {
        return jsonwebtoken_1.jwt.sign(content, secret);
    };
    DarkJwt.verifyJwt = function (token, secret) {
        return jsonwebtoken_1.jwt.verify(token, secret);
    };
    return DarkJwt;
}());
exports.DarkJwt = DarkJwt;
//# sourceMappingURL=dark-jwt.js.map