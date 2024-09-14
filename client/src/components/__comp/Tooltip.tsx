import React, { memo, useState } from "react";
import { cn } from "lib/utils";

type TooltipProps = {
  text: string;
  children: React.ReactNode;
  className?: string;
};

const Tooltip: React.FC<TooltipProps> = ({ text, children, className }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      role="button"
      aria-roledescription="tooltip container"
      aria-describedby="tooltip"
      className="relative size-fit inline-block mx-auto"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          id="tooltip"
          role="tooltip"
          className={cn(
            className,
            "absolute inset-x-2 bottom-full w-max px-2 py-1 regular-12 lg:regular-14 text-white rounded-lg mb-2 mx-auto shadow-md bg-black"
          )}
        >
          {text}
        </div>
      )}
    </div>
  );
};

const MemoTooltip = memo(Tooltip);

export default MemoTooltip;
