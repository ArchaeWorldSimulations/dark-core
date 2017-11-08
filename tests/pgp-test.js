var DarkPgp = require('..').DarkPgp;

DarkPgp.createKeys('testuser').then(function (keyManager) {
    DarkPgp.exportPublicKey(keyManager).then(function (exportedKey) {
        DarkPgp.importKey(exportedKey).then(function (k) {
            console.log('Imported key');
        }).catch(function (err) {
            console.error('err', err);
        });
    }).catch(function (err) {
        console.error('err', err);
    });

    DarkPgp.exportPrivateKey(keyManager).then(function (exportedKey) {
        DarkPgp.importKey(exportedKey).then(function (k) {
            console.log('Imported key');
        }).catch(function (err) {
            console.error('err', err);
        });
    }).catch(function (err) {
        console.error('err', err);
    });

    DarkPgp.exportPrivateKey(keyManager, 'abc123').then(function (exportedKey) {
        DarkPgp.importKey(exportedKey, 'abc123').then(function (k) {
            console.log('Imported key');
        }).catch(function (err) {
            console.error('err', err);
        });
    }).catch(function (err) {
        console.error('err', err);
    });


}).catch(function (err) {
    console.error('err', err);
});

