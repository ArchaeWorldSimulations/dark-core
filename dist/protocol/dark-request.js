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
var DarkRequest = /** @class */ (function (_super) {
    __extends(DarkRequest, _super);
    function DarkRequest(method, route, params) {
        var _this = _super.call(this) || this;
        _this.packet.request = {
            method: method || 'get',
            route: route,
            params: params || {}
        };
        _this.packet.files = {};
        return _this;
    }
    DarkRequest.prototype.setFiles = function (files) {
        this.packet.files = files;
        return this;
    };
    DarkRequest.prototype.addFile = function (name, content) {
        this.packet.files[name] = content;
        return this;
    };
    return DarkRequest;
}(dark_packet_1.DarkPacket));
exports.DarkRequest = DarkRequest;
//# sourceMappingURL=dark-request.js.map