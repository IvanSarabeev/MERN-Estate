import { FunctionComponent } from "react";
import { GridItemInterface } from "types/grid";
import { Link } from "react-router-dom";
import { TbArrowForwardUp } from "react-icons/tb";
import { Badge } from "components/ui/badge";
import { socialItem } from "components/constants";

type GridItemProps = {
  item: GridItemInterface;
  index: number;
};

const GridItem: FunctionComponent<GridItemProps> = ({ item, index }) => {
  return (
    <>
      <div key={index} className={item.style}>
        <div className="relative w-full">
          <img
            src={item.imageSrc}
            className={`${item.imageStyle}`}
            alt={item.imageSrc}
            decoding="async"
            loading="lazy"
            aria-label="image-container"
            title={item.title}
          />
          {index === 3 && (
            <Link
              to={"/listing/66239855187932cf47c1d680"}
              className="rounded-full outline-none focus:ring focus:ring-black"
            >
              <span className="sr-only">Badge</span>
              <Badge className="absolute top-[3.5%] right-[1.5%] p-2 rounded-full regular-16 shadow-md bg-slate-400">
                <TbArrowForwardUp className="size-5" />
              </Badge>
            </Link>
          )}
        </div>
        <article className={item.article}>
          <h4
            aria-label={item.title}
            className={`font-sans text-slate-700/90
          ${
            index === 0
              ? "text-slate-800 bold-20 md:bold-24 xl:text-3xl font-bold"
              : "regular-18 lg:bold-20 2xl:bold-24 font-semibold"
          }`}
          >
            {item.title}
          </h4>
          <p
            aria-label="paragraph"
            className={`font-serif regular-14 lg:regular-16 2xl:regular-18 font-medium leading-4 xl:leading-5 2xl:leading-6 text-center xl:text-justify mt-2 ${
              index === 0 ? "text-slate-700/85" : "text-slate-700"
            }`}
          >
            {item.text}
          </p>
          {index === 0 && <SocialItem />}
        </article>
      </div>
    </>
  );
};

export default GridItem;

const SocialItem = () => {
  return (
    <div className="hidden md:inline-flex size-fit absolute -bottom-24 gap-8 flex-nowrap items-center justify-between py-3 px-12 inset-x-[0%] xl:inset-x-[6%] bg-transparent">
      {socialItem.map((item) => {
        const SocialIcon = item.icon;
        return (
          <Link
            key={item.id}
            to={item.href}
            target="_blank"
            className="outline-none focus:rounded-md focus:ring focus:ring-gray-600/90"
          >
            <div className="group p-2.5 rounded-md border-2 border-gray-800 hover:rounded-xl hover:scale-105 hover:shadow-2xl transition-all ease-in-out duration-150">
              <span className="sr-only">{item.label}</span>
              <SocialIcon
                className={`size-10 ${item.iconBg} group-hover:shadow`}
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
};
