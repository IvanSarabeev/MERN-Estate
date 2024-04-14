import React, { useEffect, useState } from "react";
import Layout from "components/Layouts/Layout";
import { achievmentTestimonial } from "components/constants";
import { Link } from "react-router-dom";
import { fetchRentListing, fetchSalesListing } from "../services/apiListing";
import { CreateListingIntf } from "types/listing";
import RentListing from "components/Listings/ListingTypes/RentListing";
import SalesListing from "components/Listings/ListingTypes/SalesListing";

const Home: React.FC = () => {
  const [rentListing, setRentListing] = useState<CreateListingIntf[]>([]);
  const [salesListing, setSalesListing] = useState<CreateListingIntf[]>([]);

  useEffect(() => {
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
      {/* <section className="relative h-screen w-screen bg-home-wallpaper bg-cover bg-top aspect-auto">
        <div className="absolute left-[20%] top-1/4 gap-6 flex flex-col items-start justify-start p-16 rounded-2xl bg-slate-300">
          <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
            Find your next <span className="text-slate-500">perfect</span>
            <br /> place with ease
          </h1>
          <Link
            to={"/search"}
            className="regular-12 sm:regular-14 lg:regular-16 text-blue-700 font-bold hover:underline transition-all ease-in-out"
          >
            Let's get started ...
          </Link>
        </div>
      </section> */}
      <section className="padding-container bg-white">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl">
              Find your next <span className="text-slate-500">perfect</span>
              <br /> place with ease
            </h1>
            <p className="max-w-xl md:regular-16 xl:regular-18 mb-6 font-light text-gray-500 lg:mb-8">
              From checkout to global sales tax compliance, companies around the
              world use Flowbite to simplify their payment stack.
            </p>
            <Link
              to={"/search"}
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800 regular-12 sm:regular-14 lg:regular-16 text-blue-700 hover:underline transition-all ease-in-out hover:text-gray-600"
            >
              Let's get started ...
            </Link>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
              alt="mockup"
            />
          </div>
        </div>
      </section>
      <section className="w-screen padding-container bg-white">
        <div className="flex flex-col text-center items-center justify-center mx-auto">
          <h2 className="text-2xl xl:text-5xl text-slate-900 font-bold">
            Achievement
          </h2>
          <p className="max-w-lg text-[#252525] regular-14 lg:regular-16 xl:regular-18 mt-4 xl:mt-6 font-semibold">
            Mentioned began rural, oval that developed from trial and
            successful.
          </p>
          <div className="gap-20 flex flex-wrap items-center self-center justify-around 2xl:flex-nowrap mx-auto py-12">
            {achievmentTestimonial.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  className="flex flex-col items-center justify-center mx-auto"
                  key={item.id}
                >
                  <Icon className="size-14" />
                  <h3 className="bold-20 lg:text-2xl font-bold">
                    {item.review}+
                  </h3>
                  <p className="text-slate-600 font-medium">{item.label}</p>
                </div>
              );
            })}
          </div>
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
        <article className="gap-2.5 md:gap-4 flex flex-col md:flex-row flex-wrap max-container">
          {rentListing !== null &&
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
        <article className="gap-2.5 md:gap-4 flex flex-col md:flex-row flex-wrap max-container">
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
