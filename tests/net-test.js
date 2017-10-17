var DarkCore = require('../index');

// Create a new DarkNet instance
var darkNet = new DarkCore.DarkNet();

// Register a route handler, the handler must return a promise that resolves a DarkResponse
darkNet.registerRoute(DarkCore.DarkRequest.GET, 'test', function (req) {
    return new Promise(function (resolve, reject) {
        var response = new DarkCore.DarkResponse(200).addHeader('test', 'good!').setBody({
            handled: true
        });
        resolve(response);
    });
});

// Create a dummy request and "build" it into an object
var request = new DarkCore.DarkRequest(DarkCore.DarkRequest.GET, 'test').setBody({
    unhandled: true
}).build();
console.log('request', request);

// Parse the object back to a DarkRequest
var parsedRequest = DarkCore.DarkRequest.parse(request);

// Test our route handler with our DarkRequest
darkNet.handleRequest(parsedRequest).then(function (response) {
    console.log('Success', response.build());
}).catch(function (err) {
   console.log('Err', err);
});

/**
 * Encryption tests
 */

//
// Create keys for alice
//
DarkCore.DarkPgp.createKeys('alice').then(function (alice) {

    //
    // Create keys for chuck
    //
    DarkCore.DarkPgp.createKeys('chuck').then(function (chuck) {

        //
        // Encrypted our request for chuck
        //
        parsedRequest.encrypt(chuck).then(function (encryptedRequest) {

            console.log('encrypted request', encryptedRequest);

            //
            // Pass our request to the handler to decrypt with chuck and encrypt response for alice
            //
            darkNet.handleEncryptedRequest(chuck, alice, encryptedRequest).then(function (encryptedResponse) {

                console.log('encrypted response', encryptedResponse);

                //
                // Decrypt our response for alice
                //
                DarkCore.DarkResponse.decrypt(alice, encryptedResponse).then(function (decryptedResponse) {

                    console.log('decrypted response', decryptedResponse.build());

                    //
                    // FINISHED!
                    //

                }).catch(function (err) {
                    console.log('decrypt err', err);
                });
            }).catch(function (err) {
                console.log('handleEncryptedRequest err', err);
            });
        }).catch(function (err) {
           console.log('encrypt err', err);
        });
    }).catch(function (err) {
        console.log('createKeys chuck err', err);
    });
}).catch(function (err) {
    console.log('createKeys alice err', err);
});