"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dark_request_1 = require("../protocol/dark-request");
/**
 *
 */
var DarkNet = /** @class */ (function () {
    function DarkNet() {
        this.routes = {};
        this.filters = [];
    }

    DarkNet.prototype.registerFilter = function (filter) {
        this.filters.push(filter);
        this.filters.sort(function (a, b) {
            return a.filterOrder() > b.filterOrder() ? 1 : b.filterOrder() > a.filterOrder() ? -1 : 0;
        });
    };
    DarkNet.prototype.runFilters = function (request, type) {
        if (!type)
            type = 'pre';
        for (var i = 0; i < this.filters.length; ++i) {
            if (this.filters[i].filterType() !== type)
                continue;
            if (this.filters[i].shouldFilter(request)) {
                if (!this.filters[i].run(request)) {
                    return {success: false, filterName: this.filters[i].constructor.name};
                }
            }
        }
        return {success: true};
    };
    DarkNet.prototype.registerRoute = function (method, route, callback) {
        if (!this.routes[method.toUpperCase()])
            this.routes[method.toUpperCase()] = {};
        this.routes[method][route] = callback;
    };
    DarkNet.prototype.handleRequest = function (request) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var filterResult = _this.runFilters(request, 'pre');
            if (!filterResult.success) {
                return reject(filterResult);
            }
            if (!_this.routes[request.getMethod()])
                return reject();
            if (!_this.routes[request.getMethod()][request.getRoute()])
                return reject();
            _this.routes[request.getMethod()][request.getRoute()](request).then(function (response) {
                resolve(response);
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    DarkNet.prototype.handleEncryptedRequest = function (keyManager, request) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            dark_request_1.DarkRequest.decrypt(keyManager, request).then(function (decrypted) {
                _this.handleRequest(decrypted).then(function (response) {
                    resolve(response);
                }).catch(function (err) {
                    reject(err);
                });
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    return DarkNet;
}());
exports.DarkNet = DarkNet;
//# sourceMappingURL=dark-net.js.map