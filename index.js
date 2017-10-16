var DarkPgp = require('./dist/crypto/dark-pgp').DarkPgp,
    DarkRequest = require('./dist/protocol/dark-request').DarkRequest,
    DarkResponse = require('./dist/protocol/dark-response').DarkResponse;

module.exports = {
    DarkPgp: DarkPgp,
    DarkRequest: DarkRequest,
    DarkResponse: DarkResponse
};