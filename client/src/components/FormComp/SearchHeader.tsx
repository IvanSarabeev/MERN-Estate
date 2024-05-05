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
      <menu className="w-fit h-fit flex items-center flex-wrap list-none rounded-sm border-b border-slate-300">
        <li>
          <Button
            type="button"
            title="Rent propertyes"
            aria-label="Search Input"
            className="regular-14 font-medium text-blue-600 py-2.5 px-5 uppercase rounded-t-md bg-white"
          >
            For Rent
          </Button>
        </li>
        <li>
          <Button
            type="button"
            title="Sales propertyes"
            aria-label="Search Input"
            className="regular-14 font-medium text-white py-2.5 px-5 uppercase rounded-t-md bg-blue-600"
          >
            For Sale
          </Button>
        </li>
      </menu>
      <form
        action=""
        method="get"
        onSubmit={handleSubmit}
        className="hidden gap-4 md:flex items-center p-4 rounded-b-md rounded-tr-md bg-white"
      >
        <div className="flex flex-col items-start justify-start flex-nowrap md:flex-wrap">
          <label
            htmlFor="search-property"
            className="block font-sans font-medium uppercase ml-1"
          >
            Keyword
          </label>
          <div className="relative">
            <Input
              type="text"
              id="search-property"
              aria-label="Search input"
              placeholder="Search keywords"
              value={searchTerm}
              onChange={handleInputSearch}
              className="w-full min-w-96 max-w-xl regular-14 p-2.5 rounded-md border-b border-slate-400 bg-transparent focus:outline-none"
            />
            <FaSearch className="absolute end-4 inset-y-1/3 text-slate-500 pointer-events-none" />
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
