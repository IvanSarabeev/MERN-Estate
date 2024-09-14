import { LucideIcon } from "lucide-react";

export interface CreateListingIntf {
    _id?: string,
    imageUrls: string[],
    name?: string,
    description?: string,
    address?: string,
    userRef?: string,
    type?: 'rent' | 'sell' | undefined,
    bedroom?: number,
    bathroom?: number,
    regularPrice?: number,
    discountPrice?: number,
    yearBuild?: number,
    rooms?: number,
    offer?: boolean,
    parking?: boolean,
    furnished?: boolean,
}

export interface AvailableProperties {
    _id?: string,
    imageUrls: string[],
    name?: string,
    description?: string,
    address?: string,
    userRef?: string,
    type?: 'rent' | 'sell',
    bedroom?: number,
    bathroom?: number,
    regularPrice?: number,
    discountPrice?: number,
    yearBuild?: number,
    rooms?: number,
    offer?: boolean,
    parking?: boolean,
    furnished?: boolean,
}

export interface PropertysData {
    _id: string,
    name: string,
    imageUrls: string[],
    description: string,
    createdAt?: Date,
    type: string
}

export interface SearchDataIntf {
    searchTerm: string,
    type: "all" | "rent" | "sell",
    parking: boolean | undefined;
    furnished: boolean | undefined;
    sort: string,
    order: string,
}

export interface ListingsResponse {
    total: number;
    listings: AvailableProperties[];
    success: boolean;
    message: string;
}

export interface SingleListingResponse {
    _id: string,
    imageUrls: string[],
    name: string,
    description: string,
    address: string,
    userRef: string,
    type: 'rent' | 'sell',
    bedroom: number,
    bathroom: number,
    regularPrice: number,
    discountPrice: number,
    yearBuild: number,
    rooms: number,
    offer: boolean,
    parking: boolean,
    furnished: boolean,
}

export type SingleListingKeys = keyof SingleListingResponse;

export interface PropertyOverviewType {
    id: number;
    icon: LucideIcon;
    label: string;
    key: SingleListingKeys | null;
}