import React from "react";
import Button from "components/HTML/Button";
import Logo from "assets/images/estate-logo.png";
import { ExternalLink } from "lucide-react";

const InfoBox: React.FC = () => {
  return (
    <aside className="p-6 md:p-7 xl:p-8 rounded-md bg-contact-info bg-no-repeat bg-center">
      <div className="px-8 xl:px-6 py-4 xl:py-8 space-y-4 text-white text-center rounded-md bg-slate-400/60 backdrop-blur-sm">
        <h4 className="bold-20 xl:bold-24">
          Need Help? We Are Here To Help You
        </h4>
        <img
          src={Logo}
          alt="logo"
          loading="lazy"
          decoding="async"
          className="size-3/5 xl:size-44 mx-auto my-0"
        />
        <p className="regular-18 lg:bold-20">
          You Get Online support{" "}
          <span className="block regular-16 lg:regular-18">
            +256 214 203 215
          </span>
        </p>
        <Button
          title="Read more"
          aria-label="Read more"
          className="flexCenter gap-x-1 px-4 lg:px-6 py-3 regular-16 border lg:border-2 border-white rounded-full mx-auto bg-transparent basic-transition hover:bg-white hover:text-black"
        >
          Read More
          <span>
            <p className="sr-only">External Link</p>
            <ExternalLink className="size-4" />
          </span>
        </Button>
      </div>
    </aside>
  );
};

export default InfoBox;
