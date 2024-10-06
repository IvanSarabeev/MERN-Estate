import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

/**
 * @property {'email', 'otpCode'} - input data
 * @returns {Array} - Validate Email OTP 
 */
export const validateEmailOtp = () => {
    return [
        body('email')
            .trim()
            .isEmail().withMessage("Invalid email address")
            .isLength({ min: 5, max: 35 }).withMessage("Email must be between 5 and 35 characters")
            .customSanitizer(value => xssFilters.inHTMLData(value)),
        body('otp')
            .trim()
            .isLength({ max: 6 }).withMessage("Invalid Code")
            .custom(value => xssFilters.inHTMLData(value))
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
export const validateOtp = (req: Request, res: Response, next: NextFunction) => {
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
}