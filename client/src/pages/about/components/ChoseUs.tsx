import React, { memo } from "react";
import Button from "components/HTML/Button";
import { ArrowRight, LucideIcon } from "lucide-react";
import { servicesOverviewData } from "components/constants";
import MemoImage from "components/Image";

const ChoseUs: React.FC = () => {
  return (
    <section className="flex flex-col justify-center bg-slate-900/90">
      <div className="w-full space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-10 text-white padding-container max-container">
        <div className="space-y-4 flexColCenter md:flex-row md:flexBetween">
          <div className="flexColStart space-y-4">
            <h2 className="font-sans text-bold-24 xl:text-4xl font-bold">
              Why Choose Us?
            </h2>
            <p className="max-w-xl text-left text-slate-300/90 regular-14 lg:regular-16">
              We are a real estate firm with over 20 years of expertise, and our
              main goal is to provide amazing locations to our partners and
              clients. Within the luxury real estate market, our agency offers
              customized solutions.
            </p>
          </div>
          <Button
            type="button"
            title="Cta"
            aria-label="contact us"
            autoFocus
            className="flexCenter gap-x-2 px-6 py-3 regular-16 border border-white rounded-full bg-transparent basic-transition duration-150 hover:text-black hover:scale-105 hover:bg-white"
          >
            Contact Us{" "}
            <span>
              <span className="sr-only">Arrow Right</span>
              <ArrowRight className="size-4" />
            </span>
          </Button>
        </div>
        <article className="size-full gap-4 flexColCenter md:flex-row md:flexBetween">
          {servicesOverviewData.map((item) => {
            const Icon = item.icon;
            return (
              <ChoseUsServiceOverview
                key={item.id}
                title={item.title}
                desc={item.description}
                imgPath={item.imgSrc}
                Icon={Icon}
              />
            );
          })}
        </article>
      </div>
    </section>
  );
};

const MemoChoseUs = memo(ChoseUs);

export default MemoChoseUs;

type ChoseUsServiceOverviewProp = {
  title: string;
  desc: string;
  imgPath: string;
  Icon: LucideIcon;
};

const ChoseUsServiceOverview: React.FC<ChoseUsServiceOverviewProp> = ({
  title,
  desc,
  imgPath,
  Icon,
}) => {
  return (
    <div className="group space-y-4">
      <div className="size-fit flexCenter p-4 lg:p-6 border border-white rounded-full bg-transparent basic-transition group-hover:bg-white">
        <span className="sr-only" title={title}>
          {title}
        </span>
        <Icon
          aria-label="icon"
          className="size-6 text-slate-300/90 transition-transform duration-300 ease-in-out group-hover:rotate-180 group-hover:text-slate-900/80"
        />
      </div>
      <h3 className="text-white regular-18 lg:text-xl font-bold">{title}</h3>
      <p className="max-w-lg regular-14 lg:regular-16 text-left text-slate-300/90">
        {desc}
      </p>
      <div className="relative size-full group">
        <MemoImage
          imgFormat="jpg"
          altText={title}
          imageName={imgPath}
          className="relative size-full max-h-72 max-w-xl md:max-w-3xl rounded-xl mx-auto aspect-auto bg-center object-cover object-center shadow-sm shadow-slate-600 basic-transition group"
        />
        <div className="z-20 absolute left-0 top-0 right-[60%] bottom-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-500 ease-in-out pointer-events-none"></div>
      </div>
    </div>
  );
};
