import React, { memo } from "react";
import { AvailableProperties } from "types/listing";
import { CiStar } from "react-icons/ci";
import { Button } from "components/ui/button";
import MemoizeListingDetails from "../listings/ListingDetails";
import { Link } from "react-router-dom";

type ListPropertiesProps = {
  data: AvailableProperties;
  index: number;
  layout: string;
};

const ListProperties: React.FC<ListPropertiesProps> = ({
  data,
  index,
  layout,
}) => {
  return (
    <div className="w-full h-fit min-h-96 flex flex-col lg:flex-row lg:even:flex-row-reverse justify-center space-y-4 lg:space-y-0 px-0 md:px-6 py-8 2xl:p-8 border-t border-slate-300">
      <div className="flex flex-col lg:flex-row">
        <aside className="h-full w-fit block pr-0 pl-2 pb-2 lg:pr-4 xl:pr-5 2xl:pr-6">
          <div className="size-12 xl:size-14 flexCenter border border-slate-500 rounded-full bg-transparent">
            <h2 className="regular-18 xl:bold-20">0{index + 1}</h2>
          </div>
        </aside>
        <article className="flexColStart space-y-4 pl-4 xl:odd:pr-6 xl:even:pl-6 odd:border-r even:border-l border-t pt-2 md:border-t-0 md:pt-0 border-slate-300">
          <p className="regular-14 xl:regular-16 text-slate-400 capitalize">
            {data.type === "rent" ? "Apartament" : "House"}
          </p>
          <h2 className="bold-20 2xl:bold-24">{data.name}</h2>
          <p className="max-w-lg text-balance regular-14 md:regular-16 text-slate-500 whitespace-nowrap">
            Rapaciously myocardinate cross-platform intellectual capital model.
            Appropriately create interactive infrastructures
          </p>
          <div className="flexColStart gap-y-4 items-start md:flex-row md:flexBetween">
            <h3 className="bold-20 2xl:bold-24 whitespace-normal">
              ${data.regularPrice?.toFixed(2)}
            </h3>
            <div className="gap-x-4 inline-flex items-center justify-end">
              <span className="group inline-flex gap-x-1 py-1 pl-1 pr-2 rounded-md border border-slate-600/30 shadow-sm bg-transparent transition-all ease-in-out duration-150 hover:scale-105 hover:shadow-md">
                <CiStar
                  title="Star icon"
                  aria-label="star icon"
                  className="size aspect-auto object-contain hover:fill-slate-800"
                />
                <p className="regular-12 xl:regular-14 text-slate-600">4.9</p>
              </span>
              <p className="regular-12 xl:regular-14 text-slate-600">
                <strong className="mr-0.5 text-slate-900">10</strong>Review
              </p>
            </div>
          </div>
          <div className="size-full flexBetween">
            <MemoizeListingDetails data={data} layout={layout} />
          </div>
          <div className="w-full h-fit gap-y-4 flexBetween items-center border-t border-slate-300">
            <div className="group flex items-center justify-start space-x-1 md:space-x-2 xl:space-x-3 p-2 md:p-4">
              <img
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                alt="avatar"
                loading="lazy"
                decoding="async"
                className="size-8 xl:size-10 rounded-full shadow-md aspect-auto object-cover object-center hover:border-2 hover:border-white hover:shadow-md hover:scale-110"
              />
              <div className="flexColStart text-left whitespace-normal">
                <h4 className="text-xs xl:text-sm font-bold">Jennifer Bloom</h4>
                <p className="regular-12 xl:regular-14 text-slate-600 mt-2">
                  +44 235 123 312
                </p>
              </div>
            </div>
            <Link to={`/listing/${data._id}`}>
              <Button variant="outline">Details &rarr;</Button>
            </Link>
          </div>
        </article>
      </div>
      <div className="w-full xl:w-auto flex p-3 mx-2">
        <img
          src={data.imageUrls[0]}
          alt={data.name}
          className="h-80 xl:max-h-80 min-w-80 xl:min-w-96 rounded-2xl shadow-md mx-auto xl:mx-0 aspect-auto object-cover object-center transition-shadow duration-150 hover:shadow-lg"
        />
      </div>
    </div>
  );
};

const MemoListProperties = memo(ListProperties);

export default MemoListProperties;
