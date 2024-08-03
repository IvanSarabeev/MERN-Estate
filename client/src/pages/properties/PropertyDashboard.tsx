import React, { memo, useEffect, useState } from "react";
import Layout from "components/Layouts/Layout";
import SideMenu from "./components/navigation/SideMenu";
import PropertyListings from "./components/listings/PropertyListings";
import ListingLayout from "./components/navigation/ListingLayout";
import MemoSortingMenu from "./components/navigation/SortingMenu";

const PropertyDashboard: React.FC = () => {
  const [layout, setLayout] = useState<string>(() => {
    return localStorage.getItem("layout") ?? "grid";
  });

  const changeLayoutAppearance = (newLayout: string) => {
    setLayout(newLayout);
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
            <MemoSortingMenu />
            <nav className="lg:flexEnd py-6">
              <ListingLayout
                layout={layout}
                changeLayoutAppearance={changeLayoutAppearance}
              />
            </nav>
          </div>
          <div
            aria-label="Properties container"
            className={layout === "grid" ? "grid-container" : "list-container"}
          >
            <PropertyListings systemLayout={layout} />
          </div>
          {/* TODO: Implement Pagination */}
        </div>
      </section>
    </Layout>
  );
};

const MemoSideMenu = memo(SideMenu);

export default PropertyDashboard;
