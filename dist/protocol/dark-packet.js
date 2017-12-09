"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dark_pgp_1 = require("../crypto/dark-pgp");
/**
 *
 */
var DarkPacket = /** @class */ (function () {
    function DarkPacket() {
        this.packet = {
            headers: {},
            body: {},
        };
    }
    DarkPacket.prototype.getHeaders = function () {
        return this.packet.headers;
    };
    DarkPacket.prototype.getHeader = function (name) {
        return this.packet.headers[name];
    };
    DarkPacket.prototype.hasHeader = function (name) {
        return !!this.packet.headers[name];
    };
    DarkPacket.prototype.getBody = function () {
        return this.packet.body;
    };
    DarkPacket.prototype.setHeaders = function (headers) {
        this.packet.headers = headers;
        return this;
    };
    DarkPacket.prototype.addHeader = function (name, value) {
        this.packet.headers[name] = value;
        return this;
    };
    DarkPacket.prototype.setBody = function (body) {
        this.packet.body = body;
        return this;
    };
    DarkPacket.prototype.build = function () {
        return {dtp: this.packet};
    };
    DarkPacket.prototype.encrypt = function (to) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            dark_pgp_1.DarkPgp.encrypt(to, JSON.stringify(_this.getPacket())).then(function (encrypted) {
                resolve({ dtp: encrypted });
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    DarkPacket.prototype.getPacket = function () {
        return this.packet;
    };
    DarkPacket.decrypt = function (keyManager, encrypted) {
        return new Promise(function (resolve, reject) {
            dark_pgp_1.DarkPgp.decrypt(keyManager, encrypted.dtp || encrypted).then(function (decrypted) {
                resolve(JSON.parse(decrypted));
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    return DarkPacket;
}());
exports.DarkPacket = DarkPacket;
//# sourceMappingURL=dark-packet.js.map