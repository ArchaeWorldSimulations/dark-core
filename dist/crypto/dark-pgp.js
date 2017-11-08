"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var kbpgp = require("kbpgp");
//declare const kbpgp;
var DarkPgp = /** @class */ (function () {
    function DarkPgp() {
    }
    /**
     * Created a key pair for a user
     * @param {string} username
     * @returns {Promise<any>}
     */
    DarkPgp.createKeys = function (username) {
        return new Promise(function (resolve, reject) {
            kbpgp.KeyManager.generate_ecc({ userid: username }, function (err, keyPair) {
                if (err)
                    return reject(err);
                keyPair.sign({}, function (err) {
                    if (err)
                        return reject(err);
                    resolve(keyPair);
                });
            });
        });
    };
    /**
     * Encrypt an object with a public key
     * @param to the public key of the recipient
     * @param body the object to encrypt
     * @returns {Promise<string>}
     */
    DarkPgp.encrypt = function (to, message) {
        return new Promise(function (resolve, reject) {
            kbpgp.box({
                encrypt_for: to,
                msg: message
            }, function (err, encrypted) {
                if (err)
                    return reject(err);
                resolve(encrypted);
            });
        });
    };
    /**
     * Decrypt a message
     * @param keyManager an imported private key
     * @param {string} message
     * @returns {Promise<any>}
     */
    DarkPgp.decrypt = function (keyManager, message) {
        return new Promise(function (resolve, reject) {
            kbpgp.unbox({ keyfetch: keyManager, armored: message }, function (err, literals) {
                if (err)
                    return reject(err);
                resolve(literals[0].toString());
            });
        });
    };
    DarkPgp.importKey = function (key, password) {
        return new Promise(function (resolve, reject) {
            kbpgp.KeyManager.import_from_armored_pgp({
                armored: key
            }, function (err, keyPair) {
                if (err)
                    return reject(err);
                if (keyPair.is_pgp_locked()) {
                    if (!password)
                        return reject('Password is required for locked key');
                    keyPair.unlock_pgp({
                        passphrase: password
                    }, function (err) {
                        if (err)
                            return reject(err);
                        resolve(keyPair);
                    });
                }
                else {
                    resolve(keyPair);
                }
            });
        });
    };
    DarkPgp.exportPublicKey = function (keyPair) {
        return new Promise(function (resolve, reject) {
            keyPair.export_pgp_public({}, function (err, exportedPublicKey) {
                if (err)
                    return reject(err);
                resolve(exportedPublicKey);
            });
        });
    };
    DarkPgp.exportPrivateKey = function (keyPair, password) {
        return new Promise(function (resolve, reject) {
            keyPair.export_pgp_private({
                passphrase: password
            }, function (err, exportedPublicKey) {
                if (err)
                    return reject(err);
                resolve(exportedPublicKey);
            });
        });
    };
    return DarkPgp;
}());
exports.DarkPgp = DarkPgp;
//# sourceMappingURL=dark-pgp.js.map