import React from "react";
import { FaStar } from "react-icons/fa6";
import { HiUserGroup } from "react-icons/hi";

const PromoBox: React.FC = () => {
  return (
    <>
      <div className="z-10 absolute group bottom-[25%] right-[-10%] hidden xl:block px-4 py-3.5 rounded-xl shadow-lg bg-white hover:-rotate-3 hover:shadow-2xl transition-all ease-in-out duration-150">
        <span className="inline-flex gap-x-4 justify-center">
          <div className="p-3 rounded-full bg-[#f0f5fd]">
            <span className="sr-only">Star Icon</span>
            <FaStar
              title="Star icon"
              className="size-6 fill-[#0066ff] group-hover:animate-pulse transition-all ease-in-out"
            />
          </div>
          <p className="max-w-48 font-semibold regular-14 lg:regular-16 text-slate-950 leading-8">
            We have more than 10 years of experience
          </p>
        </span>
      </div>
      <div className="z-10 absolute group bottom-[2%] right-[-20%] hidden xl:block px-4 py-3.5 rounded-xl shadow-lg bg-white hover:-rotate-3 hover:shadow-2xl transition-all ease-in-out duration-150">
        <span className="inline-flex gap-x-4 justify-center">
          <div className="p-3 rounded-full bg-[#f0f5fd]">
            <span className="sr-only">Group Icon</span>
            <HiUserGroup
              title="Group icon"
              className="size-6 fill-[#0066ff] group-hover:animate-pulse transition-all ease-in-out"
            />
          </div>
          <p className="max-w-48 font-semibold regular-14 lg:regular-16 text-slate-950 leading-8">
            We use professional and experienced personal
          </p>
        </span>
      </div>
    </>
  );
};

export default PromoBox;
