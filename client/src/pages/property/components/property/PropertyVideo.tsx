import React from "react";
import MemoVideoPlayer from "components/Video/VideoPlayer";

const PropertyVideo: React.FC = () => {
  return (
    <section className="flexColStart space-y-4 lg:space-y-6">
      <h4 className="bold-20 md:bold-24 xl:text-3xl xl:font-bold capitalize whitespace-normal">
        Property Video
      </h4>
      <MemoVideoPlayer
        videoName={import.meta.env.VITE_CLOUD_STORAGE}
        srcFormat="mp4"
        name="Property"
        height={420}
        borderRadius={18}
      />
    </section>
  );
};

export default PropertyVideo;
