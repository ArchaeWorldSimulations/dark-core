"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
var notp = require("notp");
var DarkOtp = /** @class */ (function () {
    function DarkOtp() {
    }
    DarkOtp.generateToken = function (key) {
        return notp.totp.gen(key);
    };
    DarkOtp.verifyToken = function (token, key) {
        return notp.totp.verify(token, key);
    };
    return DarkOtp;
}());
exports.DarkOtp = DarkOtp;
//# sourceMappingURL=dark-otp.js.map