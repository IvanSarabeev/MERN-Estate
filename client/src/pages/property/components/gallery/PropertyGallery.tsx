import React from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

type PropertyGalleryProps = {
  images: string[] | undefined;
};

const PropertyGallery: React.FC<PropertyGalleryProps> = ({ images }) => {
  return (
    <div className="flex flex-col space-y-4 md:space-y-6 lg:space-y-8">
      <h4 className="bold-20 md:bold-24 xl:text-3xl xl:font-bold capitalize whitespace-normal">
        From Our Gallery
      </h4>
      <div className="flex flex-col sm:flex-row sm:flexCenter gap-6">
        <PhotoProvider>
          {images !== null &&
            images?.slice(0, 2)?.map((image) => {
              return (
                <PhotoView src={image} key={image}>
                  <img
                    src={image}
                    alt={image}
                    loading="lazy"
                    decoding="async"
                    className="h-52 md:odd:w-4/6 even:w-full rounded-md aspect-auto object-fill basic-transition group-hover:rounded-lg group-hover:border group-hover:border-white group-hover:scale-105 hover:drop-shadow-xl hover:cursor-pointer"
                  />
                </PhotoView>
              );
            })}
        </PhotoProvider>
      </div>
      <div className="flex flex-col sm:flex-row sm:flexCenter gap-6">
        <PhotoProvider>
          {images !== null &&
            images?.slice(2, 4)?.map((image) => {
              return (
                <PhotoView key={image} src={image}>
                  <img
                    src={image}
                    alt={image}
                    loading="lazy"
                    decoding="async"
                    className="h-52 odd:w-full even:w-full even:md:w-4/6 rounded-md aspect-auto object-fill basic-transition group-hover:rounded-lg group-hover:border group-hover:border-white group-hover:scale-105 hover:drop-shadow-xl hover:cursor-pointer"
                  />
                </PhotoView>
              );
            })}
        </PhotoProvider>
      </div>
    </div>
  );
};

export default PropertyGallery;
