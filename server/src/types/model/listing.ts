import { Document } from "mongoose";

export interface IListing extends Document {
    name: string;
    description: string;
    address: string;
    regularPrice: number;
    discountPrice: number;
    bathroom: number;
    bedroom: number;
    furnished: boolean;
    parking: boolean;
    type: string;
    yearBuild: number;
    imageUrls: ArrayConstructor;
    userRef: string;
    rooms: number;
}