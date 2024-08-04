import {
  Bath,
  BedDouble,
  BookOpenCheck,
  BookX,
  Building,
  MonitorPlay,
  ParkingCircle,
  Ruler,
  StickyNote,
  Tag,
  Wifi,
} from "lucide-react";
import React, { memo } from "react";
import { SingleListingResponse } from "types/listing";

type PropertyOverviewProps = {
  data: SingleListingResponse | null;
};

const PropertyOverview: React.FC<PropertyOverviewProps> = ({ data }) => {
  return (
    <div className="w-full md:w-3/5 h-fit gap-y-2.5 md:gap-y-4 lg:gap-y-6 gap-x-4 md:gap-x-6 lg:gap-x-8 xl:gap-x-10 flex flex-wrap items-baseline flex-shrink-0 justify-between rounded-md shadow-md px-10 py-8 shadow-slate-100 bg-slate-900">
      <div className="flexCenter gap-x-2">
        <span className="p-2 rounded-md border border-slate-300">
          <span className="sr-only">Property Code</span>
          <Tag className="size-4 lg:size-6 text-white rotate-90" />
        </span>
        <div className="flexColStart text-left whitespace-normal">
          <p className="regular-14 xl:regular-16 text-white l">ID NO.</p>
          <p className="regular-14 xl:regular-16 text-slate-300/90">
            #{data?._id.slice(0, 4)}
          </p>
        </div>
      </div>
      <div className="flexCenter gap-x-2">
        <span className="p-2 rounded-md border border-slate-300">
          <span className="sr-only">Building Icon</span>
          <Building className="size-4 lg:size-6 text-white" />
        </span>
        <div className="flexColStart text-left whitespace-normal">
          <p className="regular-14 xl:regular-16 text-white">Type</p>
          <p className="regular-14 xl:regular-16 text-slate-300/90">
            {data?.type === "rent" ? "Residencial" : "House"}
          </p>
        </div>
      </div>
      <div className="flexCenter gap-x-2">
        <span className="p-2 rounded-md border border-slate-300">
          <span className="sr-only">Room Icon</span>
          <MonitorPlay className="size-4 lg:size-6 text-white" />
        </span>
        <div className="flexColStart text-left whitespace-normal">
          <p className="regular-14 xl:regular-16 text-white">Room</p>
          <p className="regular-14 xl:regular-16 text-slate-300/90">
            {data?.rooms}
          </p>
        </div>
      </div>
      <div className="flexCenter gap-x-2">
        <span className="p-2 rounded-md border border-slate-300">
          <span className="sr-only">Bed Icon</span>
          <BedDouble className="size-4 lg:size-6 text-white" />
        </span>
        <div className="flexColStart text-left whitespace-normal">
          <p className="regular-14 xl:regular-16 text-white">Bedroom</p>
          <p className="regular-14 xl:regular-16 text-slate-300/90">
            {data?.bedroom}
          </p>
        </div>
      </div>
      <div className="flexCenter gap-x-2">
        <span className="p-2 rounded-md border border-slate-300">
          <span className="sr-only">Bath Icon</span>
          <Bath className="size-4 lg:size-6 text-white" />
        </span>
        <div className="flexColStart text-left whitespace-normal">
          <p className="regular-14 xl:regular-16 text-white">Bath</p>
          <p className="regular-14 xl:regular-16 text-slate-300/90">
            {data?.bathroom}
          </p>
        </div>
      </div>

      {/* Second */}
      <div className="flexCenter gap-x-2">
        <span className="p-2 rounded-md border border-slate-300">
          <span className="sr-only">Note Icon</span>
          <StickyNote className="size-4 lg:size-6 text-white" />
        </span>
        <div className="flexColStart text-left whitespace-normal">
          <p className="regular-14 xl:regular-16 text-white">Purpose</p>
          <p className="regular-14 xl:regular-16 text-slate-300/90">
            For {data?.type}
          </p>
        </div>
      </div>
      <div className="flexCenter gap-x-2">
        <span className="p-2 rounded-md border border-slate-300">
          <span className="sr-only">Length Icon</span>
          <Ruler className="size-4 lg:size-6 text-white" />
        </span>
        <div className="flexColStart text-left whitespace-normal">
          <p className="regular-14 xl:regular-16 text-white">Purpose</p>
          <p className="regular-14 xl:regular-16 text-slate-300/90">
            For {data?.yearBuild}
          </p>
        </div>
      </div>
      <div className="flexCenter gap-x-2">
        <span className="p-2 rounded-md border border-slate-300">
          <span className="sr-only">Parking Icon</span>
          <ParkingCircle className="size-4 lg:size-6 text-white" />
        </span>
        <div className="flexColStart text-left whitespace-normal">
          <p className="regular-14 xl:regular-16 text-white">Parking</p>
          <p className="regular-14 xl:regular-16 text-slate-300/90">
            {data?.parking ? "Yes" : "No"}
          </p>
        </div>
      </div>
      <div className="flexCenter gap-x-2">
        <span className="p-2 rounded-md border border-slate-300">
          <span className="sr-only">Available Icon</span>
          {data?.offer ? (
            <BookOpenCheck className="size-4 lg:size-6 text-white" />
          ) : (
            <BookX className="size-4 lg:size-6 text-white" />
          )}
        </span>
        <div className="flexColStart text-left whitespace-normal">
          <p className="regular-14 xl:regular-16 text-white">Valid</p>
          <p className="regular-14 xl:regular-16 text-slate-300/90">
            {data?.offer ? "Yes" : "No"}
          </p>
        </div>
      </div>
      <div className="flexCenter gap-x-2">
        <span className="p-2 rounded-md border border-slate-300">
          <span className="sr-only">Wifi Icon</span>
          <Wifi className="size-4 lg:size-6 text-white" />
        </span>
        <div className="flexColStart text-left whitespace-normal">
          <p className="regular-14 xl:regular-16 text-white">Wifi</p>
          <p className="regular-14 xl:regular-16 text-slate-300/90">Yes</p>
        </div>
      </div>
    </div>
  );
};

const MemoPropertyOverview = memo(PropertyOverview);

export default MemoPropertyOverview;
