"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyCaptcha = void 0;
const axios_1 = __importDefault(require("axios"));
const verifyCaptcha = async (token) => {
    try {
        const secret = process.env.CAPTCHA_SECRET;
        const response = await axios_1.default.post(`https://hcaptcha.com/siteverify`, new URLSearchParams({
            secret: "",
            response: token
        }).toString(), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data.success;
    }
    catch (error) {
        console.error('Error verifying CAPTCHA:', error);
        return false;
    }
};
exports.verifyCaptcha = verifyCaptcha;
