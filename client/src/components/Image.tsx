import React, { memo } from "react";
import cloudinary from "lib/cloudinary";
import {
  AdvancedImage,
  lazyload,
  placeholder,
  responsive,
} from "@cloudinary/react";
import { scale } from "@cloudinary/url-gen/actions/resize";

type ImageProps = {
  imageName: string;
  altText: string;
  imgFormat: string;
  className?: string;
  width?: string | number | undefined;
};

const Image: React.FC<ImageProps> = ({
  imageName,
  altText,
  imgFormat = "auto",
  className = "",
  width = "auto",
}) => {
  const myImage = cloudinary.image(imageName);

  if (width) myImage.resize(scale().width(width));
  if (imgFormat) myImage.format(imgFormat);

  return (
    <AdvancedImage
      alt={altText}
      cldImg={myImage.format(imgFormat)}
      className={className}
      plugins={[lazyload(), responsive(), placeholder()]}
    />
  );
};

const MemoImage = memo(Image);

export default MemoImage;
