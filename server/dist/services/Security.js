"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authSignUpUser = exports.authSignInUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const crypto_1 = __importDefault(require("crypto"));
const User_1 = __importDefault(require("../models/User"));
const Email_1 = require("./Email");
const ResponseStatus_1 = require("../helpers/ResponseStatus");
dotenv_1.default.config();
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
const authSignInUser = async (signInCredentials) => {
    try {
        // Find user by their email
        const validUser = await User_1.default.findOne({ email: signInCredentials.email });
        if (!validUser) {
            return {
                success: false,
                message: ResponseStatus_1.USER_NOT_FOUND,
                token: undefined,
                user: undefined,
            };
        }
        // Validate user password
        const isPasswordValid = bcryptjs_1.default.compareSync(signInCredentials.password, validUser.password);
        if (!isPasswordValid) {
            return {
                success: false,
                message: ResponseStatus_1.INVALID_CREDENTIALS,
                token: undefined,
                user: undefined,
            };
        }
        // Generate JWT token
        const jwtToken = jsonwebtoken_1.default.sign({ id: validUser._id }, process.env.JWT_SECRET ?? '');
        // Exclude password from user data
        const { password: pass, ...userWithoutPassword } = validUser.toObject();
        return { success: true, message: "User Authenticated", token: jwtToken, user: userWithoutPassword };
    }
    catch (error) {
        console.error(`Error occur: ${error}`);
        return {
            success: false,
            message: ResponseStatus_1.SERVER_ERROR,
            token: undefined,
            user: undefined,
        };
    }
};
exports.authSignInUser = authSignInUser;
/**
 * Login user hash their password and persist their information in the DB
 *
 * @param signUpCredentials
 * @returns
 */
const authSignUpUser = async (signUpCredentials) => {
    try {
        const { username, email, password } = signUpCredentials;
        const hashedPassword = bcryptjs_1.default.hashSync(password, 12);
        // Generate OTP
        const otp = crypto_1.default.randomInt(100000, 999999).toString();
        const otpExpires = Date.now() + 5 * 60 * 1000; // OTP expiration time 5 min
        const existingUser = await User_1.default.findOne({
            $or: [
                { email: email },
                { username: username }
            ]
        });
        if (existingUser) {
            if (existingUser.email === email) {
                return { success: false, message: ResponseStatus_1.EXISTING_EMAIL };
            }
            if (existingUser.username === username) {
                return { success: false, message: ResponseStatus_1.EXISTING_USERNAME };
            }
        }
        const newUser = new User_1.default({
            username: username,
            email: email,
            password: hashedPassword,
            otp,
            otpExpires
        });
        // Send OTP via email
        await (0, Email_1.sendVerificationEmail)(email, otp);
        await newUser.save();
        return { success: true, message: ResponseStatus_1.OTP_SUCCESS };
    }
    catch (error) {
        console.error(`Error occur: ${error}`);
        return { success: false, message: ResponseStatus_1.INVALID_CREDENTIALS };
    }
};
exports.authSignUpUser = authSignUpUser;
