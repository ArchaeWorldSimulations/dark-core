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
    DarkRequest.prototype.getMethod = function () {
        return this.packet.request.method;
    };
    DarkRequest.prototype.getRoute = function () {
        return this.packet.request.route;
    };
    DarkRequest.prototype.getParams = function () {
        return this.packet.request.params;
    };
    DarkRequest.prototype.getParam = function (name) {
        return this.packet.request.params[name];
    };
    DarkRequest.prototype.hasParam = function (name) {
        return !!this.packet.request.params[name];
    };
    DarkRequest.prototype.getFiles = function () {
        return this.packet.files;
    };
    DarkRequest.prototype.getFile = function (name) {
        return this.packet.files[name];
    };
    DarkRequest.prototype.hasFile = function (name) {
        return !!this.packet.files[name];
    };
    DarkRequest.prototype.setFiles = function (files) {
        this.packet.files = files;
        return this;
    };
    DarkRequest.prototype.addFile = function (name, content) {
        this.packet.files[name] = content;
        return this;
    };
    /* @Override */
    DarkRequest.prototype.setHeaders = function (headers) {
        _super.prototype.setHeaders.call(this, headers);
        return this;
    };
    /* @Override */
    DarkRequest.prototype.addHeader = function (name, value) {
        _super.prototype.addHeader.call(this, name, value);
        return this;
    };
    /* @Override */
    DarkRequest.prototype.setBody = function (body) {
        _super.prototype.setBody.call(this, body);
        return this;
    };
    DarkRequest.parse = function (packet) {
        return new DarkRequest(packet.request.method, packet.request.route, packet.request.params || {})
            .setFiles(packet.files || {}).setHeaders(packet.headers || {}).setBody(packet.body || {});
    };
    return DarkRequest;
}(dark_packet_1.DarkPacket));
exports.DarkRequest = DarkRequest;
//# sourceMappingURL=dark-request.js.map