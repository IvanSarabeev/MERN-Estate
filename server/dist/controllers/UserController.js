"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.smallUserDetails = exports.getUser = exports.getUserListing = exports.deleteUser = exports.updateUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("models/User"));
const Listing_1 = __importDefault(require("models/Listing"));
const Error_1 = require("utils/Error");
const updateUser = async (req, res, next) => {
    const userId = xssFilters.inHTMLData(req.body.user);
    const userPassword = xssFilters.inHTMLData(req.body.password);
    if (userId !== req.params.id) {
        return next((0, Error_1.errorHandler)(401, 'You can only update your account!'));
    }
    let hashedPassword;
    try {
        if (userPassword) {
            hashedPassword = bcryptjs_1.default.hashSync(req.body.password, 12);
        }
        const updatedUser = await User_1.default.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
                avatar: req.body.avatar,
            }
        }, { new: true });
        if (!updatedUser) {
            return next((0, Error_1.errorHandler)(404, 'User not found'));
        }
        const { password, ...rest } = updatedUser.toObject();
        res.status(200).json(rest);
    }
    catch (error) {
        next(error);
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res, next) => {
    if (req.user?.id !== req.params.id) {
        return next((0, Error_1.errorHandler)(401, 'You can only delete your account'));
    }
    try {
        await User_1.default.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');
        res.status(200).json('User has been deleted');
    }
    catch (error) {
        next(error);
    }
};
exports.deleteUser = deleteUser;
const getUserListing = async (req, res, next) => {
    if (req.user?.id === req.params.id) {
        try {
            const listings = await Listing_1.default.find({ userRef: req.params.id });
            res.status(200).json(listings);
        }
        catch (error) {
            next(error);
        }
    }
    else {
        return next((0, Error_1.errorHandler)(401, 'You can only view listings!'));
    }
};
exports.getUserListing = getUserListing;
const getUser = async (req, res, next) => {
    try {
        const user = await User_1.default.findById(req.params.id);
        if (!user) {
            return next((0, Error_1.errorHandler)(404, "User not found!"));
        }
        ;
        const { password: pass, ...rest } = user.toObject();
        res.status(200).json(rest);
    }
    catch (error) {
        next(error);
    }
};
exports.getUser = getUser;
const smallUserDetails = async (req, res, next) => {
    try {
        const { userRef } = req.body;
        // Check if userRef is provided and is a valid string
        if (!userRef || typeof userRef !== 'string') {
            return res.status(400).json({ success: false, message: "Invalid userRef provided" });
        }
        // Aggregate listings and populate user details
        const data = await Listing_1.default.aggregate([
            {
                $match: { userRef } // Match the listings with the provided userRef
            },
            {
                $lookup: {
                    from: 'users', // The collection to join with
                    localField: 'userRef', // Field from the listings collection
                    foreignField: '_id', // Field from the users collection
                    as: 'userDetails' // Output array field containing user details
                }
            },
            {
                $unwind: {
                    path: '$userDetails', // Unwind the userDetails array to get a single user object
                    preserveNullAndEmptyArrays: true // Preserve listings with no corresponding user
                }
            },
            {
                $project: {
                    name: 1,
                    description: 1,
                    address: 1,
                    regularPrice: 1,
                    discountPrice: 1,
                    bathroom: 1,
                    bedroom: 1,
                    furnished: 1,
                    parking: 1,
                    type: 1,
                    yearBuild: 1,
                    imageUrls: 1,
                    userRef: 1,
                    userDetails: {
                        username: 1,
                        email: 1,
                        avatar: 1
                    }
                }
            }
        ]);
        // Check if no data is found
        if (!data || data.length === 0) {
            return res.status(404).json({ success: false, message: "No listings found for the given userRef" });
        }
        // Return the aggregated data
        return res.status(200).json({ success: true, data: data, message: "Listings with User Details" });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
};
exports.smallUserDetails = smallUserDetails;
