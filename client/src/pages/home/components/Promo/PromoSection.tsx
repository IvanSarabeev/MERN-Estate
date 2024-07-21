import React, { memo } from "react";
import SideImageView from "assets/images/house-clear-sky.jpg";
import { Link } from "react-router-dom";
import PromoBox from "./PromoBox";

const PromoSection: React.FC = () => {
  return (
    <div className="max-w-screen-xl mx-auto gap-y-4 flex flex-col md:flex-row justify-around items-center">
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
      <div className="flex flex-col items-start justify-center">
        <h2 className="text-4xl leading-10 md:leading-[3.35rem] font-semibold text-slate-900">
          We are the best and most <br />
          trusted real estate agent
        </h2>
        <p className="text-slate-500/90 regular-16 md:regular-18 font-medium mt-5 mb-4 text-balance">
          We are a trusted real estate agent with more <br />
          than a decade of experience. You can trust us
        </p>
        <ul role="list" className="list-disc pl-5 space-y-3 text-slate-500">
          <li>
            <p className="text-slate-500/95 regular-16">
              45k partners have worked with us
            </p>
          </li>
          <li>
            <p className="text-slate-500/95 regular-16">
              Professional and experienced human resources
            </p>
          </li>
          <li>
            <p className="text-slate-500/95 regular-16">
              Provide the best service for users
            </p>
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
