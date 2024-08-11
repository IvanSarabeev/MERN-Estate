import React, { memo } from "react";
import { Skeleton } from "components/ui/skeleton";

const ListingLoader: React.FC = () => {
  const skeletonToArray = [...Array(3)];
  return (
    <>
      {skeletonToArray.map((_, index) => (
        <div
          key={index}
          className="w-full flex items-center space-x-4 animate-pulse"
        >
          <Skeleton className="h-16 w-20 rounded-full bg-slate-400" />
          <div className="w-full space-y-2">
            <Skeleton className="h-4 w-full bg-slate-300" />
            <Skeleton className="h-4 w-3/4 bg-slate-200" />
          </div>
        </div>
      ))}
    </>
  );
};

const MemoListingLoader = memo(ListingLoader);

export default MemoListingLoader;
