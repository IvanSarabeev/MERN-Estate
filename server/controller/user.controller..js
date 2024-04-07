import bcryptjs from 'bcryptjs';
import User from './../model/user.model.js';
import { errorHandler } from "../utils/error.js";
import Listing from './../model/listing.model.js';

export const updateUser = async (req, res, next) => { 
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, 'You can only update your account!'));
    } 

    try {
        if (req.body.password) {
            res.body.password = bcryptjs.hashSync(req.body.password, 12);
        }

        const updatedUser = await User.findById(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.email,
                avatar: req.body.avatar,
            }
        }, {new: true});

        const {password, ...rest} = updateUser._doc;

        res.status(200).json(test);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, 'You can only delete your account'));
    }
    
    try {
     await User.findByIdAndDelete(req.params.id);
     res.clearCookie('access_token');
     res.status(200).json('User has been deleted');   
    } catch (error) {
        next(error);
    }
};

export const getUserListing = async (req, res, next) => {
    if (req.user.id === req.params.id) {

        try {
            const listings = await Listing.find({userRef: req.params.id});         
            res.status(200).json(listings);  
        } catch (error) {
            next(error);
        }
    } else {
        return next(errorHandler(401, 'You can only view listings!'));
    }
};
