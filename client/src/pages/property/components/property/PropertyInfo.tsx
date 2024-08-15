import React, { memo } from "react";
import { SingleListingResponse } from "types/listing";
import Button from "components/HTML/Button";
import { CalendarDays } from "lucide-react";
import { FaRegComments } from "react-icons/fa";

type PropertyInfoProps = {
  data: SingleListingResponse | null;
};

const PropertyInfo: React.FC<PropertyInfoProps> = ({ data }) => {
  return (
    <section className="flexColStart space-y-4 xl:space-y-6 text-left">
      <div className="size-fit space-x-1 space-y-2 md:space-y-0 md:space-x-2 md:inline-flex md:items-center justify-start">
        <Button
          title="Feature"
          aria-label="feature"
          className="regular-16 xl:regular-18 px-5 py-1.5 text-white rounded-full bg-slate-900"
        >
          Featured
        </Button>
        <div className="flexCenter space-x-2">
          <div className="flexCenter gap-x-1">
            <span>
              <span className="sr-only">Calendar Icon</span>
              <CalendarDays className="size-6" />
            </span>
            <p className="regular-14 2xl:regular-16 text-slate-600/90">
              {data?.name}
            </p>
          </div>
          <div className="flexCenter gap-x-1">
            <span>
              <span className="sr-only">Comments Icon</span>
              <FaRegComments className="size-6" />
            </span>
            <p className="regular-14 xl:regular-16 text-slate-600/90">
              32 Comments
            </p>
          </div>
        </div>
      </div>
      <h2 className="bold-20 md:bold-24 xl:text-3xl xl:font-bold capitalize whitespace-normal">
        About This Property
      </h2>
      <p className="regular-16 xl:regular-16 max-w-4xl text-balance text-slate-700 whitespace-normal">
        {data?.description}
      </p>
    </section>
  );
};

const MemoPropertyInfo = memo(PropertyInfo);

export default MemoPropertyInfo;
