import React from "react";

type RightSectionProps = {
  children: React.ReactNode;
};

const RightSection: React.FC<RightSectionProps> = ({ children }) => {
  return <div className="size-full lg:w-1/2 space-y-4">{children}</div>;
};

export default RightSection;
