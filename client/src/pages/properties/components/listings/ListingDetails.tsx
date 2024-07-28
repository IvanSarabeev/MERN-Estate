import React, { memo } from "react";
import { MdOutlineBed, MdOutlineShower } from "react-icons/md";
import { GiCryoChamber } from "react-icons/gi";
import { AvailableProperties } from "types/listing";

type ListingDetailsProps = {
  data: AvailableProperties;
};

const ListingDetails: React.FC<ListingDetailsProps> = ({ data }) => {
  return (
    <>
      <span className="inline-flex items-center gap-x-0.5 md:gap-x-1">
        <GiCryoChamber
          title="Square icon"
          aria-label="Square icon"
          className="size-4 xl:size-5 aspect-square"
        />
        <p className="regular-12 xl:regular-14 text-slate-600">
          <strong className="font-bold mr-0.5">{data.bedroom}</strong>
          {""}room
        </p>
      </span>
      <span className="inline-flex items-center gap-x-0.5 md:gap-x-1">
        <MdOutlineBed
          title="Bed icon"
          aria-label="bed icon"
          className="size-4 xl:size-5 aspect-square"
        />
        <p className="regular-12 xl:regular-14 text-slate-600">
          <strong className="font-bold mr-0.5">{data.rooms}</strong>
          {""}bed.
        </p>
      </span>
      <span className="inline-flex items-center gap-x-0.5 md:gap-x-1">
        <MdOutlineShower
          title="Shower icon"
          aria-label="shower icon"
          className="size-4 xl:size-5 aspect-square"
        />
        <p className="regular-12 xl:regular-14 text-slate-600">
          <strong className="font-bold mr-0.5">{data.bathroom}</strong>
          {""}bath.
        </p>
      </span>
    </>
  );
};

const MemoizeListingDetails = memo(ListingDetails);

export default MemoizeListingDetails;
