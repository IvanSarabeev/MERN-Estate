import React, { memo } from "react";
import { CircleCheckBig, PhoneCall, Play } from "lucide-react";
import MemoImage from "components/Image";
import { customerOverview } from "components/constants";
import { Link } from "react-router-dom";
import { cn } from "lib/utils";

const CustomerInfo: React.FC = () => {
  return (
    <section className="size-full flexColCenter space-y-8 sm:space-y-10 md:space-y-16 lg:space-y-20 padding-container max-container">
      <div className="md:gap-x-16 lg:gap-x-20 2xl:gap-x-24 flexColCenter space-y-4 lg:space-y-6 md:flex-row md:flexBetween">
        <div className="size-full flexColStart">
          <h2 className="bold-24 lg:text-3xl xl:text-4xl mb-4 font-sans whitespace-normal">
            Realar Vission & Mission
          </h2>
          <p className="w-full regular-14 lg:regular-16 max-w-2xl">
            You are the center of our process. Your needs, your wants, and your
            goals. We actively listen, always keep it even keel — never rushing
            you or pushing something you don’t need.
          </p>
          <p className="w-full regular-14 lg:regular-16 max-w-2xl mt-1">
            Full transparency is our goal. We stay connected while building your
            home, clearly outlining next steps and collaborating with you to
            select personal design details. From day one, your peace of mind is
            our highest priority.
          </p>
        </div>
        <div className="relative size-full">
          <MemoImage
            imgFormat="jpg"
            altText="Business talk"
            imageName="image/business-talk"
            className="size-full max-w-xl rounded-3xl mx-auto aspect-auto object-cover object-center basic-transition shadow-sm hover:shadow-md hover:scale-105"
          />
          <div className="absolute z-10 top-[25%] lg:top-8 right-[40%] lg:right-0 size-20 flexCenter rounded-full bg-slate-500/90">
            <span className="sr-only">Player Icon</span>
            <Play className="size-6 lg:size-8 fill-slate-900" />
          </div>
        </div>
      </div>
      <div className="md:gap-x-16 lg:gap-x-20 2xl:gap-x-24 flexColCenter space-y-4 lg:space-y-6 md:flex-row md:flexBetween">
        <MemoImage
          imgFormat="jpg"
          altText="Outdoor hous"
          imageName="image/outdoor-house"
          className="size-full max-h-[324px] max-w-xl md:max-w-lg rounded-3xl mx-auto aspect-auto object-cover object-center basic-transition shadow-sm hover:shadow-md hover:scale-105"
        />
        <div className="size-full flexColStart">
          <p className="w-full regular-14 lg:regular-16 max-w-2xl">
            We design homes for how people live. Centered Design is our
            philosophy, our approach to creating spaces that energize and
            inspire.
          </p>
          <p className="w-full regular-14 lg:regular-16 max-w-2xl mt-4">
            Our floor plan designs focus on three elements: natural light,
            color, and clean air all qualities that support your wellbeing and
            energy levels. When you walk into our homes, you’ll see design that
            puts people first, and more importantly, you’ll feel it.
          </p>
        </div>
      </div>
      <div className="md:gap-x-16 lg:gap-x-20 2xl:gap-x-24 flexColCenter space-y-4 lg:space-y-6 md:flex-row md:flexBetween">
        <div className="size-full flexColStart">
          <p className="w-full regular-14 lg:regular-16 max-w-3xl first-letter:regular-18">
            That’s why we build every home like it’s our own. Building locally
            since 1988, we hold ourselves to the highest standards of quality
            and construction integrity. In addition to the 28 required county
            inspections, we complete nine formal Inland inspections, plus nine
            more third-party critical inspections — that’s 18 additional formal
            inspections on every Inland Home, by choice. Our goal is that each
            home will serve your family, and others, for generations to come.
          </p>
          <div className="flex mt-10">
            <ul className="flexColStart space-y-2 pr-10 regular-16 md:regular-18 font-sans">
              {customerOverview.map((item) => {
                return (
                  <li
                    key={item.id}
                    className="inline-flex gap-x-2 items-center justify-start"
                  >
                    <CircleCheckBig className="size-5 text-blue-600" />
                    {item.label}
                  </li>
                );
              })}
            </ul>
            <div className="flexColStart space-y-2 md:space-y-3 pl-10 border-l border-slate-600 ">
              <div className="group size-14 flexCenter border border-slate-50 rounded-full shadow-md bg-slate-600 basic-transition scale-95 hover:border-slate-900 hover:bg-transparent hover:scale-100">
                <span className="sr-only">Phone Icon</span>
                <PhoneCall className="size-6 text-white group-hover:text-black" />
              </div>
              <p className={cn(`regular-16 md:regular-18`, "font-semibold")}>
                Call Us 24/7
              </p>
              <Link
                to={"tel:+0123456789"}
                className="text-xl font-bold basic-transition hover:underline underline-offset-4"
              >
                +01 234 56789
              </Link>
            </div>
          </div>
        </div>
        <MemoImage
          imgFormat="jpg"
          altText="Outdoor hous"
          imageName="image/acquiring-deal"
          className="size-full max-w-xl md:max-w-3xl rounded-3xl mx-auto aspect-auto object-cover object-center basic-transition shadow-sm hover:shadow-md hover:scale-105"
        />
      </div>
    </section>
  );
};

const MemoCustomerInfo = memo(CustomerInfo);

export default MemoCustomerInfo;
