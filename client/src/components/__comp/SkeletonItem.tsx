import React, { memo } from "react";
import { Skeleton } from "../ui/skeleton";

const SkeletonItem: React.FunctionComponent = () => {
  const skeletonToArray = [...Array(5)];

  return (
    <>
      {skeletonToArray.map((_, index) => (
        <div
          key={index}
          className="w-full min-w-96 md:w-[448px] lg:w-[512px] xl:-w-[576px] 2xl:w-[672px]  flex items-center space-x-4 animate-pulse"
        >
          <Skeleton className="size-12 md:size-14 xl:size-16 rounded-full" />
          <div className="w-full space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      ))}
    </>
  );
};

const MemoSkeletonItem = memo(SkeletonItem);

export default MemoSkeletonItem;
