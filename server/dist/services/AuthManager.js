"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.githubAuthProvider = exports.googleAuthProviderService = void 0;
const xss_filters_1 = __importDefault(require("xss-filters"));
const User_1 = __importDefault(require("./../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
const ResponseStatus_1 = require("helpers/ResponseStatus");
dotenv_1.default.config();
/**
 * Google Authentication Provider Service
 * This function handles the process of finding or creating a user based on Google credentials,
 * generating a JWT token, and returning it along with the user data.
 *
 * @param {Object} data - Object containing email, name, and photo from Google.
 * @returns {Object} - An object containing the JWT token and user data if successful, or an error message if failed.
 */
const googleAuthProviderService = async (googleCredentials) => {
    const { email, name, photo } = googleCredentials;
    try {
        let user = await User_1.default.findOne({ email: email });
        if (user) {
            const jwtToken = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET ?? '');
            const { password: pass, ...rest } = user.toObject();
            return { jwtToken, rest };
        }
        else {
            const generatePassword = Math.random().toString(36).slice(8) + Math.random().toString(36).slice(8);
            const hashPassword = bcryptjs_1.default.hashSync(generatePassword, 12);
            let uniqueUser = name.trim();
            let userExists = await User_1.default.findOne({ username: uniqueUser });
            // Check if the username already exists and generate a unique one if necessary
            let incrementNum = 1;
            while (userExists) {
                uniqueUser = name.trim() + Math.floor(incrementNum++);
                userExists = await User_1.default.findOne({ username: uniqueUser });
            }
            const newUser = new User_1.default({
                username: uniqueUser,
                email: email.trim(),
                password: hashPassword,
                avatar: photo,
                verified: true
                // For now is true, because later on I will implement Email Component to inform for their OTP validation token
            });
            await newUser.save();
            const jwtToken = jsonwebtoken_1.default.sign({ id: newUser._id }, process.env.JWT_SECRET ?? '');
            const { password: pass, ...rest } = newUser.toObject();
            return { jwtToken, rest };
        }
    }
    catch (error) {
        console.error(`${ResponseStatus_1.SERVER_ERROR} ${error}`);
        return { success: false, message: ResponseStatus_1.INVALID_CREDENTIALS };
    }
};
exports.googleAuthProviderService = googleAuthProviderService;
const githubAuthProvider = async (userCredentials) => {
    const { email, name, photo } = userCredentials;
    const SanitizeData = {
        email: xss_filters_1.default.inHTMLData(email),
        name: xss_filters_1.default.inHTMLData(name),
        photo: xss_filters_1.default.inHTMLData(photo)
    };
    try {
        let user = await User_1.default.findOne({ email: SanitizeData.email });
        if (user) {
            const jwtToken = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET ?? '');
            const { password: pass, ...rest } = user.toObject();
            return { jwtToken, rest };
        }
        else {
            const generatePassword = Math.random().toString(36).slice(8) + Math.random().toString(36).slice(8);
            const hashPassword = bcryptjs_1.default.hashSync(generatePassword, 12);
            let uniqueUser = SanitizeData.name.trim();
            let userExists = await User_1.default.findOne({ name: uniqueUser });
            // Check if the username already exists and generate a unique one if necessary
            let incrementNum = 1;
            while (userExists) {
                uniqueUser = SanitizeData.name.trim() + Math.floor(incrementNum++);
                userExists = await User_1.default.findOne({ username: uniqueUser });
            }
            const newUser = new User_1.default({
                username: uniqueUser,
                email: SanitizeData.email.trim(),
                password: hashPassword,
                avatar: SanitizeData.photo,
                verified: true
            });
            await newUser.save();
            const jwtToken = jsonwebtoken_1.default.sign({ id: newUser._id }, process.env.JWT_SECRET ?? '');
            const { password: pass, ...rest } = newUser.toObject();
            return { jwtToken, rest };
        }
    }
    catch (error) {
        console.error(`${ResponseStatus_1.SERVER_ERROR} ${error}`);
        return { success: false, message: ResponseStatus_1.INVALID_CREDENTIALS };
    }
};
exports.githubAuthProvider = githubAuthProvider;
