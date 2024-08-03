import React, { memo, useEffect, useState } from "react";
import Layout from "components/Layouts/Layout";
import SideMenu from "./components/navigation/SideMenu";
import PropertyListings from "./components/listings/PropertyListings";
import MemoListingLayout from "./components/navigation/ListingLayout";
import MemoSortingMenu from "./components/navigation/SortingMenu";
import MemoPageNavigator from "./components/pagination/PageNavigator";

const PropertyDashboard: React.FC = () => {
  const [layout, setLayout] = useState<string>(() => {
    return localStorage.getItem("layout") ?? "grid";
  });

  const [sortOption, setSortOption] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const changeLayoutAppearance = (newLayout: string) => {
    setLayout(newLayout);
  };

  const handleSortingOption = (newSortOption: string) => {
    if (newSortOption === "clear") {
      setSortOption("");
    } else {
      setSortOption(newSortOption);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getTotalPages = (totalItems: number) => {
    setTotalPages(totalItems);
  };

  useEffect(() => {
    localStorage.setItem("layout", layout);
  }, [layout]);

  return (
    <Layout>
      <section className="flex">
        <MemoSideMenu />
        <div className="flex flex-col padding-container max-container">
          <div className="w-full hidden md:flexBetween">
            <MemoSortingMenu handleSortingOption={handleSortingOption} />
            <nav className="lg:flexEnd py-6">
              <MemoListingLayout
                layout={layout}
                changeLayoutAppearance={changeLayoutAppearance}
              />
            </nav>
          </div>
          <div
            aria-label="Properties container"
            className={layout === "grid" ? "grid-container" : "list-container"}
          >
            <PropertyListings
              systemLayout={layout}
              sortOption={sortOption}
              currentPage={currentPage}
              getTotalPages={getTotalPages}
            />
          </div>
          <MemoPageNavigator
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </section>
    </Layout>
  );
};

const MemoSideMenu = memo(SideMenu);

export default PropertyDashboard;
