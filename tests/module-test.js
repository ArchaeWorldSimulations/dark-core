var DarkRequest = require('..').DarkRequest;

var testRequest1 = new DarkRequest('get', 'handle', {param1: 'a'}).addHeader('auth-token', 'abc').build();
var testRequest2 = new DarkRequest('get', 'handle').build();

console.log('Request 1:', testRequest1);
console.log('Request 2:', testRequest2);