import bcryptjs from 'bcryptjs';
import User from './../model/user.model.js';
import { errorHandler } from "../utils/error.js";

export const test = (req, res) => {
    res.json({
        message: 'API route working!',
    })
};

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
