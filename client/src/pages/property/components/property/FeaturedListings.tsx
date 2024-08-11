import React, { Suspense, useCallback, useEffect, useState } from "react";
import ListingItem from "./ListingItem";
import { fetchLatestProperties } from "api/listings";
import { AvailableProperties, ListingsResponse } from "types/listing";
import TriangleLoader from "components/__comp/Loaders/TriangleLoader";
import MemoListingLoader from "components/__comp/Loaders/ListingLoader";

const FeaturedListings: React.FC = () => {
  const [itemData, setItemData] = useState<AvailableProperties[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleLatestListings = useCallback(async () => {
    const { listings }: ListingsResponse = await fetchLatestProperties();

    console.log(listings);
    console.log(Array.isArray(listings));

    try {
      if (Array.isArray(listings)) {
        setItemData(listings);
      } else {
        return false;
      }
    } catch (err) {
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
  }, []);

  useEffect(() => {
    handleLatestListings();
  }, [handleLatestListings]);

  return (
    <div className="w-full h-fit md:w-2/5 p-4 xl:px-8 xl:py-6 space-y-4 rounded-md shadow-md bg-slate-900/90">
      <div className="relative border-b border-slate-500">
        <h3 className="bold-20 2xl:bold-24 text-white pb-4 whitespace-normal">
          Featured Listing
        </h3>
        <div className="absolute -bottom-0.5 rounded-l-md left-0 h-1 w-20 bg-white" />
      </div>
      {itemData.length > 0 ? (
        <Suspense fallback={<MemoListingLoader />}>
          {itemData.map((item) => {
            return <ListingItem key={item._id} data={item} />;
          })}
        </Suspense>
      ) : (
        <TriangleLoader />
      )}
      {error && <h3 className="bg-red-600">No Listings Available</h3>}
    </div>
  );
};

export default FeaturedListings;
