import xssFilters from 'xss-filters';
import { body, validationResult } from 'express-validator';

const usernameRegex = /^[a-zA-Z0-9_]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

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

export const validate = (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next();
};