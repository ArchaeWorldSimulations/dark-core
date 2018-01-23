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
        /*this.filters.sort((a, b) => {
            return a.filterOrder() > b.filterOrder() ? 1 : b.filterOrder() > a.filterOrder() ? -1 : 0;
        });*/
    };
    DarkNet.prototype.registerRoute = function (method, route, callback) {
        if (!this.routes[method.toUpperCase()])
            this.routes[method.toUpperCase()] = {};
        this.routes[method][route] = callback;
    };
    DarkNet.prototype.handleRequest = function (request) {
        var _this = this;
        console.log('handleRequest', request.build());
        return new Promise(function (resolve, reject) {
            console.log('runFilters');
            _this.runFilters(request).then(function () {
                console.log('runFilters resolved');
                if (!_this.routes[request.getMethod()]) {
                    console.log('Method not registered');
                    return reject();
                }
                if (!_this.routes[request.getMethod()][request.getRoute()]) {
                    console.log('Route not registered');
                    return reject();
                }
                _this.routes[request.getMethod()][request.getRoute()](request).then(function (response) {
                    resolve(response);
                }).catch(function (err) {
                    console.log('Route rejected');
                    reject(err);
                });
            }).catch(function (result) {
                console.log('runFilters rejected', result);
                reject(result);
            });
        });
    };
    DarkNet.prototype.runFilters = function (request) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var toRun = [];
            for (var i = 0; i < _this.filters.length; ++i) {
                if (_this.filters[i].shouldFilter(request)) {
                    console.log('Push filter promise');
                    toRun.push(_this.filters[i].run(request));
                }
            }
            Promise.all(toRun).then(function (values) {
                console.log('Filters all finished');
                for (var i = 0; i < values.length; ++i) {
                    console.log(values[i].filterName, values[i].success);
                    if (!values[i].success) {
                        return reject({filterName: values[i].filterName, success: values[i].success});
                    }
                }
                resolve({success: true});
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