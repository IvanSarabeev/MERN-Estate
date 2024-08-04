import Listing from "../models/listing.model.js";
import xssFilters from "xss-filters";
import { errorHandler } from '../utils/error.js';
import { getProduct } from "../services/listings/productService.js";

export const createListing = async (req, res, next) => {
    try {
        const sanitizedData = [];

        // Iterate over each property in formData body
        for (const key in req.body) {
            if (Object.hasOwnProperty.call(req.body, key)) {

                // Sanitize each individual property by it's key value
                sanitizedData[key] = xssFilters.inHTMLData(req.body[key]);
            }
        }

        const listing = await Listing.create(sanitizedData);

        return res().status(201).json(listing);
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
        next(error);
    }
};

export const deleteListing = async (req, res, next) => {
    const currentListing = await Listing.findById(req.params.id);

    if (!currentListing) {
        return next(errorHandler(404, "Listing not found!"));
    };

    if (req.user.id !== currentListing.userRef) {
        return next(errorHandler(401, "Fatal error: You can only delete your own listing!"));
    };

    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200, "Successfully delete listing");
    } catch (error) {
        next(error);
    }
};

export const updateListing = async (req, res, next) => {
    // TODO: sanitize each individual data inside the Client
    
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
        return next(errorHandler(404, "Listing not found!"));
    };

    if (req.user.id !== listing.userRef) {
        return next(errorHandler(401, "You can only delete your own listing/s"));
    };

    try {
        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true} // Return the new listing
        );
        res.status(200).json(updatedListing);
    } catch (error) {
        next(error);
    }
};

export const getListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);

        if (!listing) {
          return next(errorHandler(404, "Listing doesn't exist!"));
        };

        res.status(200).json(listing);
    } catch (error) {
        next(error)
    }
};

/**
 * Get available property by it's unique id
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next - The Express next middleware function.
 * @returns {Promise<void>} - Get Listing by it's unique id.
 */
export const getListingById = async (req, res, next) => {
    try {
        const id = req.params.id;

        const response = await getProduct(id);

        if (!response.success) {
            return res.status(response.statusCode).json({ message: response.message });
        }

        return res.status(response.statusCode).json(response.data);
    } catch (error) {
        next(errorHandler(404, `Fatal Error: Not Found! ${error}`));
    }
}

export const getListings = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;

        let furnished = req.query.furnished;

        if (furnished === undefined || furnished === false) {
            furnished = { $in: [false, true]};
        };

        let parking = req.query.parking;

        if (parking === undefined || parking === false) {
            parking = { $in: [false, true ]};
        };

        let type = req.query.type;

        if (type === undefined || type === 'all') {
            type = { $in: ['sell', 'rent']}
        };

        const searchTerm = req.query.searchTerm || '';

        const sort = req.query.sort || 'createdAt';

        const order = req.query.order || 'desc';

        const totalListings = await Listing.countDocuments({
            name: { $regex: searchTerm, $options: 'i' },
            furnished,
            parking,
            type 
        });

        const listings = await Listing.find({
            name: { $regex: searchTerm, $options: 'i' },
            furnished,
            parking,
            type,
        }).sort(
            {[sort]: order}
        ).limit(limit).skip(startIndex);
    
        return res.status(200).json({
            total: totalListings,
            listings: listings
        });
    } catch (error) {
        next(error);
    }
};