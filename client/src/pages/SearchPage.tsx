import Layout from "components/Layouts/Layout";
import React from "react";
import Input from "./../components/HTML/Input";
import Button from "./../components/HTML/Button";

const SearchPage: React.FC = () => {
  return (
    <Layout>
      <section className="flex flex-col md:flex-row">
        <aside className="p-6 border-b-2 md:border-r-2 md:min-h-screen">
          <form action="" className="flex flex-col gap-6 md:gap-8 xl:gap-10">
            <div className="flex gap-4 items-center">
              <label
                htmlFor="searchTerm"
                className="whitespace-nowrap font-semibold"
              >
                Search Term:
              </label>
              <Input
                type="text"
                id="searchTerm"
                placeholder="Search..."
                className="w-full p-3 rounded-lg border"
              />
            </div>
            <div className="flex gap-2 flex-wrap items-center">
              <label className="font-semibold">Type:</label>
              <div className="flex gap-2">
                <Input
                  id="all"
                  type="checkbox"
                  className="size-5"
                  // onChange={handleChange}
                  // checked={sidebardata.type === 'all'}
                />
                <span>Rent & Sale</span>
              </div>
              <div className="flex gap-2">
                <Input
                  id="rent"
                  type="checkbox"
                  className="size-5"
                  // onChange={handleChange}
                  // checked={sidebardata.type === 'rent'}
                />
                <span>Rent</span>
              </div>
              <div className="flex gap-2">
                <Input
                  id="sell"
                  type="checkbox"
                  className="size-5"
                  // onChange={handleChange}
                  // checked={sidebardata.type === 'sale'}
                />
                <span>Sell</span>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap items-center">
              <label className="font-semibold">Amenities:</label>
              <div className="flex gap-2">
                <Input
                  id="parking"
                  type="checkbox"
                  className="size-5"
                  // onChange={handleChange}
                  // checked={sidebardata.parking}
                />
                <span>Parking</span>
              </div>
              <div className="flex gap-2">
                <Input
                  id="furnished"
                  type="checkbox"
                  className="size-5"
                  // onChange={handleChange}
                  // checked={sidebardata.furnished}
                />
                <span>Furnished</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <label className="font-semibold">Sort:</label>
              <select
                id="sort_order"
                // onChange={handleChange}
                defaultValue={"created_at_desc"}
                className="border rounded-lg p-3"
              >
                <option value="regularPrice_desc">Price high to low</option>
                <option value="regularPrice_asc">Price low to hight</option>
                <option value="createdAt_desc">Latest</option>
                <option value="createdAt_asc">Oldest</option>
              </select>
            </div>
            <Button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
              Search
            </Button>
          </form>
        </aside>
        <article className="flex-1">
          <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
            Listing results:
          </h1>
        </article>
      </section>
    </Layout>
  );
};

export default SearchPage;
