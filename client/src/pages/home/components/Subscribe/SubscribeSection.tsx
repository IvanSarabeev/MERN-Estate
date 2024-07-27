import React from "react";
import Input from "components/HTML/Input.tsx";
import Banner from "assets/images/banner.png";
import Property from "assets/images/property-preview.png";

const SubscribeSection: React.FC = () => {
  return (
    <div className="relative w-full h-72 md:h-80 flex items-start justify-start">
      <div className="hidden md:block relative w-1/4 h-auto">
        <img
          src={Property}
          alt="property"
          loading="lazy"
          decoding="async"
          className="invisible md:visible md:absolute z-10 -top-28 w-full h-[428px] rounded-bl-2xl drop-shadow-md aspect-auto object-cover object-center"
        />
      </div>
      <div className="z-20 w-full md:max-w-xl flexColCenter items-center md:flexColEnd md:items-start my-auto ml-0 md:ml-20 px-2 sm:px-4 md:px-0">
        <h3 className="size-fit text-3xl lg:text-4xl 2xl:text-5xl leading-10 md:leading-[3.35rem] px-4 pb-4 lg:pb-8 2xl:pb-12 text-center md:text-left font-semibold text-white">
          Get the latest news and special offers for you
        </h3>
        <form
          action=""
          method="post"
          className="min-w-md max-w-lg mt-2 lg:mt-4"
        >
          <div className="relative">
            <Input
              type="email"
              required
              autoComplete={"false"}
              placeholder="Fill your email here"
              aria-label="Email for subscribtion"
              className="w-full min-w-96 max-w-lg h-fit px-6 py-4 xl:px-8 xl:py-5 text-slate-900 rounded-2xl bg-white"
            />
            <button
              type="button"
              title="Subscribtion button"
              aria-label="Subscribe button"
              className="absolute top-1.5 xl:top-2 right-5 text-white px-4 py-2.5 xl:px-6 xl:py-3 rounded-xl bg-blue-600"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
      <img
        src={Banner}
        alt="banner"
        decoding="async"
        loading="lazy"
        className="absolute -z-10 -right-0 top-0 md:-top-2 size-full rounded-2xl object-cover object-center aspect-square"
      />
    </div>
  );
};

export default SubscribeSection;
