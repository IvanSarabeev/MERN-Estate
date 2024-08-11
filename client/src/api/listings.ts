import axios from "axios";
import { COMMON_ERROR_MESSAGE, COMMON_HEADERS } from "./../defines";
import { TypeError, RuntimeError } from "utils/customErrors";

const methodPOST = "POST";

export const fetchAvailableListings = async () => {
    try {
        const url = "/api/listing/available-listings";
        
        const response = await fetch(url, {
            method: methodPOST,
            headers: COMMON_HEADERS
        });

        if (!response.ok) {
            const errorData = await response.json();

            throw new Error(`Error ${response.status}: ${errorData.message || response.statusText}`);
        }

        return response.json();
    } catch (error) {
        console.error(`Error occur, ${error}`);

        if (error instanceof TypeError) {
            // Handle TypeError
            return { success: false, message: 'Type error occurred.' };
        } else if (error instanceof RuntimeError) {
            // Handle RuntimeError
            return { success: false, message: 'Runtime error occurred.' };
        } else {
            // Handle generic errors
            return { success: false, message: 'An unexpected error occurred.' };
        }
    }
};

export const fetchListingById = async (id: string | undefined) => {
    const url = `/api/listing/get-listing/${id}`;

    try {
        const response = await fetch(url, {
            method: methodPOST,
            headers: COMMON_HEADERS,
        });

        if (!response.ok) {
            const errorData = await response.json();

            throw new Error(`Error ${response.status}: ${errorData.message || response.statusText}`);
        }

        return response.json();
    } catch (error) {
        console.error(`Error occur, ${error}`);

        if (error instanceof TypeError) {
            // Handle TypeError
            return { success: false, message: 'Type error occurred.' };
        } else if (error instanceof RuntimeError) {
            // Handle RuntimeError
            return { success: false, message: 'Runtime error occurred.' };
        } else {
            // Handle generic errors
            return { success: false, message: 'An unexpected error occurred.' };
        }
    }
};

export const fetchLatestProperties = async () => {
    const url = "/api/listing/available-listings?limit=3";

    try {
        const response = await axios.post(url, [], {
            headers: COMMON_HEADERS
        });

        return response.data;
    } catch (error) {
        console.error(error);

        throw new Error(`${COMMON_ERROR_MESSAGE}: ${JSON.stringify(error)}`)
    }
};