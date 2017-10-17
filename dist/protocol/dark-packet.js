"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        return this.packet;
    };
    return DarkPacket;
}());
exports.DarkPacket = DarkPacket;
//# sourceMappingURL=dark-packet.js.map