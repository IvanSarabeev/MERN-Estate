import React from "react";
import Layout from "components/Layouts/Layout";
import { accents } from "components/constants";
import SearchHeader from "components/FormComp/SearchHeader";
import GridMenu from "components/GridMenu";
import SideImageView from "assets/images/house-clear-sky.jpg";

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
      <section className="padding-container mx-auto">
        <div className="max-w-screen-xl mx-auto gap-y-4 flex flex-col md:flex-row justify-around items-center">
          <img
              title='side-view'
              decoding='async'
              loading='lazy'
              src={SideImageView}
              alt="side-view"
              className="size-96 md:size-[450px] rounded-3xl aspect-auto object-center object-cover"
          />
          <div className="flex flex-col items-start justify-center">
            <h2 className='text-4xl leading-10 md:leading-[3.35rem] font-semibold text-slate-900'>
              We are the best and most <br/>
              trusted real estate agent
            </h2>
            <p className='text-slate-500/90 regular-16 md:regular-18 font-medium mt-5 mb-4 text-balance'>
              We are a trusted real estate agent with more <br/>
              than a decade of experience. You can trust us
            </p>
            <ul role="list" className="list-disc pl-5 space-y-3 text-slate-500">
              <li>
                <p className='text-slate-500/95 regular-16'>45k partners have worked with us</p>
              </li>
              <li>
                <p className='text-slate-500/95 regular-16'>Professional and experienced human
                  resources</p>
              </li>
              <li>
                <p className='text-slate-500/95 regular-16'>Provide the best service for users</p>
              </li>
            </ul>
            <button className='text-white regular-18 font-semibold px-7 py-3 rounded-xl bg-blue-600 mt-6'>Learn more
            </button>
          </div>
        </div>
      </section>
      <section className="h-fit w-full padding-container mx-auto">
        <GridMenu/>
      </section>
    </Layout>
  );
};

export default Home;
