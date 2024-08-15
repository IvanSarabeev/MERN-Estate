import React, { memo, useEffect, useState } from "react";
import { SingleListingResponse } from "types/listing";
import MemoImageGallery from "./gallery/ImageGallery";
import LeftSection from "./layouts/LeftSection";
import RightSection from "./layouts/RightSection";

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
      <section className="gap-4 flex flex-col items-start justify-center lg:flex-row lg:justify-between">
        <LeftSection data={data} />
        <RightSection data={data} />
      </section>
    </>
  );
};

const MemoPropertyItem = memo(PropertyItem);

export default MemoPropertyItem;
