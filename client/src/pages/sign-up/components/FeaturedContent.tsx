import React, { memo } from "react";
import { avatarList } from "components/constants";
import { Link } from "react-router-dom";

const FeaturedContent: React.FC = () => {
  return (
    <div className="h-full md:h-screen w-full lg:w-1/2 flex flex-col items-start justify-center padding-container bg-[#0284c7]">
      <h1 className="text-white text-3xl lg:text-5xl font-extrabold mb-4 text-balance">
        Explore the world’s leading MERN estate application.
      </h1>
      <p className="text-[#fde6ba] regular-16 lg:regular-18 opacity-80 font-light mb-4 text-wrap max-w-3xl">
        Millions of people and agencies around the world use our work on
        MERN/Estate - the home to the world’s best real estate and professional
        employees.
      </p>
      <div className="flex items-center justify-start">
        <div className="flex -space-x-4 rtl:space-x-reverse pr-3">
          {avatarList.map((item) => {
            return (
              <img
                key={item.id}
                src={item.src}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                className="size-10 2xl:size-12 border-2 border-white rounded-full dark:border-gray-800 aspect-auto object-cover object-center"
              />
            );
          })}
        </div>
        <Link to={`/search`} className="border-l border-[0284c7]">
          <span className="regular-14 md:regular-16 leading-5 font-light text-white/80 md:pl-3">
            Over{" "}
            <span className="font-medium md:font-bold text-white opacity-100 px-1">
              15.7k
            </span>{" "}
            Happy Customers
          </span>
        </Link>
      </div>
    </div>
  );
};

const MemoFeaturedContent = memo(FeaturedContent);

export default MemoFeaturedContent;
