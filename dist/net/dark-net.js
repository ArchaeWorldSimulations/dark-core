"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dark_request_1 = require("../protocol/dark-request");
/**
 *
 */
var DarkNet = /** @class */ (function () {
    function DarkNet() {
        this.routes = {};
    }
    DarkNet.prototype.registerRoute = function (method, route, callback) {
        this.routes[method.toUpperCase()] = {};
        this.routes[method][route] = callback;
    };
    DarkNet.prototype.handleRequest = function (request) {
        var _this = this;
        return new Promise(function (resolve, reject) {
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
    DarkNet.prototype.handleEncryptedRequest = function (keyManager, to, request) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            dark_request_1.DarkRequest.decrypt(keyManager, request).then(function (decrypted) {
                _this.handleRequest(decrypted).then(function (response) {
                    response.encrypt(to).then(function (encryptedResponse) {
                        resolve(encryptedResponse);
                    }).catch(function (err) {
                        reject(err);
                    });
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