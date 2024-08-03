import React, { Suspense, useState, memo } from "react";
import Layout from "components/Layouts/Layout";
import { boxSection } from "components/constants";
import BoxSection from "components/__comp/BoxSection";
import ContactForm from "./components/ContactForm";
import { useFormik } from "formik";
import { ContactFormInterface } from "types/user";
import { contactSchema } from "utils/formValidation";
import { sendContactMessage } from "api/common";
import { useToast } from "components/ui/use-toast";
import { ToastAction } from "components/ui/toast";
import Loader from "components/__comp/Loaders/CircleLoader";

const Contact: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const { toast } = useToast();

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

        await sendContactMessage(values).then((response) => {
          if (response.success) {
            toast({
              title: "Success",
              description: "Your message has been sent.",
            });
          } else {
            throw new Error("Request failed!");
          }
        });
      } catch (error) {
        setLoading(false);

        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem when sending",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Layout>
      <section className="w-full h-fit lg:h-screen overflow-x-hidden">
        <div className="relative bg-contact bg-no-repeat bg-cover bg-center">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 max-w-2xl pt-8 lg:pt-24 px-4 lg:px-5 pb-72 lg:pb-80 text-center mx-auto">
            <h2 className="text-4xl 2xl:text-5xl font-extrabold text-white/85 mb-4">
              Contact Us
            </h2>
            <p className="text-light regular-14 lg:regular-16 2xl:regular-18 mb-16 text-[#818895]">
              We use an agile approach to test assumptions and connect with the
              needs of your audience early and often.
            </p>
          </div>
        </div>
        <div className="relative z-10 max-w-7xl pt-8 lg:pt-12 px-4 lg:px-5 pb-16 lg:pb-32 -mt-80 mx-auto">
          <Suspense fallback={<Loader />}>
            <ContactForm formik={formik} loading={loading} />
          </Suspense>
          <div className="gap-6 md:gap-12 grid col-span-1 lg:grid-cols-3 justify-center text-center mx-auto">
            {boxSection.map((item) => {
              const Icon = item.icon;
              return (
                <MemoBoxSection
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

const MemoBoxSection = memo(BoxSection);

export default Contact;
