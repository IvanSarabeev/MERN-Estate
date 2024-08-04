import React, { useEffect, useState } from "react";
import { SingleListingResponse } from "types/listing";
import MemoImageGallery from "./ImageGallery";

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
      <article>
        <div></div>
        <aside></aside>
      </article>
    </>
  );
};

export default PropertyItem;
