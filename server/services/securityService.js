import xssFilters from "xss-filters";
import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import Jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

export const authSignIn = async (formData) => {
    try {
        const { email, password } = formData;

        const sanitizeData = {
            email: xssFilters.inHTMLData(email),
            password: xssFilters.inHTMLData(password)
        };

        const validateUser = await User.findOne({email});

        if (!validateUser) {
            return errorHandler(404, "User not found!");
        };

        const validatePassword = bcryptjs.compareSync(password, validateUser.password);

        if (!validatePassword) {
            return errorHandler(401, 'Invalid username/password');
        }

        return { success: true, message: 'Successful login', response: 200 };
    } catch (error) {
        console.error(`Error occur: ${error}`);

        return { success: false, message: 'Invalid usernarme/password !' };
    }
};

/*
* Contains formData representing interface of username, email, password -> typeof String
*/
export const authSignUpUser = async (formData) => {
    try {
        const {username, email, password } = formData;
        
        const sanitizeData = {
            username: xssFilters.inHTMLData(username),
            email: xssFilters.inHTMLData(email),
            password: xssFilters.inHTMLData(password)
        };

        const hashedPassword = bcryptjs.hashSync(password, 12);

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