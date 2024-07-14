import React from "react";
import { FormikProps } from "formik";
import { ContactFormInterface } from "types/user";
import Input from "components/HTML/Input";
import Button from "components/HTML/Button";
import Captcha from "components/__comp/Captcha";
import { MdErrorOutline } from "react-icons/md";

interface ContactFormProps {
  formik: FormikProps<ContactFormInterface>;
}

const ContactForm: React.FunctionComponent<ContactFormProps> = ({ formik }) => {
  return (
    <form method="post" onSubmit={formik.handleSubmit} className="contact-form">
      <div className="contact-item-row">
        <label htmlFor="first_name" className="contact-label">
          First Name
        </label>
        <Input
          required
          type="text"
          placeholder="Boonie"
          className="contact-input"
          {...formik.getFieldProps("first_name")}
        />
        {formik.touched.first_name && formik.errors.first_name ? (
          <div className="inline-flex gap-x-2 items-center text-red-600">
            <div>
              <span className="sr-only">Error message on first_name</span>
              <MdErrorOutline className="size-4" />
            </div>
            {formik.errors.first_name}
          </div>
        ) : null}
      </div>
      <div className="contact-item-row">
        <label htmlFor="last_name" className="contact-label">
          Last Name
        </label>
        <Input
          required
          type="text"
          placeholder="Green"
          className="contact-input"
          {...formik.getFieldProps("last_name")}
        />
        {formik.touched.last_name && formik.errors.last_name ? (
          <div className="inline-flex gap-x-2 items-center text-red-600">
            <div>
              <span className="sr-only">Error message on last_name</span>
              <MdErrorOutline className="size-4" />
            </div>
            {formik.errors.last_name}
          </div>
        ) : null}
      </div>
      <div className="contact-item-row">
        <label htmlFor="email" className="contact-label">
          Your Email
        </label>
        <Input
          required
          type="email"
          placeholder="name@company.com"
          className="contact-input"
          {...formik.getFieldProps("email")}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="inline-flex gap-x-2 items-center text-red-600">
            <div>
              <span className="sr-only">Error message on email</span>
              <MdErrorOutline className="size-4" />
            </div>
            {formik.errors.email}
          </div>
        ) : null}
      </div>
      <div className="contact-item-row">
        <label htmlFor="phone" className="contact-label">
          Your Phone
        </label>
        <Input
          type="text"
          placeholder="+12 345 6789"
          className="contact-input"
          {...formik.getFieldProps("phone")}
        />
        {formik.touched.phone && formik.errors.phone ? (
          <div className="inline-flex gap-x-2 items-center text-red-600">
            <div>
              <span className="sr-only">Error message on phone</span>
              <MdErrorOutline className="size-4" />
            </div>
            {formik.errors.phone}
          </div>
        ) : null}
      </div>
      <div className="col-span-2">
        <label htmlFor="text_message" className="contact-label">
          Your message
        </label>
        <textarea
          required
          rows={6}
          id="text_message"
          placeholder="Leave a comment..."
          className="block resize-y w-full regular-14 text-slate-700/85 text-justify p-3 border border-[#d1d5db] rounded-lg shadow-lg"
          {...formik.getFieldProps("text_message")}
        ></textarea>
        {formik.touched.text_message && formik.errors.text_message ? (
          <div className="inline-flex gap-x-2 items-center text-red-600">
            <div>
              <span className="sr-only">Error message on text_message</span>
              <MdErrorOutline className="size-4" />
            </div>
            {formik.errors.text_message}
          </div>
        ) : null}
        <p className="regular-14 2xl:regular-16 font-normal text-justify text-slate-700/80 mt-4">
          By submitting this form you agree to our
          <strong className="text-[#0284c7] mx-1 hover:underline">
            terms and conditions
          </strong>
          and our
          <strong className="text-[#0284c7] mx-1 hover:underline">
            privacy policy
          </strong>
          which explains how we may collect, use and disclose your personal
          information including to third parties.
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
  );
};

export default ContactForm;
