import Layout from "components/Layouts/Layout";
import MemoCustomerInfo from "./components/CustomerInfo";
import MemoChoseUs from "./components/ChoseUs";
import MemoTestimonial from "./components/Testimonial";
import MemoPropertyTypes from "./components/PropertyTypes";

const About = () => {
  return (
    <Layout>
      <MemoCustomerInfo />
      <MemoChoseUs />
      <MemoTestimonial />
      <MemoPropertyTypes />
    </Layout>
  );
};

export default About;
