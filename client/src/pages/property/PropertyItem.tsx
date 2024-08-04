import React, { useCallback, useEffect, useState } from "react";
import Layout from "components/Layouts/Layout";
import { useParams } from "react-router-dom";
import { fetchListingById } from "api/listings";
import { SingleListingResponse } from "types/listing";

const PropertyItem: React.FC = () => {
  const { id } = useParams();

  const [itemData, setItemData] = useState<SingleListingResponse | null>(null);

  const fetchListing = useCallback(async () => {
    const response = await fetchListingById(id);

    if (response) {
      setItemData(response);
    }
  }, [id]);

  useEffect(() => {
    fetchListing();
  }, [fetchListing]);

  console.log(itemData);

  return (
    <Layout>
      <section className="padding-container max-container">
        <img src="" alt="" />
      </section>
    </Layout>
  );
};

export default PropertyItem;
