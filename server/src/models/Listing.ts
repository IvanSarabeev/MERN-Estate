import mongoose from "mongoose";
import { IListing } from "types/model/listing";

interface ListingModel extends IListing {
    createdAt: Date;
    updatedAt: Date;
}

const listingSchema = new mongoose.Schema<ListingModel>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    regularPrice: {
        type: Number,
        required: true,
    },
    discountPrice: {
        type: Number,
        required: true,
    },
    bathroom: {
        type: Number,
        required: true,
    },
    bedroom: {
        type: Number,
        required: true,
    },
    furnished: {
        type: Boolean,
        required: true,
    },
    parking: {
        type: Boolean,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    yearBuild: {
        type: Number,
        required: true,
    },
    imageUrls: {
        type: Array,
        required: true,
    },
    userRef: {
        type: String, 
        required: true,
    },
    rooms: {
        type: Number,
        required: true,
    },
}, {timestamps: true});

const Listing = mongoose.model<ListingModel>("Listing", listingSchema);

export default Listing;