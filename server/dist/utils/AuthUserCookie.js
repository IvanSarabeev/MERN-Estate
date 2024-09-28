"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Error_1 = require("utils/Error");
const verifyToken = (req, res, next) => {
    const cookieToken = req.cookies.acces_token;
    if (!cookieToken) {
        return next((0, Error_1.errorHandler)(401, 'Fatal: Unautorized'));
    }
    jsonwebtoken_1.default.verify(cookieToken, process.env.JWT_SECRET ?? '', (error) => {
        if (error) {
            return next((0, Error_1.errorHandler)(403, 'Forbidden'));
        }
        next();
    });
};
exports.verifyToken = verifyToken;
