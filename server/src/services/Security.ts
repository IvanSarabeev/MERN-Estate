import bcryptjs from "bcryptjs";
import Jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import crypto from "crypto";
import User from "../models/User";
import { sendVerificationEmail } from './Email';
import { 
    EXISTING_EMAIL,
     EXISTING_USERNAME,
     INVALID_CREDENTIALS,
     OTP_SUCCESS,
     SERVER_ERROR,
     USER_NOT_FOUND
 } from '../helpers/ResponseStatus';
import { SignInData, SignUpData } from "types/auth/auth";
import { SignInAuthResponse, SignUpAuthResponse } from "types/responses/promiseResponse";

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
export const authSignInUser= async (signInCredentials: SignInData): Promise<SignInAuthResponse> => {
    try {
        // Find user by their email
        const validUser = await User.findOne({email: signInCredentials.email});

        if (!validUser) {
            return {
                success: false,
                message: USER_NOT_FOUND,
                token: undefined,
                user: undefined,
            };
        }

        // Validate user password
        const isPasswordValid = bcryptjs.compareSync(signInCredentials.password, validUser.password);

        if (!isPasswordValid) {
            return {
                success: false,
                message: INVALID_CREDENTIALS,
                token: undefined,
                user: undefined,
            };
        }

        // Generate JWT token
        const jwtToken = Jwt.sign({ id: validUser._id }, process.env.JWT_SECRET ?? '');

        // Exclude password from user data
        const { password: pass, ...userWithoutPassword } = validUser.toObject();

        return { success: true, message: "User Authenticated", token: jwtToken, user: userWithoutPassword };
    } catch (error) {
        console.error(`Error occur: ${error}`);

        return {
            success: false,
            message: SERVER_ERROR,
            token: undefined,
            user: undefined,
        };
    }
};

/**
 * Login user hash their password and persist their information in the DB
 * 
 * @param signUpCredentials 
 * @returns 
 */
export const authSignUpUser = async (signUpCredentials: SignUpData): Promise<SignUpAuthResponse> => {
    try {
        const {username, email, password } = signUpCredentials;

        const hashedPassword = bcryptjs.hashSync(password, 12);

        // Generate OTP
        const otp = crypto.randomInt(100000, 999999).toString();
        const otpExpires = Date.now() + 5 * 60 * 1000; // OTP expiration time 5 min

        const existingUser = await User.findOne({
            $or: [
                { email: email },
                { username: username }
            ]
        });

        if (existingUser) {
            if (existingUser.email === email) {
                return { success: false, message: EXISTING_EMAIL };
            }

            if (existingUser.username === username) {
                return { success: false, message: EXISTING_USERNAME };
            } 
        }

        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword,
            otp,
            otpExpires
        });

        // Send OTP via email
        await sendVerificationEmail(email, otp);
        
        await newUser.save();

        return { success: true, message: OTP_SUCCESS};
    } catch (error) {
        console.error(`Error occur: ${error}`);

        return { success: false, message: INVALID_CREDENTIALS };
    }
};