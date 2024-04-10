import { CurrentUserInterface } from "types/user";

interface ApiListingProps {
    setShowListingError: React.Dispatch<React.SetStateAction<boolean>>,
}

const listingUrl = "/api/user/listings";

export const showListing = async (
    currentUser: CurrentUserInterface,
     {setShowListingError}: ApiListingProps) => {
    try {
        setShowListingError(false);
        
        const response = await fetch(`${listingUrl}/${currentUser._id}`);
        
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