import React, { memo } from "react";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { SingleListingResponse } from "types/listing";
import "swiper/swiper-bundle.css";

type ImageGalleryProps = {
  data: SingleListingResponse | null;
  currentImage: string | undefined;
  setCurrentImage: React.Dispatch<React.SetStateAction<string | undefined>>;
  handleImageClick: (image: string) => void;
};

const ImageGallery: React.FC<ImageGalleryProps> = ({
  data,
  currentImage,
  setCurrentImage,
  handleImageClick,
}) => {
  SwiperCore.use([Navigation, Autoplay]);

  return (
    <Swiper
      navigation
      modules={[Navigation, Pagination, Autoplay, EffectFade]}
      spaceBetween={20}
      autoplay={{ delay: 5000 }}
      pagination={{ clickable: true }}
      loop={true}
      breakpoints={{
        640: {
          slidesPerView: 2,
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
            className={`h-32 w-full xl:min-w-60 rounded-md ${
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
  );
};

const MemoImageGallery = memo(ImageGallery);

export default MemoImageGallery;
