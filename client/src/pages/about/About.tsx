import Layout from "components/Layouts/Layout";
import MemoCustomerInfo from "./components/CustomerInfo";
import MemoChoseUs from "./components/ChoseUs";
import MemoTestimonial from "./components/Testimonial";

const About = () => {
  return (
    <Layout>
      <MemoCustomerInfo />
      <MemoChoseUs />
      <MemoTestimonial />
    </Layout>
  );
};

export default About;
