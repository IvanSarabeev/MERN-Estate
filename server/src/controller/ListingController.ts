import { NextFunction, Request, Response } from "express";
import Listing from "models/Listing";
import { errorHandler } from 'utils/Error';
import { getProduct } from "services/Product";
import { SortOrder } from "mongoose";

export const createListing = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const listing = await Listing.create(req.body);

        res.status(201).json({
            status: true,
            message: "Successfully Created Listing",
            data: listing
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            status: false,
            message: "Internal Server Error",
        })

        next(error);
    }
};

export const deleteListing = async (req: Request, res: Response, next: NextFunction) => {
    const currentListing = await Listing.findById(req.params.id);

    if (!currentListing) {
        return next(errorHandler(404, "Listing not found!"));
    };

    if (req.user?.id !== currentListing.userRef) {
        return next(errorHandler(401, "Fatal error: You can only delete your own listing!"));
    };

    try {
        await Listing.findByIdAndDelete(req.params.id);

        res.status(200).json({
            status: true,    
            message:"Successfully delete listing"
        });
    } catch (error) {
        next(error);
    }
};

export const updateListing = async (req: Request, res: Response, next: NextFunction) => {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
        return next(errorHandler(404, "Listing not found!"));
    };

    if (req.user?.id !== listing.userRef) {
        return next(errorHandler(401, "You can only delete your own listing/s"));
    };

    try {
        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true} // Return the new listing
        );
        
        res.status(200).json({
            status: true,
            message: "Successfully Updated Item",
            data: updatedListing
        });
    } catch (error) {
        next(error);
    }
};

export const getListing = async (req: Request, res: Response, next: NextFunction) => {
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
export const getListingById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;

        const response = await getProduct(id);

        if (!response.success) {
            res.status(response.statusCode).json({ message: response.message });
            return;
        }

        res.status(response.statusCode).json({
            status: true,
            data: response.data
        });
    } catch (error) {
        next(errorHandler(404, `Fatal Error: Not Found! ${error}`));
    }
}

export const getListings = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const startIndex = parseInt(req.query.startIndex as string) || 0;
        const limit = parseInt(req.query.limit as string) || 9;

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
        let type: string | { $in: string[] } | undefined;
        if (req.query.type === undefined || req.query.type === 'all') {
            type = { $in: ['sell', 'rent'] };
        } else if (typeof req.query.type === 'string') {
            type = req.query.type;
        }

        const searchTerm = (req.query.searchTerm as string) || '';

        const sortField = (req.query.sort as string) || 'createdAt'; // Default sort field
        const sortOrder: SortOrder = (req.query.order as SortOrder) || 'desc'; // Default order

        // Construct the sort object
        const sort: { [key: string]: SortOrder } = { [sortField]: sortOrder };

        // Count total listings matching the search criteria
        const totalListings = await Listing.countDocuments({
            name: { $regex: searchTerm, $options: 'i' },
            furnished,
            parking,
            type 
        });

        // Fetch listings with the given criteria
        const listings = await Listing.find({
            name: { $regex: searchTerm, $options: 'i' },
            furnished,
            parking,
            type,
        }).sort(sort).limit(limit).skip(startIndex);;
    
        res.status(200).json({
            total: totalListings,
            listings: listings
        });
        return;
    } catch (error) {
        next(error);
    }
};