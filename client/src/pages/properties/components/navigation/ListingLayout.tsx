import React from "react";
import { MdOutlineGridView, MdFormatListBulleted } from "react-icons/md";
import Button from "components/HTML/Button";

type ListingLayoutProps = {
  layout: string;
  changeLayoutAppearance: (newLayout: string) => void;
};

const ListingLayout: React.FC<ListingLayoutProps> = ({
  layout,
  changeLayoutAppearance,
}) => {
  return (
    <ul className="w-fit gap-x-2 flex items-center justify-center text-[#1A3760] px-4 py-2 rounded-md bg-white border border-slate-500">
      <li>
        <Button
          onClick={() => changeLayoutAppearance("grid")}
          className={`filter-btn ${layout === "grid" ? "bg-light-coral" : ""}`}
        >
          <span className="sr-only">Grid Icon</span>
          <MdOutlineGridView
            title="Grid icon"
            aria-label="grid icon"
            className="size-5 aspect-square"
          />
        </Button>
      </li>
      <li>
        <Button
          onClick={() => changeLayoutAppearance("list")}
          className={`filter-btn ${layout === "list" ? "bg-light-coral" : ""}`}
        >
          <span className="sr-only">List Icon</span>
          <MdFormatListBulleted
            title="list icon"
            aria-label="list icon"
            className="size-5 aspect-square"
          />
        </Button>
      </li>
    </ul>
  );
};

export default ListingLayout;
