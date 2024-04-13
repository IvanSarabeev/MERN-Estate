import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchListing } from "../services/apiListing";
import Layout from "components/Layouts/Layout";
import Loader from "components/Loader";
import { CreateListingIntf } from "types/listing";

const Property: React.FC = () => {
  const { id } = useParams();

  const [propertyData, setPropertyData] = useState<CreateListingIntf | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const handlePropertyFetch = async () => {
      if (id) {
        try {
          const data = await fetchListing(id, { setLoading });

          if (data) {
            setPropertyData(data);
          }
        } catch (error) {
          throw new Error(`Unexpected error occur: ${error}`);
        }
      }
    };

    handlePropertyFetch();
  }, [id]);
  return (
    <Layout>
      <h1>Property</h1>
      {error && (
        <p className="text-center text-2xl lg:text-5xl text-red-600 my-6 mx-auto">
          Something went wrong
        </p>
      )}
      {propertyData !== null && !error && !loading ? (
        <div>{propertyData.name}</div>
      ) : (
        <Loader />
      )}
    </Layout>
  );
};

export default Property;
