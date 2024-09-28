"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SERVER_ERROR = exports.OTP_VERIFIED_SUCCESS = exports.TOKEN_SUCCESS = exports.OTP_SUCCESS = exports.EXISTING_USERNAME = exports.EXISTING_EMAIL = exports.OTP_FAILED = exports.TOKEN_FAILURE = exports.USER_SESSION_EXPIRED = exports.USER_NOT_FOUND = exports.INVALID_CREDENTIALS = exports.AUTHENTICATION_SUCCESS = exports.AUTHENTICATION_FAILURE = void 0;
// Region Exceptions
exports.AUTHENTICATION_FAILURE = "Authentication Failed";
exports.AUTHENTICATION_SUCCESS = "Authentication Success";
exports.INVALID_CREDENTIALS = "Invalid Credentials";
exports.USER_NOT_FOUND = "User Not Found!";
exports.USER_SESSION_EXPIRED = "Session Expired";
exports.TOKEN_FAILURE = "Token Generation Failed";
exports.OTP_FAILED = "Invalid / Expired OTP";
exports.EXISTING_EMAIL = "Email Already Registered";
exports.EXISTING_USERNAME = "Username Already Registered";
// Region Success
exports.OTP_SUCCESS = "OTP Successfully Sended";
exports.TOKEN_SUCCESS = "Token Successfully Generated";
exports.OTP_VERIFIED_SUCCESS = "OTP Verified Successfully";
// Region Server
exports.SERVER_ERROR = "Internal Server Error";
