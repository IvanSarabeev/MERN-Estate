import React, { memo, useEffect, useState } from "react";
import { SingleListingResponse } from "types/listing";
import MemoImageGallery from "../gallery/ImageGallery";
import MemoPropertyInfo from "./PropertyInfo";
import MemoQuestionForm from "../Question";
import MemoPropertyOverview from "./PropertyOverview";
import FeaturedListings from "./FeaturedListings";
import LeftSection from "../LeftSection";
import RightSection from "../RightSection";
import MemoPropertyGallery from "../gallery/PropertyGallery";

type PropertyItemProps = {
  data: SingleListingResponse | null;
};

const PropertyItem: React.FC<PropertyItemProps> = ({ data }) => {
  const [currentImage, setCurrentImage] = useState<string | undefined>(
    data?.imageUrls[0]
  );

  const handleImageClick = (image: string) => {
    setCurrentImage(image);
  };

  useEffect(() => {
    setCurrentImage(data?.imageUrls[0]);
  }, [data]);

  const images = data?.imageUrls;

  return (
    <>
      <img
        src={currentImage}
        alt={data?.name}
        loading="lazy"
        decoding="async"
        className="max-h-[672px] h-fit w-full rounded-xl aspect-square object-center object-fill"
      />
      <MemoImageGallery
        data={data}
        currentImage={currentImage}
        setCurrentImage={setCurrentImage}
        handleImageClick={handleImageClick}
      />
      <section className="gap-x-4 flex flex-col items-start justify-center lg:flex-row lg:justify-between">
        <LeftSection>
          <MemoPropertyInfo data={data} />
          <MemoPropertyOverview data={data} />
          <MemoPropertyGallery images={images} />
        </LeftSection>
        <RightSection>
          <MemoQuestionForm data={data} />
          <FeaturedListings />
        </RightSection>
      </section>
      {/* <section className="w-full h-fit gap-y-4 sm:gap-y-6 flexColCenter md:flex-row md:flexBetween pt-4 md:pt-6 lg:pt-8">
        <MemoPropertyInfo data={data} />
        <MemoQuestionForm data={data} />
      </section> */}
      {/* <section className="w-full h-fit gap-y-4 sm:gap-y-6 flexColCenter pt-4 md:pt-6 lg:pt-8">
        <h4 className="bold-20 md:bold-24 xl:text-3xl xl:font-bold capitalize whitespace-normal">
          Property Overview
        </h4>
        <div className="w-full h-fit space-y-4 md:space-y-0 flexColCenter md:flex-row md:flexBetween md:items-start gap-x-8">
          <MemoPropertyOverview data={data} />
          <FeaturedListings />
        </div>
      </section> */}
    </>
  );
};

const MemoPropertyItem = memo(PropertyItem);

export default MemoPropertyItem;
