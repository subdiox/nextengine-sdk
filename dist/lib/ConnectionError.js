"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConnectionError extends Error {
    constructor(message, code, response) {
        super(message);
        this.code = code;
        this.response = response;
    }
}
exports.default = ConnectionError;
