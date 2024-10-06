import { NextFunction, Request, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";
import { phoneRegex } from "models/Regex";
import xssFilters from 'xss-filters';

/**
 * @property {'username', 'email', 'password'}
 * @returns {Array<ValidationChain>} - Validate User Credentials to Proceed to Registration
 */
export const validateContactFormData = (): Array<ValidationChain> => {
    return [
      body('first_name')
          .trim()
          .isLength({ min: 5, max: 15 }).withMessage("First name must be between 5 and 15 characters.")
          .customSanitizer(value => xssFilters.inHTMLData(value)),
        body('last_name')
            .trim()
            .isLength({ min: 5, max: 15 }).withMessage("First name must be between 5 and 15 characters.")
            .customSanitizer(value => xssFilters.inHTMLData(value)),
        body('email')
            .trim()
            .isEmail().withMessage("Invalid email address")
            .isLength({min: 5, max: 35}).withMessage("Email must be between 5 and 35 characters.")
            .customSanitizer(value => xssFilters.inHTMLData(value)),
        body('phone')
            .trim()
            .isLength({ min: 5, max: 15 }).withMessage("First name must be between 5 and 15 characters.")
            .matches(phoneRegex).withMessage("Can only contain numbers.")
            .customSanitizer(value => xssFilters.inHTMLData(value)),
        body('text_message')
            .isLength({ min: 20, max: 200 }).withMessage("Minimum 20 characters")
            .customSanitizer(value => xssFilters.inHTMLData(value))
    ];
}

/**
 * Validate incoming input data from Request 
 * 
 * @param req Get all incoming req.body (data)
 * @param res Send response if the input data isn't correct
 * @param next Go to next exception middleware
 * @returns {void} - Continue or send validation errors
 */
export const validateCommon = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({
            status: false,
            errors: errors.array().map((err) => ({
                type: err.type,
                message: err.msg
            }))
        });

        return;
    }

    next();
};