"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signOut = exports.githubAuth = exports.googleAuthentication = exports.signIn = exports.signUp = void 0;
const Cookie_1 = require("utils/Cookie");
const Security_1 = require("services/Security");
const AuthManager_1 = require("services/AuthManager");
const Error_1 = require("utils/Error");
const ResponseStatus_1 = require("helpers/ResponseStatus");
/**
 * Handles user sign-up by creating a new user account.
 */
const signUp = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        // Proceed business logic through service
        const result = await (0, Security_1.authSignUpUser)({ username, email, password });
        // Check result and send appropriate response
        if (result.success) {
            res.status(200).json(result);
        }
        else {
            res.status(400).json(result);
        }
    }
    catch (error) {
        console.error('Error occur:', error);
        next(error);
        res.status(500).json({ success: false, message: ResponseStatus_1.SERVER_ERROR });
    }
};
exports.signUp = signUp;
/**
 * Authenticate user based on their email and password
 */
const signIn = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const response = await (0, Security_1.authSignInUser)({ email, password });
        if (response?.success) {
            const { token, user } = response;
            if (token) {
                res.cookie('access_token', token, Cookie_1.cookieAuthOptions)
                    .status(200)
                    .json({
                    success: true,
                    token: token,
                    userData: user,
                    message: response.message ?? ResponseStatus_1.AUTHENTICATION_SUCCESS
                });
            }
            else {
                res.status(401).json({
                    success: false,
                    message: ResponseStatus_1.AUTHENTICATION_FAILURE
                });
            }
        }
        else {
            res.status(401).json({
                success: false,
                message: response.message ?? ResponseStatus_1.AUTHENTICATION_FAILURE
            });
        }
    }
    catch (error) {
        console.error('Sign-in error:', error);
        next(error);
        res.status(500).json({ success: false, message: ResponseStatus_1.SERVER_ERROR });
    }
};
exports.signIn = signIn;
/**
 * Google Authentication Handler
 * This function handles the authentication process using Google credentials.
 * It generates a JWT token if the authentication is successful and returns it in a cookie.
 *
 * @param {Request} req - Express request object containing the user's Google credentials in req.body.
 * @param {Response} res - Express response object used to send back the JWT token and user data.
 */
const googleAuthentication = async (req, res, next) => {
    const { email, name, photo } = req.body;
    const sanitizedData = {
        email: xssFilters.inHTMLData(email),
        name: xssFilters.inHTMLData(name),
        photo: xssFilters.inHTMLData(photo)
    };
    try {
        const { jwtToken, rest } = await (0, AuthManager_1.googleAuthProviderService)(sanitizedData);
        if (!jwtToken) {
            next((0, Error_1.errorHandler)(400, ResponseStatus_1.TOKEN_FAILURE));
        }
        res.cookie("access_token", jwtToken, Cookie_1.cookieOptions)
            .status(200)
            .json({ token: jwtToken, rest });
    }
    catch (error) {
        console.error(error);
        res.status(401).json({ success: false, message: 'Authorization Failure' });
    }
};
exports.googleAuthentication = googleAuthentication;
/**
 * GitHub Authentication Handler
 * This function handles the authentication process using 3-rd party GitHub auth.
 * It generates a JWT token if the authentication is successful and returns it in a cookie.
 *
 * @param {Request} req - Express request object containing the user's Google credentials in req.body.
 * @param {Response} res - Express response object used to send back the JWT token and user data.
 */
const githubAuth = async (req, res, next) => {
    const { email, name, photo } = req.body;
    try {
        const { jwtToken, rest } = await (0, AuthManager_1.githubAuthProvider)({ email, name, photo });
        if (!jwtToken) {
            next((0, Error_1.errorHandler)(400, ResponseStatus_1.TOKEN_FAILURE));
        }
        res.cookie("access_token", jwtToken, Cookie_1.cookieOptions)
            .status(200)
            .json({ token: jwtToken, rest, message: ResponseStatus_1.TOKEN_SUCCESS });
    }
    catch (error) {
        console.error(error);
        res.status(401).json({ success: false, message: 'Authorization Failure' });
    }
};
exports.githubAuth = githubAuth;
/**
 * Signout User from the system
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The Express next middleware function.
 * @returns {Promise<void>} - Clear cookie and send status with message
 *
*/
const signOut = async (req, res, next) => {
    try {
        res.clearCookie('access_token');
        res.status(200).json(ResponseStatus_1.USER_SESSION_EXPIRED);
    }
    catch (error) {
        next(error);
    }
};
exports.signOut = signOut;
