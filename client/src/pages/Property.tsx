import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchListing } from "../services/apiListing";
import Layout from "components/Layouts/Layout";
import Loader from "components/Loader";
import { CreateListingIntf } from "types/listing";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaParking,
  FaChair,
} from "react-icons/fa";
import { store } from "store/store";
import { ReduxUserState } from "types/redux";
import MessageModal from "components/MessageModal";

const Property: React.FC = () => {
  const { id } = useParams();
  const currentUser = store.getState().user.currentUser as ReduxUserState;

  const [propertyData, setPropertyData] = useState<CreateListingIntf | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [contact, setContact] = useState<boolean>(false);

  SwiperCore.use([Navigation]);

  useEffect(() => {
    const handlePropertyFetch = async () => {
      if (id) {
        try {
          const data = await fetchListing(id, { setLoading });

          if (data) {
            return setPropertyData(data);
          } else return setError(data);
        } catch (error) {
          throw new Error(`Unexpected error occur: ${error}`);
        }
      }
    };

    handlePropertyFetch();
  }, [id]);
  return (
    <Layout>
      {error && (
        <p className="text-center text-2xl lg:text-5xl text-red-600 my-6 mx-auto">
          Something went wrong
        </p>
      )}
      {propertyData !== null && !error && !loading ? (
        <>
          <Swiper navigation>
            {propertyData.imageUrls.map((item) => {
              return (
                <SwiperSlide key={item}>
                  <div
                    className="h-80 sm:h-96 lg:h-[550px] aspect-auto"
                    style={{
                      background: `url(${item}) center no-repeat`,
                      backgroundSize: "cover",
                    }}
                  ></div>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <article className="max-w-5xl gap-4 flex flex-col p-3 my-7 mx-auto">
            <p className="text-2xl font-semibold">
              {propertyData.name} - ${" "}
              {propertyData.offer
                ? propertyData.discountPrice?.toLocaleString("en-US")
                : propertyData.regularPrice?.toLocaleString("en-US")}
              {propertyData.type === "rent" && " / month"}
            </p>
            <p className="flex items-center mt-6 gap-2 text-slate-600  text-sm">
              <FaMapMarkerAlt className="text-green-700" />
              {propertyData.address}
            </p>
            <div className="flex gap-4">
              <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {propertyData.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {propertyData.offer && (
                <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  {+propertyData.regularPrice?.toLocaleString("en-US") -
                    +propertyData.discountPrice?.toLocaleString("en-US")}{" "}
                  $ OFF
                </p>
              )}
            </div>
            <p className="text-slate-800">
              <span className="font-semibold text-black">Description - </span>
              {propertyData.description}
            </p>
            <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBed className="text-lg" />
                {propertyData.bedroom !== null
                  ? `${propertyData.bedroom} beds `
                  : `${propertyData.bedroom} bed `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBath className="text-lg" />
                {propertyData.bathroom !== null
                  ? `${propertyData.bathroom} baths `
                  : `${propertyData.bathroom} bath `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaParking className="text-lg" />
                {propertyData.parking ? "Parking spot" : "No Parking"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaChair className="text-lg" />
                {propertyData.furnished ? "Furnished" : "Unfurnished"}
              </li>
            </ul>
            {currentUser && propertyData.userRef !== currentUser._id && (
              <button
                onClick={() => setContact(true)}
                className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3"
              >
                Contact landlord
              </button>
            )}
            {contact && <MessageModal listing={propertyData} />}
          </article>
        </>
      ) : (
        <Loader />
      )}
    </Layout>
  );
};

export default Property;
