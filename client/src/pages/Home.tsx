import React from "react";
import Layout from "components/Layouts/Layout";
import { accents } from "components/constants";
import SearchHeader from "components/FormComp/SearchHeader";
import GridMenu from "components/GridMenu";

const Home: React.FC = () => {
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
      {/* <section className="">
        <div></div>
        <div>
          <h2>
            We are the best and most <br />
            trusted real estate agent
          </h2>
          <p>
            We are a trusted real estate agent with more <br />
            than a decade of experience. You can trust us
          </p>
          <ul>
            <li>
              <p>45k partners have worked with us</p>
            </li>
            <li>
              <p>Professional and experienced human resources</p>
            </li>
            <li>
              <p>Provide the best service for users</p>
            </li>
          </ul>
          <Button>Learn more &rarr;</Button>
        </div>
      </section> */}
      <section className="h-fit w-full padding-container mx-auto">
        <GridMenu />
      </section>
    </Layout>
  );
};

export default Home;
