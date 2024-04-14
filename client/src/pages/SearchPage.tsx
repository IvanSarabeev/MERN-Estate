import React, { useState, useEffect } from "react";
import Layout from "components/Layouts/Layout";
import Input from "components/HTML/Input";
import Button from "components/HTML/Button";
import { CreateListingIntf, SearchDataIntf } from "types/listing";
import { useNavigate } from "react-router-dom";
import Loader from "components/Loader";
import ListingCard from "components/Listings/ListingCard";

const SearchPage: React.FC = () => {
  const [searchData, setSearchData] = useState<SearchDataIntf>({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    sort: "created_at",
    order: "desc",
  });
  const [listing, setListing] = useState<CreateListingIntf[]>([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  console.log(searchData);

  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl !== null ||
      typeFromUrl !== null ||
      parkingFromUrl !== null ||
      furnishedFromUrl !== null ||
      offerFromUrl !== null ||
      sortFromUrl !== null ||
      orderFromUrl !== null
    ) {
      setSearchData({
        searchTerm: searchTermFromUrl || "",
        type: (typeFromUrl as "all" | "rent" | "sell") || "all",
        parking: parkingFromUrl === "true",
        furnished: furnishedFromUrl === "true",
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListing(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value, type } = e.target;

    if (id === "all" || id === "rent" || id === "sell") {
      setSearchData((prevData) => ({ ...prevData, type: id }));
    }

    if (id === "searchTerm") {
      setSearchData((prevData) => ({ ...prevData, searchTerm: value }));
    }

    if (type === "checkbox" && (id === "parking" || id === "furnished")) {
      const inputElement = e.target as HTMLInputElement;
      // Narrow down the type of e.target to HTMLInputElement

      setSearchData((prevData) => ({
        ...prevData,
        [id]: inputElement.checked,
      }));
    }

    if (id === "sort_order") {
      const [sort, order] = value.split("_");
      setSearchData((prevData) => ({
        ...prevData,
        sort: sort || "created_at",
        order: order || "desc",
      }));
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const urlParams = new URLSearchParams();

    urlParams.set("searchTerm", searchData.searchTerm);
    urlParams.set("type", searchData.type);
    urlParams.set("parking", String(searchData.parking));
    urlParams.set("furnished", String(searchData.furnished));
    urlParams.set("sort", searchData.sort);
    urlParams.set("order", searchData.order);

    const searchQuery = urlParams.toString();

    navigate(`/search/${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listing.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex?.toString());
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();

    if (data.length < 9) {
      setShowMore(false);
    }

    setListing([...listing, ...data]);
  };

  return (
    <Layout>
      <section className="flex flex-col md:flex-row">
        <aside className="p-6 border-b-2 md:border-r-2 md:min-h-screen">
          <form
            action=""
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 md:gap-8 xl:gap-10"
          >
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
                  onChange={handleChange}
                  checked={searchData.type === "all"}
                />
                <span>Rent & Sale</span>
              </div>
              <div className="flex gap-2">
                <Input
                  id="rent"
                  type="checkbox"
                  className="size-5"
                  onChange={handleChange}
                  checked={searchData.type === "rent"}
                />
                <span>Rent</span>
              </div>
              <div className="flex gap-2">
                <Input
                  id="sell"
                  type="checkbox"
                  className="size-5"
                  onChange={handleChange}
                  checked={searchData.type === "sell"}
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
                  onChange={handleChange}
                  checked={searchData.parking}
                />
                <span>Parking</span>
              </div>
              <div className="flex gap-2">
                <Input
                  id="furnished"
                  type="checkbox"
                  className="size-5"
                  onChange={handleChange}
                  checked={searchData.furnished}
                />
                <span>Furnished</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <label className="font-semibold">Sort:</label>
              <select
                id="sort_order"
                onChange={handleChange}
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
          <div className="p-7 flex flex-wrap gap-4">
            {!loading && listing.length === 0 && (
              <p className="text-xl text-slate-700">No listing found!</p>
            )}

            {loading && <Loader />}
            {!loading &&
              listing.map((item, index) => {
                return <ListingCard key={index} item={item} />;
              })}
            {showMore && (
              <Button
                type="button"
                onClick={onShowMoreClick}
                className="text-green-700 hover:underline p-7 text-center w-full"
              >
                Show more
              </Button>
            )}
          </div>
        </article>
      </section>
    </Layout>
  );
};

export default SearchPage;
