import React, { useState, useCallback } from "react";
import Input from "components/HTML/Input";
import Button from "components/HTML/Button";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SearchHeader: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const navigate = useNavigate();

  const handleInputSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);

    urlParams.set("searchTerm", searchTerm);

    const searchQuery = urlParams.toString();

    navigate(`/search?${searchQuery}`);
  };

  useCallback(() => {
    const urlParam = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParam.get("searchTerm");

    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, []);

  return (
    <div className="hidden md:block">
      <div
        className="inline-flex flex-nowrap items-center shadow-md ml-4"
        role="group"
      >
        <Button
          type="button"
          title="Rent"
          aria-label="Buy Input"
          className="text-gray-900 regular-18 font-medium px-8 py-2.5 rounded-bl-lg rounded-tl-lg border border-gray-200 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
        >
          Buy
        </Button>
        <Button
          type="button"
          title="Rent"
          aria-label="Rent Input"
          className="text-gray-900 regular-18 font-medium px-8 py-2.5 border border-gray-200 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
        >
          Rent
        </Button>
        <Button
          type="button"
          title="Sales"
          aria-label="Sell Input"
          className="text-gray-900 regular-18 font-medium px-8 py-2.5 rounded-br-lg rounded-tr-lg border border-gray-200 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
        >
          Sell
        </Button>
      </div>
      <form
        action=""
        method="get"
        onSubmit={handleSubmit}
        className="hidden gap-8 md:flex items-center p-4 px-6 rounded-xl shadow-xl bg-white"
      >
        <div className="flex flex-col items-start justify-start flex-nowrap md:flex-wrap">
          <label
            htmlFor="search-for-location"
            className="block regular-16 font-sans font-medium regular-16 xl:regular-18 mb-1 ml-1"
          >
            Location
          </label>
          <div className="relative">
            <Input
              type="text"
              id="search-for-location"
              aria-label="Search location"
              placeholder="Search location"
              value={searchTerm}
              onChange={handleInputSearch}
              className="w-full min-w-96 max-w-xl regular-14  py-2.5 px-4 rounded-md border-b border-slate-400 bg-transparent focus:outline-none"
            />
            <FaSearch className="absolute end-4 inset-y-1/3 text-slate-500 pointer-events-none" />
          </div>
        </div>
        <div className="flex flex-col items-start justify-start flex-nowrap md:flex-wrap">
          <label
            htmlFor="type-meters"
            className="block regular-16 font-sans font-medium regular-16 xl:regular-18 mb-1 ml-1"
          >
            Type
          </label>
          <div className="relative">
            <Input
              type="text"
              id="type-meters"
              aria-label="Type meters"
              placeholder="15 x 9 Meters"
              value={searchTerm}
              onChange={handleInputSearch}
              className="w-full min-w-26 max-w-xl regular-14  py-2.5 px-4 rounded-md border-b border-slate-400 bg-transparent focus:outline-none"
            />
          </div>
        </div>
        <div className="flex flex-col items-start justify-start flex-nowrap md:flex-wrap">
          <label
            htmlFor="price-range"
            className="block font-sans font-medium regular-16 xl:regular-18 mb-1 ml-1"
          >
            Price range
          </label>
          <div className="relative">
            <Input
              type="number"
              id="price-range"
              aria-label="Price Input"
              placeholder="$410 - $1100"
              value={searchTerm}
              onChange={handleInputSearch}
              className="w-full min-w-26 max-w-xl font-semibold regular-14 py-2.5 px-4 rounded-md border-b border-slate-400 bg-transparent focus:outline-none"
            />
          </div>
        </div>
        {/* !TODO: Add more seach features! */}
        <Button
          type="submit"
          title="Submit Search"
          aria-label="submit-button"
          className="btn-search"
        >
          Search
        </Button>
      </form>
    </div>
  );
};

export default SearchHeader;
