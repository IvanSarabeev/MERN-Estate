import React, { memo } from "react";
import { loginList } from "components/constants";
import { IoIosCheckmarkCircle } from "react-icons/io";

const OnboardingInfo: React.FC = () => {
  return (
    <div className="flexColStart space-y-2 md:space-y-4 mb-2">
      <img
        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
        alt="logo"
        loading="lazy"
        decoding="async"
        className="size-8 lg:size-10 xl:size-12 2xl:size-14 mb-2 md:mb-4 xl:mb-6 aspect-auto object-contain object-center"
      />
      {loginList.map((item) => {
        return (
          <div key={item.id} className="group gap-x-2 flex items-center">
            <span>
              <span className="sr-only">Marker Icon</span>
              <IoIosCheckmarkCircle className="size-5 sm:size-6 md:size-7 xl:size-8 fill-[#0284c7]" />
            </span>
            <div className="flex flex-col items-start justify-start">
              <h3 className="regular-18 xl:bold-20 font-bold">{item.title}</h3>
              <p className="max-w-md regular-14 lg:regular-16 font-light mb-2 opacity-60">
                {item.text}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const MemoOnboardInfo = memo(OnboardingInfo);

export default MemoOnboardInfo;
