import xssFilters from "xss-filters";
import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import Jwt from 'jsonwebtoken';
import dotenv from "dotenv";

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
        const { email, password } = formData;

        // Sanitize input data to prevent XSS atacks 
        const sanitizeData = {
            email: xssFilters.inHTMLData(email),
            password: xssFilters.inHTMLData(password)
        };

        // Find user by their email
        const validUser = await User.findOne({email: sanitizeData.email});

        if (!validUser) {
            return errorHandler(404, "User not found!");
        }

        // Validate user password
        const isPasswordValid = bcryptjs.compareSync(sanitizeData.password, validUser.password);

        if (!isPasswordValid) {
            return errorHandler(401, "Invalid credentials!");
        }

        // Generate JWT token
        const jwtToken = Jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

        // Exclude password from user data
        const { password: pass, ...userWithoutPassword } = validUser._doc;

        return { jwtToken, userWithoutPassword };
    } catch (error) {
        console.error(`Error occur: ${error}`);

        return { success: false, message: 'Invalid usernarme/password !' };
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

        const newUser = new User({
            username: sanitizeData.username,
            email: sanitizeData.email,
            password: hashedPassword
        });

        await newUser.save();

        return { success: true, message: 'User registered successfully'};
    } catch (error) {
        console.error(`Error occur: ${error}`);

        return { success: false, message: 'Invalid usernarme/password !' };
    }
};