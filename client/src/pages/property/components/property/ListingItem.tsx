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
          className="w-32 h-fit sm:size-18 md:size-20 lg:size-24 rounded-md aspect-auto object-cover object-center basic-transition"
        />
        <div className="absolute inset-0 z-0 size-full rounded-md group-hover:bg-black group-hover:opacity-50 basic-transition" />
        <LinkIcon className="absolute -z-20 group-hover:z-20 size-10 inset-x-1/4 inset-y-1/4 group-hover:text-yellow-500 opacity-100 basic-transition" />
      </Link>
      <div className="space-y-2 flexColStart text-white">
        <h4 className="regular-18 xl:text-xl capitalize text-balance hover:text-orange-300 basic-transition">
          Exploring The {data.name}
        </h4>
        <span className="flexStart items-center gap-x-1 md:gap-x-1.5 hover:text-orange-300 basic-transition">
          <Calendar className="size-4" />
          <p className=":regular-16">22/6/2024</p>
        </span>
      </div>
    </div>
  );
};

const MemoListingItem = memo(ListingItem);

export default MemoListingItem;
