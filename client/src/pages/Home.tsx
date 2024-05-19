import React, { useCallback, useState } from "react";
import Layout from "components/Layouts/Layout";
import { accents, bentoGridInfo } from "components/constants";
import { Link } from "react-router-dom";
import { fetchRentListing, fetchSalesListing } from "services/apiListing";
import { CreateListingIntf } from "types/listing";
import RentListing from "components/Listings/ListingTypes/RentListing";
import SalesListing from "components/Listings/ListingTypes/SalesListing";
import SearchHeader from "components/FormComp/SearchHeader";

const Home: React.FC = () => {
  const [rentListing, setRentListing] = useState<CreateListingIntf[]>([]);
  const [salesListing, setSalesListing] = useState<CreateListingIntf[]>([]);

  useCallback(() => {
    const handleFetchRentListing = async () => {
      const rentData = await fetchRentListing();

      setRentListing(rentData);
    };

    handleFetchRentListing();

    const handleFetchSalesListing = async () => {
      const salesData = await fetchSalesListing();

      setSalesListing(salesData);
    };

    handleFetchSalesListing();
  }, []);

  return (
    <Layout>
      <section className="padding-container mx-auto">
        <div className="home-hero">
          <div className="absolute top-1/4 padding-container">
            <h1 className="home-heading">
              Find the{" "}
              <strong className="text-blue-700 underline underline-offset-4">
                perfect
              </strong>
              <br />
              paradise in your home
            </h1>
            <p className="sub-paragraph">
              Find a luxury residence that suits you, we will help <br />
              you to find the most suitable residence for you
            </p>
          </div>
          <SearchHeader />
        </div>
      </section>
      <section className="gap-y-6 flex flex-col md:flex-row flex-wrap md:flex-nowrap justify-between max-w-7xl padding-container mx-auto">
        {accents.map((item) => {
          return (
            <div key={item.id} className="accent-container">
              <h3 className="accent-title">{item.title}</h3>
              <p className="accent-label">{item.label}</p>
            </div>
          );
        })}
      </section>
      <section className="h-screen w-full padding-container mx-auto bg-white">
        <div className="max-w-screen-xl grid grid-cols-2 xl:grid-cols-3 gap-4 p-4 mx-auto">
          {/* !Make the BentoGrid Adaptive and structure the css properly */}
          {bentoGridInfo.map((item, index) => {
            return (
              <div key={item.id} className={`${item.style}`}>
                <div className="relative w-full">
                  <img
                    src={item.imageSrc}
                    className={`${item.imageStyle} rounded-lg bg-center bg-no-repeat bg-cover object-cover aspect-auto`}
                    alt={item.title}
                  />
                </div>
                <h4 className="font-sans regular-18 lg:bold-20 2xl:bold-24 text-slate-400 font-semibold mt-2">
                  {item.title}
                </h4>
                <p
                  className={`font-serif regular-14 lg:regular-16 2xl:regular-18 text-slate-700 font-medium leading-3 text-balance mt-2 ${
                    index === 5 ? "first-letter:text-3xl font-bold" : ""
                  }`}
                >
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </section>
      <section className="gap-6 flex flex-col py-3 md:py-8 padding-container mx-auto bg-white">
        <div className="gap-2 flex flex-col items-start justify-start">
          <h2 className="text-2xl lg:text-4xl font-semibold text-slate-600">
            Recently added rent
          </h2>
          <Link
            to={`/search&rent=true`}
            className="regular-14 mg:regular-16 font-medium text-blue-800 transition-all ease-in-out hover:underline"
          >
            Show more renting propertyes
          </Link>
        </div>
        <article className="gap-4 md:gap-6 flex flex-col md:flex-row flex-wrap max-container">
          {rentListing &&
            rentListing.length > 0 &&
            rentListing.map((item) => {
              return <RentListing key={item._id} item={item} />;
            })}
        </article>
      </section>
      <section className="gap-6 flex flex-col py-3 md:py-8 padding-container mx-auto bg-white">
        <div className="gap-2 flex flex-col items-start justify-start">
          <h2 className="text-2xl lg:text-4xl font-semibold text-slate-600">
            Recently added sales
          </h2>
          <Link
            to={`/search&rent=true`}
            className="regular-14 mg:regular-16 font-medium text-blue-800 transition-all ease-in-out hover:underline"
          >
            Show more sales posts
          </Link>
        </div>
        <article className="gap-4 md:gap-6 flex flex-col md:flex-row flex-wrap max-container">
          {salesListing !== null &&
            salesListing.length > 0 &&
            salesListing.map((item) => {
              return <SalesListing key={item._id} item={item} />;
            })}
        </article>
      </section>
    </Layout>
  );
};

export default Home;
