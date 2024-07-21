import React from "react";
import AppleLogo from "assets/images/icons/app-store.jpeg";
import GoogleLogo from "assets/images/icons/google-play.jpeg";
import { IoStar } from "react-icons/io5";
import DeviceMockup from "assets/images/signup-page-mockup.png";

const AppReviewSection: React.FC = () => {
  return (
    <>
      <article className="flexColCenter items-center md:flexColStart md:items-start space-y-6">
        <h2 className="max-w-sm md:max-w-md xl:max-w-xl font-semibold text-3xl md:text-4xl 2xl:text-5xl whitespace-pre-wrap leading-10 text-center md:text-left md:text-balance">
          You can find your dream home in your hands
        </h2>
        <p className="max-w-sm text-slate-500/90 regular-16 md:regular-18 font-medium mt-5 mb-4 text-justify md:text-balance">
          You can find our app which is available in the App Store and Play
          Store. Feel free to use our application to find your residence
        </p>
        <div className="inline-flex items-center gap-x-8">
          <img
            src={GoogleLogo}
            alt="App store"
            decoding="async"
            loading="lazy"
            className="min-w-[153px] min-h-11 aspect-auto object-cover object-center rounded-lg"
          />
          <img
            src={AppleLogo}
            alt="Google play"
            decoding="async"
            loading="lazy"
            className="min-w-[153px] min-h-11 aspect-auto object-cover object-center rounded-lg"
          />
        </div>
      </article>
      <aside className="h-fit w-full md:w-5/12">
        <div className="relative">
          <img
            src={DeviceMockup}
            alt="phone prototype"
            decoding="async"
            loading="lazy"
            className="max-h-[526px] max-w-96 mx-auto aspect-auto object-cover object-center"
          />
          <div className="absolute z-20 top-[20%] left-[5%] hidden sm:flexColCenter items-center space-y-4 py-4 px-5 rounded-lg shadow-md bg-white">
            <h3 className="font-bold text-3xl xl:text-4xl">4.1</h3>
            <span className="inline-flex gap-x-1.5">
              {[...Array(5)].map((_, index) => {
                return (
                  <IoStar
                    key={index}
                    className={`size-4 ${
                      index !== 4 ? "fill-[#f9a101]" : "transparent"
                    }`}
                  />
                );
              })}
            </span>
            <p className="regular-14 xl:regular-16 text-center whitespace-normal break-before-all">
              120k reviews
            </p>
          </div>
          <div className="absolute -z-10 top-0 w-full h-96 mt-[138px] rounded-t-full bg-blue-500"></div>
        </div>
      </aside>
    </>
  );
};

export default AppReviewSection;
