import React from "react";

type AvatarProps = {
  src: string | undefined;
  alt: string;
};

const Avatar: React.FC<AvatarProps> = ({ src, alt }) => {
  return (
    <div className="relative">
      <img
        src={src}
        alt={alt}
        decoding="async"
        loading="eager"
        className="avatar-img"
      />
      <span className="absolute bottom-0 left-5 size-3.5 border-2 border-white rounded-full bg-green-400"></span>
    </div>
  );
};

export default Avatar;
