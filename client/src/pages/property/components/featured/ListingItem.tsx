import React, { memo } from "react";
import { Link } from "react-router-dom";
import { AvailableProperties } from "types/listing";
import { Calendar, Link as LinkIcon } from "lucide-react";

type ListingItemProps = {
  data: AvailableProperties;
};

const ListingItem: React.FC<ListingItemProps> = ({ data }) => {
  return (
    <div className="h-fit w-full flex items-center justify-start gap-x-6 space-y-2 sm:space-y-4 md:space-y-0 hover:drop-shadow-2xl">
      <Link
        to={`/property/${data._id}`}
        className="relative group size-fit overflow-x-hidden"
      >
        <img
          src={data.imageUrls[0]}
          alt={data.name}
          decoding="async"
          loading="lazy"
          className="w-[220px] h-fit rounded-md object-cover object-center basic-transition"
        />
        <div className="absolute inset-0 z-0 size-full rounded-md group-hover:bg-black group-hover:opacity-50 basic-transition" />
        <LinkIcon className="absolute -z-20 group-hover:z-20 size-8 left-[35%] top-[35%] group-hover:text-yellow-500 opacity-100 basic-transition" />
      </Link>
      <div className="size-full space-y-2 flexColStart text-white">
        <h4 className="w-full regular-18 xl:bold-20 capitalize hover:text-orange-300 basic-transition">
          Exploring The {data.name}
        </h4>
        <div className="flexStart items-center gap-x-1 md:gap-x-1.5 hover:text-orange-300 basic-transition">
          <span>
            <span className="sr-only">Calendar Icon</span>
            <Calendar className="size-4 md:size-5" />
          </span>
          <p className="regular-14 md:regular-16">22/6/2024</p>
        </div>
      </div>
    </div>
  );
};

const MemoListingItem = memo(ListingItem);

export default MemoListingItem;
