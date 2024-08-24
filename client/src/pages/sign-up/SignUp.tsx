import React, { useState } from "react";
import { UserSignUpData } from "types/user";
import { registerNewUser } from "api/auth";
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

        await registerNewUser(values).then((response) => {
          if (response.success) {
            toast({
              variant: "success",
              title: "Success",
              description:
                response.message ?? "Code sended successfully to email",
            });
          } else {
            throw new Error(response.message || "Request failed!");
          }
        });

        setError(null);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An unexpected error occurred.";

        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: errorMessage,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });

        setError(errorMessage);
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
