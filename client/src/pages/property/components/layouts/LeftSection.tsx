import React from "react";
import { SingleListingResponse } from "types/listing";
import MemoPropertyInfo from "../property/PropertyInfo";
import MemoPropertyOverview from "../property/PropertyOverview";
import MemoPropertyGallery from "../gallery/PropertyGallery";

type LeftSectionProps = {
  data: SingleListingResponse | null;
};

const LeftSection: React.FC<LeftSectionProps> = ({ data }) => {
  const images = data?.imageUrls;

  return (
    <div className="size-full space-y-4 xl:space-y-6">
      <MemoPropertyInfo data={data} />
      <MemoPropertyOverview data={data} />
      <MemoPropertyGallery images={images} />
    </div>
  );
};

export default LeftSection;
