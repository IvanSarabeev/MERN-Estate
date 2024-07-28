import React, { memo, useEffect, useState } from "react";
import Layout from "components/Layouts/Layout";
import SideMenu from "./components/navigation/SideMenu";
import PropertyListings from "./components/listings/PropertyListings";
import ListingLayout from "./components/navigation/ListingLayout";

const PropertyDashboard: React.FC = () => {
  const [layout, setLayout] = useState<string>(() => {
    return localStorage.getItem("layout") ?? "grid";
  });
  // const [currentPage, setCurrentPage] = useState<number>(1);

  const changeLayoutAppearance = (newLayout: string) => {
    setLayout(newLayout);
  };

  useEffect(() => {
    localStorage.setItem("layout", layout);
  }, [layout]);

  return (
    <Layout>
      <section className="flex">
        <MemoizeSideMenu />
        <div className="flex flex-col padding-container max-container">
          <nav className="w-full hidden lg:flexEnd py-6">
            {/* TODO: Continue The Listing Layout Implementation */}
            <ListingLayout
              layout={layout}
              changeLayoutAppearance={changeLayoutAppearance}
            />
          </nav>
          <div className="gap-x-4 gap-y-12 md:gap-y-6 xl:gap-y-8 xl:gap-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-center justify-center">
            <PropertyListings />
          </div>
          {/* TODO: Implement Pagination */}
        </div>
      </section>
    </Layout>
  );
};

const MemoizeSideMenu = memo(SideMenu);

export default PropertyDashboard;
