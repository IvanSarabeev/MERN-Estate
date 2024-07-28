import React, { memo } from "react";
import SideImageView from "assets/images/house-clear-sky.jpg";
import { Link } from "react-router-dom";
import PromoBox from "./PromoBox";
import { IoMdCheckmark } from "react-icons/io";

const PromoSection: React.FC = () => {
  return (
    <div className="max-w-screen-xl mx-auto gap-y-4 flexBetween flex-col md:flex-row ">
      <div className="relative">
        <img
          title="side-view"
          decoding="async"
          loading="lazy"
          src={SideImageView}
          alt="side-view"
          className="size-96 md:size-[450px] rounded-3xl aspect-auto object-center object-cover"
        />
        <MemoPromoBox />
      </div>
      <div className="flex flex-col items-start justify-center space-y-6">
        <h2 className="text-4xl 2xl:text-5xl leading-10 md:leading-[3.35rem] font-semibold text-slate-900">
          We are the best and most <br />
          trusted real estate agent
        </h2>
        <p className="text-slate-500/90 regular-16 md:regular-18 font-medium mt-5 mb-4 text-balance">
          We are a trusted real estate agent with more <br />
          than a decade of experience. You can trust us
        </p>
        <ul className="flexCol list-none pl-5 space-y-3 text-slate-500">
          <li>
            <span className="group inline-flex items-center gap-x-4 justify-start">
              <div className="p-2.5 rounded-full shadow-md group-hover:scale-105 bg-[#f0f5fd] transition-all ease-in-out duration-150 group-hover:bg-[#0066ff]">
                <IoMdCheckmark className="size-4 fill-[#0066ff] group-hover:fill-[#f0f5fd]" />
              </div>
              <p className="text-slate-500/95 regular-16 group-hover:text-slate-700/95">
                45k partners have worked with us
              </p>
            </span>
          </li>
          <li>
            <span className="group inline-flex items-center gap-x-4 justify-start">
              <div className="p-2.5 rounded-full shadow-md group-hover:scale-105 bg-[#f0f5fd] transition-all ease-in-out duration-150 group-hover:bg-[#0066ff]">
                <IoMdCheckmark className="size-4 fill-[#0066ff] group-hover:fill-[#f0f5fd]" />
              </div>
              <p className="text-slate-500/95 regular-16 group-hover:text-slate-700/95">
                Professional and experienced human resources
              </p>
            </span>
          </li>
          <li>
            <span className="group inline-flex items-center gap-x-4 justify-start">
              <div className="p-2.5 rounded-full shadow-md group-hover:scale-105 bg-[#f0f5fd] transition-all ease-in-out duration-150 group-hover:bg-[#0066ff]">
                <IoMdCheckmark className="size-4 fill-[#0066ff] group-hover:fill-[#f0f5fd]" />
              </div>
              <p className="text-slate-500/95 regular-16 group-hover:text-slate-700/95">
                Provide the best service for users
              </p>
            </span>
          </li>
        </ul>
        <Link
          to={"/about"}
          title="Learn more link"
          className="text-white regular-18 font-semibold px-7 py-3 rounded-xl bg-blue-600 mt-6"
        >
          Learn more
        </Link>
      </div>
    </div>
  );
};

const MemoPromoBox = memo(PromoBox);

export default PromoSection;
