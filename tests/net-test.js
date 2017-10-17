var DarkCore = require('../index');

// Create a new DarkNet instance
var darkNet = new DarkCore.DarkNet();

// Register a route handler, the handler must return a promise that resolves a DarkResponse
darkNet.registerRoute('get', 'test', function (req) {
    return new Promise(function (resolve, reject) {
        var response = new DarkCore.DarkResponse(200).addHeader('test', 'good!');
        resolve(response);
    });
});

// Create a dummy request and "build" it into an object
var request = new DarkCore.DarkRequest('get', 'test').build();

// Parse the object back to a DarkRequest
var parsedRequest = DarkCore.DarkRequest.parse(request);

// Test our route handler with our DarkRequest
darkNet.handleRequest(parsedRequest).then(function (response) {
    console.log('Success', response.build());
}).catch(function (err) {
   console.log('Err', err);
});