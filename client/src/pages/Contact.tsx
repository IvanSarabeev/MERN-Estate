import React from "react";
import Layout from "components/Layouts/Layout";
import Input from "components/HTML/Input";
import Button from "components/HTML/Button";
import { boxSection } from "components/constants";
import BoxSection from "components/__comp/BoxSection";
import Captcha from "components/__comp/Captcha";

const Contact: React.FC = () => {
  return (
    <Layout>
      <section className="w-full h-fit lg:h-screen overflow-x-hidden">
        <div className="bg-contact bg-no-repeat bg-cover">
          {/* grayscale-50 contrast-100 mix-blend-multiply */}
          <div className="max-w-2xl pt-8 lg:pt-24 px-4 lg:px-5 pb-72 lg:pb-80 text-center mx-auto">
            <h2 className="text-4xl 2xl:text-5xl font-extrabold text-white/85 mb-4">
              Contact Us
            </h2>
            <p className="text-light regular-14 lg:regular-16 2xl:regular-18 mb-16 text-[#818895]">
              We use an agile approach to test assumptions and connect with the
              needs of your audience early and often.
            </p>
          </div>
        </div>
        <div className="max-w-7xl pt-8 lg:pt-24 px-4 lg:px-5 pb-16 lg:pb-32 -mt-80 mx-auto">
          <form action="" method="post" className="contact-form">
            <div className="contact-item-row">
              <label htmlFor="fName" className="contact-label">
                First Name
              </label>
              <Input
                type="text"
                name="fName"
                placeholder="Boonie"
                className="contact-input"
              />
            </div>
            <div className="contact-item-row">
              <label htmlFor="lName" className="contact-label">
                Last Name
              </label>
              <Input
                type="text"
                name="lName"
                placeholder="Green"
                className="contact-input"
              />
            </div>
            <div className="contact-item-row">
              <label htmlFor="email" className="contact-label">
                Your Email
              </label>
              <Input
                type="email"
                name="email"
                placeholder="name@company.com"
                className="contact-input"
              />
            </div>
            <div className="contact-item-row">
              <label htmlFor="phone" className="contact-label">
                Your Phone
              </label>
              <Input
                type="number"
                name="phone"
                placeholder="+12 345 6789"
                className="contact-input"
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="text-message" className="contact-label">
                Your message
              </label>
              <textarea
                name="text-message"
                id="text-message"
                rows={6}
                placeholder="Leave a comment..."
                className="block resize-y w-full regular-14 text-slate-700/85 text-justify p-3 border border-[#d1d5db] rounded-lg shadow-lg"
              ></textarea>
              <p className="regular-14 2xl:regular-16 font-normal text-justify text-slate-700/80 mt-4">
                By submitting this form you agree to our
                <strong className="text-[#0284c7] mx-1 hover:underline">
                  terms and conditions
                </strong>
                and our
                <strong className="text-[#0284c7] mx-1 hover:underline">
                  privacy policy
                </strong>
                which explains how we may collect, use and disclose your
                personal information including to third parties.
              </p>
            </div>
            <div className="col-span-2 w-full gap-y-3 flex flex-col sm:flex-row-reverse justify-between sm:items-center items-start">
              <Captcha />
              <Button
                id="contact-submit"
                type="button"
                aria-label="Contact Form"
                title="Submit Contact Form"
                className="btn-contact-submit"
              >
                Send message
              </Button>
            </div>
          </form>
          <div className="gap-6 md:gap-12 grid col-span-1 lg:grid-cols-3 justify-center text-center mx-auto">
            {boxSection.map((item) => {
              const Icon = item.icon;
              return (
                <BoxSection
                  key={item.id}
                  text={item.text}
                  title={item.title}
                  Icon={Icon}
                />
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
