import React from "react";
import { FormikProps } from "formik";
import { QuestionFormType } from "types/forms";
import Input from "components/HTML/Input";
import Button from "components/HTML/Button";
import { ArrowRight } from "lucide-react";
import { MdErrorOutline } from "react-icons/md";

type QuestionFormProps = {
  formik: FormikProps<QuestionFormType>;
};

const QuestionForm: React.FC<QuestionFormProps> = ({ formik }) => {
  return (
    <form
      method="post"
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-2 space-y-2 xl:space-y-4 py-4 md:py-2"
    >
      <div className="w-full gap-2 flex flex-col items-start justify-start">
        <label htmlFor="name" className="hidden">
          Your name
        </label>
        <Input
          required
          type="text"
          id="name"
          placeholder="Name"
          className="w-full h-fit px-4 py-2 text-white rounded-full border border-slate-300 bg-transparent"
          {...formik.getFieldProps("name")}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="inline-flex gap-x-2 items-center text-red-600">
            <div>
              <span className="sr-only">Error message on name</span>
              <MdErrorOutline className="size-4" />
            </div>
            {formik.errors.name}
          </div>
        ) : null}
      </div>
      <div className="w-full gap-2 flex flex-col items-start justify-start">
        <label htmlFor="email" className="hidden">
          Your email
        </label>
        <Input
          required
          type="email"
          id="email"
          placeholder="Email Address"
          className="w-full h-fit px-4 py-2 text-white rounded-full border border-slate-300 bg-transparent"
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
      <div className="w-full gap-2 flex flex-col items-start justify-start">
        <label htmlFor="email" className="hidden">
          Your email
        </label>
        <Input
          required
          type="text"
          id="phone"
          placeholder="Phone Mumber"
          className="w-full h-fit px-4 py-2 text-white rounded-full border border-slate-300 bg-transparent"
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
      <Button className="size-fit text-black rounded-full px-6 py-3 bg-white">
        <span className="flex gap-x-1 items-center justify-center">
          Send message <span className="sr-only">Arrow Icon</span>
          <ArrowRight className="size-4" />
        </span>
      </Button>
    </form>
  );
};

export default QuestionForm;
