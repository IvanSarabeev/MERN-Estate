import React, { useState } from "react";
import { UserSignUpData } from "types/user";
import { registerUser } from "services/apiAuth";
import { useFormik } from "formik";
import { signUpSchema } from "utils/formValidation";
import { toast } from "components/ui/use-toast";
import { ToastAction } from "components/ui/toast";
import SignUpForm from "./components/SignUpForm";
import Header from "components/Navigation/Header";

const SignUp: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const initialValues: UserSignUpData = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = signUpSchema;

  const formik = useFormik<UserSignUpData>({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);

        await registerUser(values).then((response) => {
          if (response.success) {
            toast({
              title: "Email sended",
              description: "Confirmation code sended to email",
            });
          } else {
            throw new Error("Request failed!");
          }
        });

        setError(null);
      } catch (err) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem when sending",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });

        setLoading(false);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      <Header />
      <section className="w-full flex flex-col md:flex-row items-center justify-center">
        <SignUpForm
          formik={formik}
          loading={loading}
          setLoading={setLoading}
          error={error}
          setError={setError}
        />
      </section>
    </>
  );
};

export default SignUp;
