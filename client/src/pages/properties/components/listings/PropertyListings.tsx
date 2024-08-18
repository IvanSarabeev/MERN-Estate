import React, { Suspense, useCallback, useEffect, useState } from "react";
import { fetchAvailableListings } from "api/listings";
import { AvailableProperties, ListingsResponse } from "types/listing";
import MemoGridProperties from "./../propety-layouts/GridProperties";
import MemoListProperties from "./../propety-layouts/ListProperties";
import MemoSkeletonItem from "components/__comp/SkeletonItem";
import { handlePropertySorting } from "utils/sortData";
import listingStore from "stores/listingStore";

type PropertyListingProps = {
  systemLayout: string;
  sortOption: string;
  currentPage: number;
  getTotalPages: (totalItems: number) => void;
};

const PropertyListings: React.FC<PropertyListingProps> = ({
  systemLayout,
  sortOption,
  currentPage,
  getTotalPages,
}) => {
  const [itemsData, setItemsData] = useState<AvailableProperties[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchListingCallback = useCallback(async () => {
    setError(null);

    try {
      const limit = systemLayout === "grid" ? 6 : 5;

      listingStore.setPageLimit(limit);

      const response: ListingsResponse = await fetchAvailableListings();

      const { total, listings } = response;

      listingStore.setTotalPagesResult(total);

      if (listings && typeof listings === "object") {
        const responseToArray = Object.values(listings);

        if (responseToArray !== null) {
          setItemsData(responseToArray);
        } else {
          throw new Error("Fatal Error: No listings found!");
        }
      }

      if (response.total !== null) {
        getTotalPages(Math.ceil(response.total / limit));
      }

      const sortedListings = sortOption
        ? handlePropertySorting({ item: listings, options: sortOption })
        : listings; // Sort based on the select item

      // Handle pagination
      const startIndex = (currentPage - 1) * limit;

      const paginatedListings = sortedListings.slice(
        startIndex,
        startIndex + limit
      ); // Get the sliced values from the array, depending on the limit

      setItemsData(paginatedListings);
      getTotalPages(Math.ceil(total / limit));
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
  }, [currentPage, getTotalPages, sortOption, systemLayout]);

  useEffect(() => {
    fetchListingCallback();
  }, [fetchListingCallback]);

  const sortProperties = sortOption
    ? handlePropertySorting({ item: itemsData, options: sortOption })
    : itemsData;

  return (
    <Suspense fallback={<MemoSkeletonItem />}>
      {error ? (
        <div className="flex items-center justify-center my-8">
          <h2 className="bold-20 2xl:bold-24 text-red-600">{error}</h2>
        </div>
      ) : (
        sortProperties.length > 0 &&
        sortProperties.map((item, index) => {
          return (
            <Suspense key={item._id} fallback={<div>Loading item...</div>}>
              {systemLayout !== null && systemLayout === "list" ? (
                <MemoListProperties
                  data={item}
                  index={index}
                  layout={systemLayout}
                />
              ) : (
                <MemoGridProperties layout={systemLayout} data={item} />
              )}
            </Suspense>
          );
        })
      )}
    </Suspense>
  );
};

export default PropertyListings;
