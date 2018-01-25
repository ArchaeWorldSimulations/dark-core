"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
var js_sha3_1 = require("js-sha3");
var DarkHash = /** @class */ (function () {
    function DarkHash() {
    }
    DarkHash.createHash = function (value) {
        return js_sha3_1.keccak512(value);
    };
    return DarkHash;
}());
exports.DarkHash = DarkHash;
//# sourceMappingURL=dark-hash.js.map