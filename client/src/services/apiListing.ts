import { CurrentUserInterface } from "types/user";

interface ApiListingProps {
    setShowListingError: React.Dispatch<React.SetStateAction<boolean>>,
}

interface ApiLoadingProps {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
}

type ApiListingTypeProps = {
    itemId: string,
}

const listingUrl = "/api/user/listings";
const deleteListingUrl = "/api/listing/delete";
const getListingUrl = "/api/listing/get";

export const showListing = async (
    currentUser: CurrentUserInterface,
     {setShowListingError}: ApiListingProps) => {
    try {
        setShowListingError(false);
        
        const response = await fetch(`${listingUrl}/${currentUser._id}`);
        
        if (!response.ok) {
            throw new Error(`Status code: ${response.status}, status message: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.success === false) {
            return setShowListingError(true)
        }

        return data;
    } catch (error) {
        setShowListingError(true);
        throw new Error(`Error message: ${error}`);
    }
};

export const deleteListing = async ({itemId}: ApiListingTypeProps) => {
    try {
        const response = await fetch(`${deleteListingUrl}/${itemId}`, {
            method: "DELETE",
        });
        
        if (!response.ok) {
            throw new Error(`Status code: ${response.status}, status message: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.success === false) {
            console.log(data.message);
        }

        return data;
    } catch (error) {
        throw new Error(`Error message: ${error}`);
    }
};

export const fetchListing = async (id: string, {setLoading}: ApiLoadingProps) => {
    try {
        const response = await fetch(`${getListingUrl}/${id}`);

        if (!response.ok) {
            throw new Error(`Status code: ${response.status}, status message: ${response.statusText}`);
        }

        const data = await response.json();
        setLoading(false);
        return data;
    } catch (error) {
        setLoading(true);
        throw new Error(`Error message: ${error}`);
    }
};