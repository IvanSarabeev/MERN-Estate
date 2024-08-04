import React, { useCallback, useEffect, useState } from "react";
import Layout from "components/Layouts/Layout";
import { useParams } from "react-router-dom";
import { fetchListingById } from "api/listings";
import { SingleListingResponse } from "types/listing";
import PropertyItem from "./components/PropertyItem";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";

const PropertyPage: React.FC = () => {
  const { id } = useParams();

  const [itemData, setItemData] = useState<SingleListingResponse | null>(null);

  SwiperCore.use([Navigation]);

  const fetchListing = useCallback(async () => {
    const response = await fetchListingById(id);

    if (response) {
      setItemData(response);
    }
  }, [id]);

  useEffect(() => {
    fetchListing();
  }, [fetchListing]);

  return (
    <Layout>
      <section className="padding-container max-container">
        <PropertyItem data={itemData} />
      </section>
    </Layout>
  );
};

export default PropertyPage;
