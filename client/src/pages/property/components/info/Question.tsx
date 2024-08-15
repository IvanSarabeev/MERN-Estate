import React, { memo } from "react";
import { SingleListingResponse } from "types/listing";
import { QuestionFormType } from "types/forms";
import { useFormik } from "formik";
import QuestionForm from "../forms/QuestionForm";
import Button from "components/HTML/Button";

type QuestionFormProps = {
  data: SingleListingResponse | null;
};

const Question: React.FC<QuestionFormProps> = ({ data }) => {
  const initialValues: QuestionFormType = {
    name: "",
    email: "",
    phone: "",
  };

  const formik = useFormik<QuestionFormType>({
    initialValues,
    onSubmit: async (values) => {
      console.table(values);
    },
  });

  return (
    <aside className="size-full pb-2 md:pb-4 lg:pb-6 rounded-lg bg-slate-900/90">
      <div className="w-full h-fit flexBetween flex-row-reverse items-center md:flex-row p-4 lg:px-6 border-b border-white">
        <Button className="size-fit px-4 py-2 regular-16 font-semibold text-white border border-white rounded-full bg-transparent">
          For {data?.type}
        </Button>
        <h3 className="bold-24 xl:text-3xl text-white whitespace-normal">
          ${data?.regularPrice.toFixed(2)}
        </h3>
      </div>
      <div className="flexColStart px-4 lg:px-6 space-y-4 mt-4">
        <h4 className="bold-20 xl:bold-24 text-white">
          Interested in this property
        </h4>
        <QuestionForm formik={formik} />
      </div>
    </aside>
  );
};

const MemoQuestion = memo(Question);

export default MemoQuestion;
