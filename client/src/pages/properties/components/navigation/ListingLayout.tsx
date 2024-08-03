import React from "react";
import { MdOutlineGridView, MdFormatListBulleted } from "react-icons/md";
import { Button } from "components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "components/ui/tooltip";

type ListingLayoutProps = {
  layout: string;
  changeLayoutAppearance: (newLayout: string) => void;
};

const ListingLayout: React.FC<ListingLayoutProps> = ({
  layout,
  changeLayoutAppearance,
}) => {
  return (
    <ul className="w-fit max-w-16 xl:max-w-24 gap-x-1 flex items-center justify-center text-[#1A3760] px-2 pt-2 pb-1 rounded-md bg-white border border-slate-500">
      <li>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                onClick={() => changeLayoutAppearance("grid")}
                className={`${
                  layout === "grid"
                    ? "text-white bg-black hover:shadow-sm hover:scale-105"
                    : "hover:text-slate-500/90 hover:scale-105 hover:rotate-2"
                } p-2 transition-all duration-150 ease-in-out`}
              >
                <span className="sr-only">Grid Icon</span>
                <MdOutlineGridView
                  title="Grid icon"
                  aria-label="grid icon"
                  className="size-4 xl:size-5 2xl:size-6 aspect-square object-contain"
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Grid</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </li>
      <li>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                onClick={() => changeLayoutAppearance("list")}
                className={`${
                  layout === "list"
                    ? "text-white bg-black hover:shadow-sm hover:scale-105"
                    : "hover:text-slate-500/90 hover:scale-105 hover:rotate-2"
                } p-2 transition-all duration-150 ease-in-out`}
              >
                <span className="sr-only">List Icon</span>
                <MdFormatListBulleted
                  title="list icon"
                  aria-label="list icon"
                  className="size-4 xl:size-5 2xl:size-6 aspect-square object-contain"
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>List</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </li>
    </ul>
  );
};

export default ListingLayout;
