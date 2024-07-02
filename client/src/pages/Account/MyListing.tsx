import React, {useCallback, useEffect, useState} from "react";
import {showListing} from "services/apiListing.ts";
import {PropertysData} from "types/listing.ts";
import {store} from "store/store.ts";
import {ReduxUserState} from "types/redux.ts";
import ListingList from "./components/ListingList.tsx";

const MyListing: React.FC = () => {
    const user = store.getState().user.currentUser! as ReduxUserState;
    const [showListingError, setShowListingError] = useState<boolean>(false);
    const [listing, setListing] = useState<PropertysData[]>([]);

    const handleUserListing = useCallback ( async () => {
        try {
            const data = await showListing(user, {setShowListingError});

            if (data !== null) {
                setListing(data);
            }

        } catch (exception) {
            // Currently throws error because the user isn't authenticated!
            console.error(exception);
        }
    });

    useEffect(() => {
        handleUserListing();
    }, [handleUserListing]);

    return (
        <>
            <div className="pb-6 border-b border-slate-300">
                <h3 className="regular-16 xl:regular-18 font-semibold">My Listings</h3>
                <p className="regular-14 xl:regular-16 text-[#86868e]">
                    Browse through your listings seamlessly.
                </p>
            </div>
            <p className="text-red-700 mt-5">
                {showListingError || ""}
            </p>
            <ListingList data={listing}/>
        </>
    )
};

export default MyListing;