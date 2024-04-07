interface User {
    id: string,
    username?: string,
}

// interface ProfileListingIntf {
//     setShowListingError: React.Dispatch<React.SetStateAction<boolean>>,
// }

// {setShowListingError}: ProfileListingIntf

export const showListing = async (currentUser: User | null)=> {
    try {
        // setShowListingError(false);
        
        if (currentUser) {
            const { _id, username } = currentUser;
            console.log(_id, username);
        }
        
        const response = await fetch(`/api/user/listings/${currentUser._id}`);
        console.log(response);
        
        const data = await response.json();

        if (data.success === false) {
            // setShowListingError(true);
        }

        return data;
    } catch (error) {
        throw new Error(`Error message: ${error}`);
    }
};