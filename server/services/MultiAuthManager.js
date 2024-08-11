import xssFilters from 'xss-filters';
import User from '../models/user.model.js';
import Jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import dotenv from "dotenv";
import { INVALID_CREDENTIALS, SERVER_ERROR } from '../helpers/ResponseStatus.js';

dotenv.config();

/**
 * Google Authentication Provider Service
 * This function handles the process of finding or creating a user based on Google credentials,
 * generating a JWT token, and returning it along with the user data.
 * 
 * @param {Object} data - Object containing email, name, and photo from Google.
 * @returns {Object} - An object containing the JWT token and user data if successful, or an error message if failed.
 */
export const googleAuthProviderService = async (data) => {
    const { email, name, photo } = data;

    const SanitizedData = {
        email: xssFilters.inHTMLData(email),
        name: xssFilters.inHTMLData(name),
        photo: xssFilters.inHTMLData(photo)
    };

    try {
        let user = await User.findOne({ email: SanitizedData.email });

        if (user) {
            const jwtToken = Jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        
            const { password: pass, ...rest } = user._doc;

            return { jwtToken, rest };
        } else {
            const generatePassword = Math.random().toString(36).slice(8) + Math.random().toString(36).slice(8);

            const hashPassword = bcryptjs.hashSync(generatePassword, 12);

            let uniqueUser = SanitizedData.name.trim();
            let userExists = await User.findOne({ username: uniqueUser });

            // Check if the username already exists and generate a unique one if necessary
            let incrementNum = 1;

            while (userExists) {
                uniqueUser = SanitizedData.name.trim() + Math.floor(incrementNum++);

                userExists = await User.findOne({ username: uniqueUser });
            }

            const newUser = await User({
                username: uniqueUser,
                email: SanitizedData.email.trim(),
                password: hashPassword,
                avatar: SanitizedData.photo,
                verified: true 
                // For now is true, because later on I will implement Email Component to inform for their OTP validation token
            });

            await newUser.save();

            const jwtToken = Jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

            const { password: pass, ...rest } = newUser._doc;

            return { jwtToken, rest };
        }
    } catch (error) {
        console.error(`${SERVER_ERROR} ${error}`);

        return { success: false, message: INVALID_CREDENTIALS };
    }
};

export const githubAuthProvider = async (data) => {
    const { email, name, photo } = data;

    const SanitizeData = {
        email: xssFilters.inHTMLData(email),
        name: xssFilters.inHTMLData(name),
        photo: xssFilters.inHTMLData(photo)
    };

    try {
        let user = await User.findOne({ email: SanitizeData.email });

        if (user) {
            const jwtToken = Jwt.sign({ id: user._id }, process.env.JWT_SECRET);

            const { password: pass, ...rest } = user._doc;

            return { jwtToken, rest };
        } else {
            const generatePassword = Math.random().toString(36).slice(8) + Math.random().toString(36).slice(8);

            const hashPassword = bcryptjs.hashSync(generatePassword, 12);

            let uniqueUser = SanitizeData.name.trim();
            let userExists = await User.findOne({ name: uniqueUser });

             // Check if the username already exists and generate a unique one if necessary
            let incrementNum = 1;

            while (userExists) {
                uniqueUser = SanitizedData.name.trim() + Math.floor(incrementNum++);

                userExists = await User.findOne({ username: uniqueUser });
            }

            const newUser = await User({
                username: uniqueUser,
                email: SanitizeData.email.trim(),
                password: hashPassword,
                avatar: SanitizeData.photo,
                verified: true
            });

            await newUser.save();

            const jwtToken = Jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

            const { password: pass, ...rest } = newUser._doc;

            return { jwtToken, rest };
        }
    } catch (error) {
        console.error(`${SERVER_ERROR} ${error}`);

        return { success: false, message: INVALID_CREDENTIALS };
    }
};