import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import xssFilters from 'xss-filters';
import { passwordRegex, usernameRegex } from 'models/Regex';

/**
 * @property {'username', 'email', 'password'} - input propertyes
 * @returns {array} - Validate user input data with constraint rules
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
 * @returns {array} - Validate user input data with constraint rules
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

export const sanitizerListingData = (req: Request, res: Response, next: NextFunction) => {
    const sanitizedData: Record<string, any> = {};

    for (const key in req.body) {
        if (Object.hasOwn(req.body, key)) {
            sanitizedData[key] = xssFilters.inHTMLData(req.body[key]);
        }
    }

    req.body = sanitizedData;

    next();
};

export const validate = (req: Request, res: Response, next: NextFunction) => {
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