import React, { useState } from "react";
import Layout from "components/Layouts/Layout";
import { boxSection } from "components/constants";
import BoxSection from "components/__comp/BoxSection";
import ContactForm from "./components/ContactForm";
import { useFormik } from "formik";
import { ContactFormInterface } from "types/user";
import { contactSchema } from "utils/formValidation";
import { sendContactMessage } from "services/common";

const Contact: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const initialValues: ContactFormInterface = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    text_message: "",
  };

  const validationSchema = contactSchema;

  const formik = useFormik<ContactFormInterface>({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);

        await sendContactMessage(values);

        console.log(values);

        setTimeout(() => {
          window.location.reload();
        }, 400);
      } catch (error) {
        setLoading(false);

        console.error(`Error occur: ${error}`);
      }
    },
  });

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
          <ContactForm formik={formik} loading={loading} />
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
