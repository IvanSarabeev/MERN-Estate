import React, { memo } from "react";
import { propertyTypesImgs } from "components/constants";
import MemoImage from "components/Image";
import Tooltip from "components/__comp/Tooltip";

const PropertyTypes: React.FC = () => {
  return (
    <section className="padding-container max-container">
      <div className="gap-4 flex items-center justify-evenly md:justify-around flex-wrap">
        {propertyTypesImgs.map((item) => {
          return (
            <Tooltip key={item.id} text={item.alt}>
              <MemoImage
                altText={item.alt}
                imageName={item.imgSrc}
                imgFormat={item.format}
                className="h-fit size-14 sm:size-16 md:size-20 lg:size-24 flex-1 rounded-full shadow-md border-none outline-none bg-center aspect-auto object-cover basic-transition hover:scale-105 focus:ring-0"
              />
            </Tooltip>
          );
        })}
      </div>
    </section>
  );
};

const MemoPropertyTypes = memo(PropertyTypes);

export default MemoPropertyTypes;
