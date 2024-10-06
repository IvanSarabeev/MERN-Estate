import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import xssFilters from 'xss-filters';
import { passwordRegex, usernameRegex } from 'models/Regex';

/**
 * @property {'username', 'email', 'password'}
 * @returns {array} - Validate User Credentials to Procced to Registration
 */
export const validationSignUpData = () => {
    return [
        body('username')
            .trim()
            .isLength({min: 3, max: 20 }).withMessage("Username must be between 3 and 20 characters.")
            .matches(usernameRegex).withMessage('Username can only contain letters, numbers, and underscores.')
            .customSanitizer(value => xssFilters.inHTMLData(value)),
        
        body('email')
            .isEmail().withMessage("Invalid email address.")
            .isLength({ min: 5, max: 35 }).withMessage('Email must be between 5 and 35 characters.')
            .customSanitizer(value => xssFilters.inHTMLData(value)),
    
        body('password')
            .isLength({ min: 8, max: 20 }).withMessage('Password must be between 8 and 20 characters.')
            .matches(passwordRegex)
            .withMessage('Password must include one uppercase letter, one lowercase letter, one number, and one special character.')
            .customSanitizer(value => xssFilters.inHTMLData(value)),
    ];
};

/**
 * @property {'email', 'password'} - input propertyes
 * @returns {array} - Validate User Credentials
 */
export const validateUserAuthentication = () => {
    return [
        body('email')
            .isEmail().withMessage("Invalid email address!")
            .isLength({min: 5, max: 35}).withMessage("Email must be between 5 and 35 characters!")
            .customSanitizer(value => xssFilters.inHTMLData(value)),

        body('password')
            .isLength({ min: 6, max: 20 }).withMessage('Password must be between 8 and 20 characters.')
            .withMessage('Password must include one uppercase letter, one lowercase letter, one number, and one special character.')
            .customSanitizer(value => xssFilters.inHTMLData(value)),
    ];
};

/**
 * @property {'email', 'name', 'photo'}
 * @returns {Array} - Validate User's Thrird Party Credentials Providers
 */
export const validateThirdPartyConstraints = () => {
    return [
        body('email')
            .trim()
            .isEmail().withMessage("Invalid email address")
            .isLength({ min: 5, max: 35 }).withMessage("Email must be between 5 and 35 characters.")
            .customSanitizer(value => xssFilters.inHTMLData(value)),
        body('name')
            .trim()
            .isLength({ min: 3, max: 20 }).withMessage("Name must be between 3 and 20 characters.")
            .matches(usernameRegex).withMessage("Can only contain letters, numbers and underscores.")
            .customSanitizer(value => xssFilters.inHTMLData(value)),
        body('photo')
            .trim()
            .isLength({ min: 5, max: 50 }).withMessage("Photo must be a valid link")
            .customSanitizer(value => xssFilters.inHTMLData(value))
    ];
};

/**
 * Validate incoming input data from Request 
 * 
 * @param req Get all incoming req.body (data)
 * @param res Send response if the input data isn't correct
 * @param next Go to next exception middleware
 * @returns Continue or Array
 */
export const validateAuth = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    
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