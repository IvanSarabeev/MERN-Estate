import { useCallback, useState } from "react";
import { fetchAvailableListings } from "api/listings";
import { AvailableProperties, ListingsResponse } from "types/listing";
import useStore from "./useStore";

export const useProperty = () => {
  const { listingStore } = useStore();

    const [data, setData] = useState<AvailableProperties[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isloading, setIsLoading] = useState<boolean>(false);

    const fetchListings = useCallback(async () => {
        setError(null);
        setIsLoading(true);

        try {
            const response: ListingsResponse = await fetchAvailableListings();

            const { total, listings } = response;

            listingStore.setTotalPagesResult(total);

            if (listings !== null && typeof listings === 'object') {
                const convertResponseToArray = Object.values(listings);

                if (Array.isArray(convertResponseToArray)) {
                    setData(convertResponseToArray);
                } else {
                    throw new Error("No Listings Found");
                }
            }

            setIsLoading(false);
        } catch (err: unknown) {
            if (err instanceof Error) {
                if (err.message.includes("Type error")) {
                  setError("There was an issue with the type of the data provided.");
                } else if (err.message.includes("Runtime error")) {
                  setError("A runtime error occurred. Please try again later.");
                } else if (err.message.includes("OTP expired")) {
                  setError("Your OTP has expired. Please request a new one.");
                } else {
                  setError("An unexpected error occurred.");
                }
              } else {
                setError("Error: Unable to receive propertyes");
              }
        }
    }, [listingStore]);

    return { fetchListings, data, error, isloading };
};