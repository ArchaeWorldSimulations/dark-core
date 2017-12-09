"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var dark_packet_1 = require("./dark-packet");
var DarkResponse = /** @class */ (function (_super) {
    __extends(DarkResponse, _super);
    function DarkResponse(status) {
        var _this = _super.call(this) || this;
        _this.packet.response = {
            status: status || 200
        };
        return _this;
    }
    DarkResponse.prototype.getStatus = function () {
        return this.packet.response.status;
    };
    /* @Override */
    DarkResponse.prototype.setHeaders = function (headers) {
        _super.prototype.setHeaders.call(this, headers);
        return this;
    };
    /* @Override */
    DarkResponse.prototype.addHeader = function (name, value) {
        _super.prototype.addHeader.call(this, name, value);
        return this;
    };
    /* @Override */
    DarkResponse.prototype.setBody = function (body) {
        _super.prototype.setBody.call(this, body);
        return this;
    };
    /* @Override */
    DarkResponse.decrypt = function (keyManager, encrypted) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _super.decrypt.call(_this, keyManager, encrypted).then(function (decrypted) {
                resolve(DarkResponse.parse(decrypted));
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    DarkResponse.parse = function (packet) {
        var p = packet.dtp || packet;
        return new DarkResponse(p.response.status)
            .setHeaders(p.headers || {}).setBody(p.body || {});
    };
    return DarkResponse;
}(dark_packet_1.DarkPacket));
exports.DarkResponse = DarkResponse;
//# sourceMappingURL=dark-response.js.map