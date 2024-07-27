import User from './../model/user.model.js';
import bcryptjs from "bcryptjs";
import Jwt from 'jsonwebtoken';
import { cookieOptions } from '../utils/cookie.js';
import { authenticateUser, authSignUpUser } from '../services/securityService.js';

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

        res.status(500).json({success: false, message: 'Internal Server Error'});
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
       const { jwtToken, userWithoutPassword } = await authenticateUser(email, password);

       res.cookie('access_token', jwtToken, userWithoutPassword)
            .status(200)
            .json({user: userWithoutPassword, token: jwtToken });
    } catch (error) {
        console.error('Sign-in error:', error.message);

        // Determine error status code
        const statusCode = error.statusCode || 500;
        const errorMessage = error.message || 'Internal Server Error';

        res.status(statusCode).json({ success: false, message: errorMessage });
    }
};

export const googleAuth = async (req, res, next) => {
    try {
        let user = await User.findOne({email: req.body.email});

        if (user) {
            const jwtToken = Jwt.sign({id: user._id}, process.env.JWT_SECRET);

            const { password: pass, ...rest} = user._doc;

            res.cookie('access_token', jwtToken, {
                httpOnly: true,
            })
            .status(200)
            .json(rest)
        } else {
            // Create password because google doesn't provide us with password for security reasson
            const generateRandPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            // Random password from 36 num & letters, then get the last eight digits to total of 16
            const hashedPassword = bcryptjs.hashSync(generateRandPassword, 12);

            const newUser = new User({
                username: req.body.name.split(" ").join("").toLowerCase(),
                email: req.body.email,
                password: hashedPassword, 
                avatar: req.body.photo
            });

            await newUser.save();

            const jwtToken = Jwt.sign({id: newUser._id}, process.env.JWT_SECRET);
            const { password: pass, ...rest } = newUser._doc;

            res.cookie('access_token', jwtToken, cookieOptions)
            .status(200)
            .json(rest)
        }
    } catch (error) {
        next(error);
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
        res.status(200).json('User has been logged out!');
    } catch (error) {
        next(error);
    }
};

export const githubAuth = async (req, res, next) => {
    try {
        let user = await User.findOne({email: req.body.email});

        if (user) {
            const jwtToken = Jwt.sign({id: user._id}, process.env.JWT_SECRET);

            const { password: pass, ...rest} = user._doc;

            res.cookie('access_token', jwtToken, cookieOptions)
            .status(200)
            .json(rest)
        } else {
            // Create password because the provider doesn't gives us the user password because of security reasson
            const generateRandPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            // Random password from 36 num & letters, then get the last eight digits to total of 16
            const hashedPassword = bcryptjs.hashSync(generateRandPassword, 12);

            const newUser = new User({
                username: req.body.name.split(" ").join("").toLowerCase(),
                email: req.body.email,
                password: hashedPassword, 
                avatar: req.body.photo
            });

            await newUser.save();

            const jwtToken = Jwt.sign({id: newUser._id}, process.env.JWT_SECRET);
            const { password: pass, ...rest } = newUser._doc;

            res.cookie('access_token', jwtToken, cookieOptions)
            .status(200)
            .json(rest)
        }
    } catch (error) {
        next(error);
    }
};