import React, { memo } from "react";
import { AvailableProperties } from "types/listing";
import { Badge } from "components/ui/badge";
import { MdOutlineLocationOn } from "react-icons/md";
import MemoizeListingDetails from "../listings/ListingDetails";

type GridPropertiesrops = {
  data: AvailableProperties;
  layout: string;
};

const GridProperties: React.FC<GridPropertiesrops> = ({ data, layout }) => {
  return (
    <div className="w-80 md:w-96 2xl:w-[414px] max-w-xl h-fit min-h-[448px] flexColStart bg-transparent">
      <img
        src={data.imageUrls[0]}
        alt={data.name}
        decoding="async"
        loading="lazy"
        className="w-full h-56 rounded-t-3xl shadow-lg aspect-auto object-cover object-center"
      />
      <article className="px-4 pt-2 pb-4 rounded-b-xl border-r border-l border-t-0 border-b border-slate-300/60">
        <div className="space-y-4 p-4 border-b border-slate-300">
          <div className="flexBetween">
            <h3 className="bold-20 lg:bold-24 2xl:text-3xl font-bold">
              ${data.regularPrice}
            </h3>
            <Badge
              className={`${
                data.type === "rent"
                  ? "text-black bg-[#e17654]"
                  : "text-slate-300 bg-blue-600"
              } p-2 rounded-full text-xs font-bold`}
            >
              For {data.type}
            </Badge>
          </div>
          <div className="flexBetween">
            <p className="text-base lg:text-lg 2xl:text-xl font-semibold capitalize whitespace-normal">
              {data.name}
            </p>
            <span className="flexStart items-center gap-x-0.5">
              <MdOutlineLocationOn className="size-4 fill-slate-600" />
              <p className="regular-12 xl:regular-14 text-slate-600">
                {data.address}
              </p>
            </span>
          </div>
        </div>
        <div className="size-full flexBetween border-b border-slate-300 p-4">
          <MemoizeListingDetails data={data} layout={layout} />
        </div>
        <div className="flex items-center justify-start space-x-2 xl:space-x-3 px-4 pt-4">
          <img
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
            alt="avatar"
            loading="lazy"
            decoding="async"
            className="size-8 rounded-full shadow-md aspect-auto object-cover object-center"
          />
          <div className="flexColStart text-left whitespace-normal">
            <h4 className="text-xs xl:text-sm font-bold">Jennifer Bloom</h4>
            <p className="regular-12 xl:regular-14 text-slate-600 mt-2">
              +44 235 123 312
            </p>
          </div>
        </div>
      </article>
    </div>
  );
};

const MemoGridProperties = memo(GridProperties);

export default MemoGridProperties;
