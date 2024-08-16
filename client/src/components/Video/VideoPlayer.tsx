import React, { memo } from "react";
import cloudinary from "lib/cloudinary";
import { AdvancedVideo } from "@cloudinary/react";
import { scale } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";

type VideoPlayerProps = {
  videoName: string;
  srcFormat: string;
  name: string;
  width?: string | number;
  height?: string | number;
  borderRadius?: number;
  onPlay?: () => void;
  onPause?: () => void;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoName,
  srcFormat,
  name = "",
  width = "auto",
  height = "auto",
  borderRadius = 20,
  onPlay,
  onPause,
}) => {
  const myVideo = cloudinary.video(videoName);

  myVideo
    .resize(scale().width(width).height(height))
    .roundCorners(byRadius(borderRadius))
    .quality("auto");

  return (
    <div className={`size-fit rounded-[${borderRadius}px]`}>
      <AdvancedVideo
        title={`Video /${name}`}
        cldVid={myVideo.format(`${srcFormat}`)}
        cldPoster={"auto"}
        onPlay={onPlay}
        onPause={onPause}
        aria-label="video"
        loop={false}
        muted={false}
        controls
      />
    </div>
  );
};

const MemoVideoPlayer = memo(VideoPlayer);

export default MemoVideoPlayer;
