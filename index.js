
var kbpgp = require('kbpgp');

module.exports = function () {
    var DarkRequest = function () {
        var self = this;
        var request = {
            request: {
                method: null,
                route: null,
                params: {}
            },
            headers: {},
            body: {}
        };

        function constructor(method, route, params) {
            request.request.method = method || 'get';
            request.request.route = route;
            request.request.params = params;
            return self;
        }

        function setHeaders(headers) {
            request.headers = headers;
            return self;
        }

        function addHeader(key, value) {
            request.headers[key] = value;
            return self;
        }

        function setBody(body) {
            request.body = body;
            return self;
        }

        function build() {
            return request;
        }
    };

    function buildRequest(method, route, params) {
        return new DarkRequest(method, route, params);
    }
};

//var request = DarkCore.buildRequest('method', 'route', {params}).setHeaders({}).addHeader(key, val).setBody({}).build();