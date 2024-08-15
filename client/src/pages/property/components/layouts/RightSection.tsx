import React from "react";
import { SingleListingResponse } from "types/listing";
import FeaturedListings from "../featured/FeaturedListings";
import MemoQuestion from "../info/Question";
import InfoBox from "../info/InfoBox";

type RightSectionProps = {
  data: SingleListingResponse | null;
};

const RightSection: React.FC<RightSectionProps> = ({ data }) => {
  return (
    <div className="size-full md:max-w-md lg:w-1/2 space-y-4 xl:space-y-6">
      <MemoQuestion data={data} />
      <FeaturedListings />
      <InfoBox />
    </div>
  );
};

export default RightSection;
