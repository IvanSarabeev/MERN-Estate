"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getListings = exports.getListingById = exports.getListing = exports.updateListing = exports.deleteListing = exports.createListing = void 0;
const Listing_1 = __importDefault(require("models/Listing"));
const Error_1 = require("utils/Error");
const Product_1 = require("services/Product");
const createListing = async (req, res, next) => {
    try {
        const listing = await Listing_1.default.create(req.body);
        res.status(201).json({
            status: true,
            message: "Successfully Created Listing",
            data: listing
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: "Internal Server Error",
        });
        next(error);
    }
};
exports.createListing = createListing;
const deleteListing = async (req, res, next) => {
    const currentListing = await Listing_1.default.findById(req.params.id);
    if (!currentListing) {
        return next((0, Error_1.errorHandler)(404, "Listing not found!"));
    }
    ;
    if (req.user?.id !== currentListing.userRef) {
        return next((0, Error_1.errorHandler)(401, "Fatal error: You can only delete your own listing!"));
    }
    ;
    try {
        await Listing_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: true,
            message: "Successfully delete listing"
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteListing = deleteListing;
const updateListing = async (req, res, next) => {
    const listing = await Listing_1.default.findById(req.params.id);
    if (!listing) {
        return next((0, Error_1.errorHandler)(404, "Listing not found!"));
    }
    ;
    if (req.user?.id !== listing.userRef) {
        return next((0, Error_1.errorHandler)(401, "You can only delete your own listing/s"));
    }
    ;
    try {
        const updatedListing = await Listing_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true } // Return the new listing
        );
        res.status(200).json({
            status: true,
            message: "Successfully Updated Item",
            data: updatedListing
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateListing = updateListing;
const getListing = async (req, res, next) => {
    try {
        const listing = await Listing_1.default.findById(req.params.id);
        if (!listing) {
            return next((0, Error_1.errorHandler)(404, "Listing doesn't exist!"));
        }
        ;
        res.status(200).json(listing);
    }
    catch (error) {
        next(error);
    }
};
exports.getListing = getListing;
/**
 * Get available property by it's unique id
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next - The Express next middleware function.
 * @returns {Promise<void>} - Get Listing by it's unique id.
 */
const getListingById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const response = await (0, Product_1.getProduct)(id);
        if (!response.success) {
            res.status(response.statusCode).json({ message: response.message });
            return;
        }
        res.status(response.statusCode).json({
            status: true,
            data: response.data
        });
    }
    catch (error) {
        next((0, Error_1.errorHandler)(404, `Fatal Error: Not Found! ${error}`));
    }
};
exports.getListingById = getListingById;
const getListings = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const isFurnished = req.query.furnished === 'true';
        const isParking = req.query.parking === 'true';
        // Handle optional query parameters with type safety
        const furnished = req.query.furnished === undefined || req.query.furnished === 'false'
            ? { $in: [false, true] }
            : isFurnished;
        const parking = req.query.parking === undefined || req.query.parking === 'false'
            ? { $in: [false, true] }
            : isParking;
        // Type guard for `type`
        let type;
        if (req.query.type === undefined || req.query.type === 'all') {
            type = { $in: ['sell', 'rent'] };
        }
        else if (typeof req.query.type === 'string') {
            type = req.query.type;
        }
        const searchTerm = req.query.searchTerm || '';
        const sortField = req.query.sort || 'createdAt'; // Default sort field
        const sortOrder = req.query.order || 'desc'; // Default order
        // Construct the sort object
        const sort = { [sortField]: sortOrder };
        // Count total listings matching the search criteria
        const totalListings = await Listing_1.default.countDocuments({
            name: { $regex: searchTerm, $options: 'i' },
            furnished,
            parking,
            type
        });
        // Fetch listings with the given criteria
        const listings = await Listing_1.default.find({
            name: { $regex: searchTerm, $options: 'i' },
            furnished,
            parking,
            type,
        }).sort(sort).limit(limit).skip(startIndex);
        ;
        res.status(200).json({
            total: totalListings,
            listings: listings
        });
        return;
    }
    catch (error) {
        next(error);
    }
};
exports.getListings = getListings;
