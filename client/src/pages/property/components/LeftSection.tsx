import React from "react";

type LeftSectionProps = {
  children: React.ReactNode;
};

const LeftSection: React.FC<LeftSectionProps> = ({ children }) => {
  return <div className="size-full space-y-4">{children}</div>;
};

export default LeftSection;
