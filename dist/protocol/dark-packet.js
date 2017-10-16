"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DarkPacket = /** @class */ (function () {
    function DarkPacket() {
        this.packet = {
            headers: {},
            body: {},
        };
        return this;
    }
    DarkPacket.prototype.setHeaders = function (headers) {
        this.packet.headers = headers;
        return this;
    };
    DarkPacket.prototype.addHeader = function (key, value) {
        this.packet.headers[key] = value;
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