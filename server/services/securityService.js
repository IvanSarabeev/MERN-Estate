import xssFilters from "xss-filters";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import Jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import crypto from "crypto";
import { sendVerificationEmail } from './verifyEmailService.js';
import { EXISTING_EMAIL, EXISTING_USERNAME, INVALID_CREDENTIALS, OTP_SUCCESS, USER_NOT_FOUND } from './../helpers/ResponseStatus.js';

dotenv.config();

/**
 * Authenticates a user by sanitizing input data, validating credentials,
 * and generating a JWT token upon successful authentication.
 * 
 * @param {object} formData - User provided data for creating an authentication
 * @param {string} formData.email - The email address of the user
 * @param {string} formData.password - The password of the user
 * @throws {Error} - Throws an error if an issue occur during the process.
 * @returns {Promise<Object>} - An object containing JWT Token and user data
 */
export const authenticateUser= async (formData) => {
    try {
        // Sanitize input data to prevent XSS atacks 
        const sanitizeData = {
            email: xssFilters.inHTMLData(formData.email).trim(),
            password: xssFilters.inHTMLData(formData.password).trim()
        };

        // Find user by their email
        const validUser = await User.findOne({email: sanitizeData.email});

        if (!validUser) {
            return errorHandler(404, USER_NOT_FOUND);
        }

        // Validate user password
        const isPasswordValid = bcryptjs.compareSync(sanitizeData.password, validUser.password);

        if (!isPasswordValid) {
            return errorHandler(401, INVALID_CREDENTIALS);
        }

        // Generate JWT token
        const jwtToken = Jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

        // Exclude password from user data
        const { password: pass, ...userWithoutPassword } = validUser._doc;

        return { success: true, token: jwtToken, user: userWithoutPassword };
    } catch (error) {
        console.error(`Error occur: ${error}`);

        return { success: false, message: INVALID_CREDENTIALS };
    }
};

/**
 * Login user by sanitizing their input data, validating credentials,
 * hashing their password and saving their information in the Database
 * 
 * @param {object} formData - User provided data for signing in the system
 * @param {string} formData.username - The username of the user
 * @param {string} formData.email - The email address of the user
 * @param {string} formData.password - The password of the user
 * @returns {Promise<Object>} - An object containing status with message
 */
export const authSignUpUser = async (formData) => {
    try {
        const {username, email, password } = formData;
        
        const sanitizeData = {
            username: xssFilters.inHTMLData(username),
            email: xssFilters.inHTMLData(email),
            password: xssFilters.inHTMLData(password)
        };

        const hashedPassword = bcryptjs.hashSync(sanitizeData.password, 12);

        // Generate OTP
        const otp = crypto.randomInt(100000, 999999).toString();
        const otpExpires = Date.now() + 5 * 60 * 1000; // OTP expiration time 5 min

        const newUser = new User({
            username: sanitizeData.username,
            email: sanitizeData.email,
            password: hashedPassword,
            otp,
            otpExpires
        });

        const existingUser = await User.findOne({
            $or: [
                { email: sanitizeData.email },
                { username: sanitizeData.username }
            ]
        });

        if (existingUser) {
            if (existingUser.email === sanitizeData.email) return { success: false, message: EXISTING_EMAIL };
            if (existingUser.username === sanitizeData.username) return { success: false, message: EXISTING_USERNAME };
            else return true;
        }

        // Send OTP via email
        await sendVerificationEmail(sanitizeData.email, otp);
        
        await newUser.save();

        return { success: true, message: OTP_SUCCESS};
    } catch (error) {
        console.error(`Error occur: ${error}`);

        return { success: false, message: INVALID_CREDENTIALS };
    }
};