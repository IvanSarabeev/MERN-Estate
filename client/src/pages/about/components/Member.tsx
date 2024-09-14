import React, { memo } from "react";
import MemoImage from "components/Image";
import { Link } from "react-router-dom";
import { PhoneCall } from "lucide-react";

type MemberProps = {
  data: {
    id: number;
    format: string;
    imgSrc: string;
    imgAlt: string;
    name: string;
    jobDesc: string;
    phone: string;
  };
};

const Member: React.FC<MemberProps> = ({ data }) => {
  return (
    <div className="size-full xl:max-w-96 flex flex-col flex-1 rounded-xl shadow-sm shadow-slate-300">
      <MemoImage
        imgFormat={data.format}
        imageName={data.imgSrc}
        altText={data.imgAlt}
        className="w-fit xl:h-[448px] max-h-[448px] rounded-t-xl object-cover object-center bg-center aspect-auto"
      />
      <div className="size-full flexBetween p-2 md:p-4 bg-slate-300 rounded-b-xl">
        <div className="flexColStart space-y-1">
          <p className="regular-16 lg:text-lg font-semibold text-slate-900/90">
            {data.name}
          </p>
          <p className="regular-12 lg:regular-14 text-slate-900/80">
            {data.jobDesc}
          </p>
        </div>
        <Link
          to={`tel:${data.phone}`}
          className="flexCenter p-2.5 border-none outline-none ring-0 rounded-full bg-slate-900/90 basic-transition hover:scale-105"
        >
          <span>
            <span className="sr-only">Phone Icon</span>
            <PhoneCall className="size-4" />
          </span>
        </Link>
      </div>
    </div>
  );
};

const MemoMember = memo(Member);

export default MemoMember;
