import Listing from "../model/listing.model.js";
import { errorHandler } from './../utils/error.js';

export const createListing = async (req, res, next) => {
    try {
        // TODO: sanitize each individual data inside the Client
        const listing = await Listing.create(req.body);

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

        const listings = await Listing.find({
            name: { $regex: searchTerm, $options: 'i' },
            furnished,
            parking,
            type,
        }).sort(
            {[sort]: order}
        ).limit(limit).skip(startIndex);
    
        return res.status(200).json(listings);
    } catch (error) {
        next(error);
    }
};