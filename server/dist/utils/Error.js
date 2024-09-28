"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (statusCode, message) => {
    return {
        success: false,
        statusCode: statusCode,
        message: message,
    };
};
exports.errorHandler = errorHandler;
