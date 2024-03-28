import User from './../model/user.model.js';
import bcryptjs from "bcryptjs";
import Jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';

export const signUp = async (req, res, next) => {
   const { username, email, password } = req.body;

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
    const { email, password } = req.body;

    try {
        const validUser = await User.findOne({email}); 

        if (!validUser) {
            return next(errorHandler(404, 'User not found'));
        }

        const validUserPassword = bcryptjs.compareSync(password, validUser.password);

        if (!validUserPassword) {
            return new(errorHandler(401, 'Wrong credentials!'));
        }

        // Set the jwtToken on the user id
        const jwtToken = Jwt.sign({id: validUser._id}, process.env.JWT_SECRET);

        const {password: pass, ...rest} = validUser._doc;

        // Set the session cookie, to not allow 3-rd party reading cookie & expiration time
        res.cookie('acces_token', jwtToken, {
            httpOnly: true, 
            expires: new Date(Date.now() + 24 * 60),
        })
        .status(200)
        .json(rest)
        ;
    } catch (error) {
        next(error);
    }
};