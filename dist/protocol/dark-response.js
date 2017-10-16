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
    return DarkResponse;
}(dark_packet_1.DarkPacket));
exports.DarkResponse = DarkResponse;
//# sourceMappingURL=dark-response.js.map