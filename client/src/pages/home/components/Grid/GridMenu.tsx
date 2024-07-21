import React from "react";
import GridItem from "./GridItem";
import { gridItemInfo } from "components/constants";

const GridMenu: React.FC = () => {
  return (
    <div className="max-w-screen-xl gap-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 p-2 mx-auto">
      {gridItemInfo.map((item, index) => {
        return <GridItem key={item.id} item={item} index={index} />;
      })}
    </div>
  );
};

export default GridMenu;
