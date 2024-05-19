import User from './../model/user.model.js';
import bcryptjs from "bcryptjs";
import Jwt from 'jsonwebtoken';
import xssFilters from 'xss-filters';
import { errorHandler } from '../utils/error.js';
import { cookieOptions } from '../utils/cookie.js';

export const signUp = async (req, res, next) => {
    // Sanitized User Data
   const username = xssFilters.inHTMLData(req.body.username);
   const email = xssFilters.inHTMLData(req.body.email);
   const password = xssFilters.inHTMLData(req.body.password);

   // Hashing password to 12 rounds
   const hashedPassword = bcryptjs.hashSync(password, 12);

   const newUser = new User({username, email, password:hashedPassword});

   try {
       await newUser.save();
       res.status(201).json("User created successfully!");
   } catch (error) {
        next(error);
   }
};

export const signIn = async (req, res, next) => {
    // Sanitized User Data
    const email = xssFilters.inHTMLData(req.body.email);
    const password = xssFilters.inHTMLData(req.body.password);

    try {
        const validUser = await User.findOne({email}); 

        if (!validUser) {
            return next(errorHandler(404, 'User not found!'));
        }

        const validUserPassword = bcryptjs.compareSync(password, validUser.password);

        if (!validUserPassword) {
            return next(errorHandler(401, 'Wrong credentials!'));
        }

        // Set the jwtToken on the user id
        const jwtToken = Jwt.sign({id: validUser._id}, process.env.JWT_SECRET);

        const {password: pass, ...rest} = validUser._doc;

        // Set the session cookie, to not allow 3-rd party reading cookie & expiration time
        res.cookie('access_token', jwtToken, cookieOptions)
        .status(200)
        .json(rest);
    } catch (error) {
        next(error);
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