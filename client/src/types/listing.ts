export interface CreateListingIntf {
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

export interface PropertysData {
    _id: string,
    name: string,
    imageUrls: [],
    description: string,
    createdAt?: Date,
    type: string
}