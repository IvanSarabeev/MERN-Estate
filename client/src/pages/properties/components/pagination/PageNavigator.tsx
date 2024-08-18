import React, { memo } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "components/ui/pagination";
import listingStore from "stores/listingStore";
import { cn } from "lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/select";

type PageNavigatorProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const PageNavigator: React.FC<PageNavigatorProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const total = listingStore.getTotalPagesResults();
  const pageLimit = listingStore.getPageLimit();

  return (
    <Pagination className="flex items-center justify-between px-0 md:px-6 2xl:p-8 py-2 md:py-4 lg:py-6 xl:py-8">
      {currentPage !== 0 ? (
        <p className="regular-14 2xl:regular-16 font-normal">
          Results 1 of {pageLimit} from{" "}
          <strong className="font-medium">{total}</strong>
        </p>
      ) : (
        <p className="regular-14 2xl:regular-16 font-normal">Empty</p>
      )}
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => handlePageChange(currentPage - 1)}
            aria-disabled={currentPage === 1}
          />
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              href="#"
              onClick={() => handlePageChange(index + 1)}
              isActive={currentPage === index + 1}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() => handlePageChange(currentPage + 1)}
            aria-disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
      {/* Migrate the PropertyListings into the store */}
      {currentPage !== 0 && (
        <div className="size-fit flexCenter gap-x-1.5 regular-16">
          <p className="size-full">Results per page:</p>
          <Select>
            <SelectTrigger
              className={cn(
                "gap-x-1 text-blue-600 px-4 py-2 rounded-full border border-slate-300 bg-white",
                "font-semibold size-fit focus:ring-blue-600"
              )}
            >
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="text-blue-600">
                <SelectItem value="total pages: 16">16</SelectItem>
                <SelectItem value="total pages: 20">20</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}
    </Pagination>
  );
};

const MemoPageNavigator = memo(PageNavigator);

export default MemoPageNavigator;
