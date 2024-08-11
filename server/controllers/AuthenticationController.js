import { cookieAuthOptions, cookieOptions } from '../utils/cookie.js';
import { authenticateUser, authSignUpUser } from '../services/securityService.js';
import { githubAuthProvider, googleAuthProviderService } from '../services/MultiAuthManager.js';
import { errorHandler } from '../utils/error.js';
import { 
    AUTHENTICATION_SUCCESS,
    AUTHENTICATION_FAILURE,
    SERVER_ERROR,
    USER_SESSION_EXPIRED,
    TOKEN_FAILURE,
    TOKEN_SUCCESS 
}
    from '../helpers/ResponseStatus.js';

/**
 * Handles user sign-up by creating a new user account.
 * 
 * @param {Object} req - The Express request object.
 * @param {Object} req.body - The body of the request containing user data.
 * @param {string} req.body.username - The username provided by the user.
 * @param {string} req.body.email - The email provided by the user.
 * @param {string} req.body.password - The password provided by the user.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The Express next middleware function.
 * 
 * @returns {Promise<void>} - Sends a JSON response with the result of the sign-up process.
 */
export const signUp = async (req, res, next) => {
   try {
        const {username, email, password} = req.body;

        // Proceed business logic through service
        const result = await authSignUpUser({username, email, password });

        // Check result and send appropriate response
        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(400).json(result);
        }
   } catch (error) {
        console.error('Error occur:', error);

        next(error);

        res.status(500).json({success: false, message: SERVER_ERROR });
   }
};

/**
 * Authenticate user based on their email and password
 * 
 * @param {Object} req - The Express request object.
 * @param {Object} req.body - The body of the request containing user data.
 * @param {string} req.body.email - The email provided by the user.
 * @param {string} req.body.password - The password provided by the user.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The Express next middleware function.
 * 
 * @returns {Promise<void>} - Sends a JSON response with cookie and 
 * the result of the sign-in process.
 */
export const signIn = async (req, res, next) => {
    const {email, password} = req.body;

    try {
        
        const { success, token, user } = await authenticateUser({ email, password });
        
        if (success) {            
            res.cookie('access_token', token, cookieAuthOptions)
                .status(200)
                .json({ success: success, userData: user, token: token, message: AUTHENTICATION_SUCCESS })
            ;
        } else {
            res.status(401)
                .json({ success: false, message: AUTHENTICATION_FAILURE })
            ;
        }
    } catch (error) {
        console.error('Sign-in error:', error.message);

        res.status(500).json({ success: false, message: SERVER_ERROR });
    }
};

/**
 * Google Authentication Handler
 * This function handles the authentication process using Google credentials.
 * It generates a JWT token if the authentication is successful and returns it in a cookie.
 * 
 * @param {Request} req - Express request object containing the user's Google credentials in req.body.
 * @param {Response} res - Express response object used to send back the JWT token and user data.
 */
export const googleAuthentication = async (req, res) => {
    const { email, name, photo } = req.body;

    try {
        const { jwtToken, rest } = await googleAuthProviderService({ email, name, photo });

        if (!jwtToken) {
            next(errorHandler(400, TOKEN_FAILURE));
        }

        res.cookie("access_token", jwtToken, cookieOptions)
            .status(200)
            .json({ token: jwtToken, rest })
            // Add to the JsonResponse message: TOKEN_SUCCESS
        ;
    } catch (error) {
        console.error(error);

        const statusCode = error.statusCode || 500;
        const statusMessage = error.message || SERVER_ERROR;

        res.status(statusCode).json({ success: false, message: statusMessage });
    }
};

/**
 * GitHub Authentication Handler
 * This function handles the authentication process using 3-rd party GitHub auth.
 * It generates a JWT token if the authentication is successful and returns it in a cookie.
 * 
 * @param {Request} req - Express request object containing the user's Google credentials in req.body.
 * @param {Response} res - Express response object used to send back the JWT token and user data.
 */
export const githubAuth = async (req, res) => {
    const { email, name, photo } = req.body;

    try {
        const { jwtToken, rest } = await githubAuthProvider({ email, name, photo });

        if (!jwtToken) {
            next(errorHandler(400, TOKEN_FAILURE));
        }

        res.cookie("access_token", jwtToken, cookieOptions)
            .status(200)
            .json({ token: jwtToken, rest, message: TOKEN_SUCCESS });
    } catch (error) {
        console.error(error);

        const statusCode = error.statusCode || 500;
        const statusMessage = error.message || SERVER_ERROR;

        res.status(statusCode).json({ success: false, message: statusMessage });
    }
};

/**
 * Signout User from the system
 * 
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The Express next middleware function.
 * @returns {Promise<void>} - Clear cookie and send status with message
 *
*/
export const signOut = async (req, res, next) => {
    try {
        res.clearCookie('access_token');
        res.status(200).json(USER_SESSION_EXPIRED);
    } catch (error) {
        next(error);
    }
};
