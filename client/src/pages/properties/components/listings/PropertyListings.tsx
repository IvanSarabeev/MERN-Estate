import React, { Suspense, useCallback, useEffect, useState } from "react";
import { fetchAvailableListings } from "api/listings";
import { AvailableProperties } from "types/listing";
import PropertyItem from "./PropertyItem";

const PropertyListings: React.FC = () => {
  const [itemsData, setItemsData] = useState<AvailableProperties[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchListingCallback = useCallback(async () => {
    setError(null);

    try {
      const response =
        (await fetchAvailableListings()) as AvailableProperties[];

      if (response && typeof response === "object") {
        const responseToArray = Object.values(response);

        if (responseToArray !== null) {
          setItemsData(responseToArray);
        }
      } else {
        throw new Error("Error when getting listings");
      }
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
        // Handle cases where err is not an instance of Error
        setError("An unknown error occurred.");
      }
    }
  }, []);

  useEffect(() => {
    fetchListingCallback();
  }, [fetchListingCallback]);

  return (
    <Suspense fallback={<div>Loading Data...</div>}>
      {error ? (
        <div>{error}</div>
      ) : (
        itemsData.length > 0 &&
        itemsData.map((item) => {
          return (
            <Suspense key={item._id} fallback={<div>Loading item...</div>}>
              <PropertyItem data={item} />
            </Suspense>
          );
        })
      )}
    </Suspense>
  );
};

export default PropertyListings;