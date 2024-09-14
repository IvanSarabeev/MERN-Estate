import Layout from "components/Layouts/Layout";
import MemoCustomerInfo from "./components/CustomerInfo";
import MemoChoseUs from "./components/ChoseUs";
import MemoTestimonial from "./components/Testimonial";
import MemoPropertyTypes from "./components/PropertyTypes";
import MemoTeamMembers from "./components/TeamMembers";

const About = () => {
  return (
    <Layout>
      <MemoCustomerInfo />
      <MemoChoseUs />
      <MemoTestimonial />
      <MemoTeamMembers />
      <MemoPropertyTypes />
    </Layout>
  );
};

export default About;
