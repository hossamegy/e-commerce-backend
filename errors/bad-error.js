const statusCode = require('http-status-codes');

class BadRequest extends Error {
    constructor(message) {
        super(message);
        this.statusCode = statusCode.BAD_REQUEST;
    }
}

module.exports = BadRequest;
