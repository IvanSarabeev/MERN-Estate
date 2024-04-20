import React from "react";
import { IconType } from "react-icons/lib";

type BoxProps = {
  title: string;
  text: string;
  Icon: IconType;
};

const BoxSection: React.FC<BoxProps> = ({ title, text, Icon }) => {
  return (
    <div className="max-w-xs">
      <div className="icon-container">
        <Icon className="size-8 aspect-auto object-cover" />
      </div>
      <h3 className="regular-18 lg:bold-20 font-bold mb-2">{title}</h3>
      <p className="text-[#6b7280] opacity-85 mb-3">{text}</p>
    </div>
  );
};

export default BoxSection;
