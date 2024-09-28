"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.sanitizerListingData = exports.validateUserAuthentication = exports.validationSignUpData = void 0;
const express_validator_1 = require("express-validator");
const xss_filters_1 = __importDefault(require("xss-filters"));
const Regex_1 = require("models/Regex");
/**
 * @property {'username', 'email', 'password'} - input propertyes
 * @returns {array} - Validate user input data with constraint rules
 */
const validationSignUpData = () => {
    return [
        (0, express_validator_1.body)('username')
            .trim()
            .isLength({ min: 3, max: 20 }).withMessage("Username must be between 3 and 20 characters.")
            .matches(Regex_1.usernameRegex).withMessage('Username can only contain letters, numbers, and underscores.')
            .customSanitizer(value => xss_filters_1.default.inHTMLData(value)),
        (0, express_validator_1.body)('email')
            .isEmail().withMessage("Invalid email address.")
            .isLength({ min: 5, max: 35 }).withMessage('Email must be between 5 and 35 characters.')
            .customSanitizer(value => xss_filters_1.default.inHTMLData(value)),
        (0, express_validator_1.body)('password')
            .isLength({ min: 8, max: 20 }).withMessage('Password must be between 8 and 20 characters.')
            .matches(Regex_1.passwordRegex)
            .withMessage('Password must include one uppercase letter, one lowercase letter, one number, and one special character.')
            .customSanitizer(value => xss_filters_1.default.inHTMLData(value)),
    ];
};
exports.validationSignUpData = validationSignUpData;
/**
 * @property {'email', 'password'} - input propertyes
 * @returns {array} - Validate user input data with constraint rules
 */
const validateUserAuthentication = () => {
    return [
        (0, express_validator_1.body)('email')
            .isEmail().withMessage("Invalid email address!")
            .isLength({ min: 5, max: 35 }).withMessage("Email must be between 5 and 35 characters!")
            .customSanitizer(value => xss_filters_1.default.inHTMLData(value)),
        (0, express_validator_1.body)('password')
            .isLength({ min: 6, max: 20 }).withMessage('Password must be between 8 and 20 characters.')
            .withMessage('Password must include one uppercase letter, one lowercase letter, one number, and one special character.')
            .customSanitizer(value => xss_filters_1.default.inHTMLData(value)),
    ];
};
exports.validateUserAuthentication = validateUserAuthentication;
const sanitizerListingData = (req, res, next) => {
    const sanitizedData = {};
    for (const key in req.body) {
        if (Object.hasOwn(req.body, key)) {
            sanitizedData[key] = xss_filters_1.default.inHTMLData(req.body[key]);
        }
    }
    req.body = sanitizedData;
    next();
};
exports.sanitizerListingData = sanitizerListingData;
const validate = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            status: false,
            errors: errors.array().map(err => ({
                fields: err.type,
                message: err.msg
            }))
        });
        return;
    }
    next();
};
exports.validate = validate;
