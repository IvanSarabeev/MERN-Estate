import React from "react";
import {PropertysData} from "types/listing.ts";

interface ListingListProps {
    data: PropertysData[]
}

const ListingList: React.FC<ListingListProps> = ({data}) => {
    console.log(data);

    return (
        <h2>Hey</h2>
    )
};

export default ListingList;