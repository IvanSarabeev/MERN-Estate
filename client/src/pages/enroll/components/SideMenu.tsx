import React, { memo } from "react";
import MemoImage from "components/Image";

const SideMenu: React.FC = () => {
  return (
    <aside className="hidden lg:block w-full h-screen max-w-md bg-primary">
      <div className="container padding-container text-white">
        <span className="inline-flex items-center gap-x-2">
          <MemoImage
            imgFormat="png"
            imageName="logos/flowbite-logo"
            altText="logo"
            className="size-8 max-w-8 object-cover object-center aspect-auto"
          />
          <h2 className="bold-24 whitespace-normal">Flowbite</h2>
        </span>
      </div>
    </aside>
  );
};

const MemoSideMenu = memo(SideMenu);

export default MemoSideMenu;
