import React, { useEffect, useState } from "react";
import { SingleListingResponse } from "types/listing";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";
import SwiperCore from "swiper";

type PropertyItemProps = {
  data: SingleListingResponse | null;
};

const PropertyItem: React.FC<PropertyItemProps> = ({ data }) => {
  const [currentImage, setCurrentImage] = useState<string | undefined>(
    data?.imageUrls[0]
  );

  SwiperCore.use([Navigation, Autoplay]);

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
      <Swiper
        navigation
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={20}
        slidesPerView={3}
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        loop={true}
        breakpoints={{
          450: {
            slidesPerView: 2,
          },
          640: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
        onSlideChange={(swiper) =>
          setCurrentImage(data?.imageUrls[swiper.activeIndex])
        }
      >
        {data?.imageUrls.map((image) => (
          <SwiperSlide
            key={image}
            className="mt-4"
            onClick={() => handleImageClick(image)}
            style={{ cursor: "pointer" }}
          >
            <div
              className={`h-32 w-full rounded-md ${
                currentImage === image ? "opacity-40" : ""
              }`}
              style={{
                background: `url(${image}) center no-repeat`,
                backgroundSize: "cover",
                animation: "glowing 20s linear infinite",
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
      <article>
        <div></div>
        <aside></aside>
      </article>
    </>
  );
};

export default PropertyItem;
