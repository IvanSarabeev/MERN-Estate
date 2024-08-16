import React, { memo } from "react";
import { SingleListingKeys, SingleListingResponse } from "types/listing";
import { propertyOverview } from "components/constants";
import { cn } from "lib/utils";

type PropertyOverviewProps = {
  data: SingleListingResponse | null;
};

const isSingleListingResponse = (
  data: SingleListingResponse | null
): data is SingleListingResponse => {
  return data !== null;
};

const getPropertyValue = (
  key: SingleListingKeys | null,
  data: SingleListingResponse,
  label: string
): string | string[] | number | boolean | undefined => {
  if (!key) {
    return label === "Wifi" ? "Yes" : undefined;
  }

  switch (key) {
    case "_id":
      return data._id.slice(0, 4);
    case "type":
      return data.type === "rent" ? "Residential" : "House";
    case "parking":
    case "offer":
      return data[key] ? "Yes" : "No";
    default:
      return data[key];
  }
};

const PropertyOverview: React.FC<PropertyOverviewProps> = ({ data }) => {
  if (!isSingleListingResponse(data)) {
    return null;
  }

  return (
    <div className="size-full space-y-4 xl:space-y-6 flexColStart">
      <h4 className="bold-20 md:bold-24 xl:text-3xl xl:font-bold capitalize whitespace-normal">
        Property Overview
      </h4>
      <aside className="w-full h-fit gap-y-2.5 md:gap-y-4 lg:gap-y-6 gap-x-4 md:gap-x-6 lg:gap-x-8 xl:gap-x-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 rounded-md shadow-md px-10 py-8 shadow-slate-100 bg-slate-900/90">
        {propertyOverview.map((property) => {
          const Icon = property.icon;
          const value = getPropertyValue(property.key, data, property.label);

          return (
            <div key={property.id} className="size-fit flexCenter gap-x-2">
              <span className="p-2 rounded-md border border-slate-300">
                <span className="sr-only">{property.label}</span>
                <Icon className="size-4 lg:size-6 text-white whitespace-normal" />
              </span>
              <div className="flexColStart text-left whitespace-normal">
                <p
                  className={cn(
                    "regular-14 xl:regular-16 text-white",
                    "font-bold"
                  )}
                >
                  {property.label}
                </p>
                <p className="regular-14 xl:regular-16 text-slate-300/90">
                  {value}
                </p>
              </div>
            </div>
          );
        })}
      </aside>
    </div>
  );
};

const MemoPropertyOverview = memo(PropertyOverview);

export default MemoPropertyOverview;
