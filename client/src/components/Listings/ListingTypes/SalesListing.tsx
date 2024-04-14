import { FunctionComponent, memo } from "react";
import { CreateListingIntf } from "types/listing";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { LuBedSingle } from "react-icons/lu";
import { LiaBathSolid } from "react-icons/lia";

type SalesListingProps = {
  item: CreateListingIntf;
};

const SalesListing: FunctionComponent<SalesListingProps> = ({
  item,
}: SalesListingProps) => {
  return (
    <>
      <div className="w-full sm:w-[330px] gap-4 lg:gap-6 flex flex-col rounded-lg shadow-md bg-white transition-all ease-linear overflow-hidden hover:shadow-xl">
        <Link to={`/listing/${item._id}`}>
          <img
            src={`${item.imageUrls[0]}`}
            alt={`${item.name}`}
            className="w-full h-[320px] sm:h-[220px] rounded-lg shadow-sm aspect-auto object-cover transition-all ease-in-out duration-200 hover:scale-105"
          />
          <div className="w-full gap-2 flex flex-col p-2 md:p-4">
            <h4 className="regular-14 md:regular-16 xl:regular-18 font-bold truncate">
              {item.name}
            </h4>
            <span className="gap-1 md:gap-2.5 flexStart">
              <MdLocationOn className="size-4 text-green-500" />
              <p className="regular-12 md:regular-14 text-gray-600 line-clamp-2">
                {item.address}
              </p>
            </span>
            <p className="text-sm text-gray-600 line-clamp-2">
              {item.description}
            </p>
            <div className="flex items-center justify-between">
              <p className="text-slate-500 mt-2 font-semibold ">
                $
                {item.offer
                  ? item.discountPrice?.toLocaleString("en-US")
                  : item.regularPrice?.toLocaleString("en-US")}
                {item.type === "rent" && " / month"}
              </p>
              <div className="text-slate-700 flex items-center gap-x-4">
                <div className="gap-0.5 flex items-center font-bold text-xs">
                  <LuBedSingle className="size-4" />
                  {item.bedroom !== null ? `${item.bedroom} beds` : ""}
                </div>
                <div className="gap-0.5 flex items-center font-bold text-xs">
                  <LiaBathSolid className="size-4" />
                  {item.bathroom !== null ? `${item.bathroom} baths ` : ""}
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

const SalesProperty = memo(SalesListing);

export default SalesProperty;
