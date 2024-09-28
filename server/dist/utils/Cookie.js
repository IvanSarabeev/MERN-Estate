"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookieAuthOptions = exports.cookieOptions = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const CookieEnum_1 = require("types/enums/CookieEnum");
dotenv_1.default.config();
const isProduction = process.env.NODE_ENV === "production";
const sessionLifeTime = isProduction ? (6000 * 60) : 3600000;
// Cookie Configuration
exports.cookieOptions = {
    maxAge: sessionLifeTime,
    httpOnly: true,
    sameSite: isProduction ? CookieEnum_1.CookieSiteEnum.Strict : 'strict',
    secure: isProduction,
};
exports.cookieAuthOptions = {
    maxAge: sessionLifeTime,
    httpOnly: true,
    sameSite: isProduction ? CookieEnum_1.CookieSiteEnum.Lax : 'lax',
    secure: isProduction,
};
