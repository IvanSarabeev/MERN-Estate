import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserSignUpData } from "types/user";
import { registerUser } from "services/apiAuth";
import Layout from "components/Layouts/Layout";
import { AlertBadgeProps } from "components/Messages/AlertBadge";
import { useFormik } from "formik";
import { signUpSchema } from "utils/formValidation";
import SignUpForm from "./components/SignUpForm";

const SignUp: React.FC = () => {
  const [error, setError] = useState<null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [alertBadge, setAlertBadge] = useState<AlertBadgeProps | null>(null);

  const navigate = useNavigate();

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

        await registerUser(values);

        setError(null);

        setAlertBadge({
          type: "success",
          title: "Registration Successful",
          description: "Your account has been created successfully!",
        });

        setTimeout(() => {
          navigate("/sign-in");
        }, 500);
      } catch (err) {
        setLoading(false);

        setAlertBadge({
          type: "error",
          title: "Registration failed!",
          description: `${err}`,
        });
      }
    },
  });

  return (
    <Layout>
      <section className="w-full flex flex-col md:flex-row items-center justify-center">
        <SignUpForm
          formik={formik}
          loading={loading}
          error={error}
          alertBadge={alertBadge}
        />
      </section>
    </Layout>
  );
};

export default SignUp;
