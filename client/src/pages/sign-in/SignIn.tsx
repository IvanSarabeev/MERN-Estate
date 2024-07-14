import React, { useState } from "react";
import Layout from "components/Layouts/Layout";
import { UserSignInData } from "types/user";
import { useNavigate } from "react-router-dom";
import { signInUser } from "services/apiAuth";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import AlertBadge, { AlertBadgeProps } from "components/Messages/AlertBadge";
import { useFormik } from "formik";
import SignInForm from "./components/SignInForm";
import { signInValidationSchema } from "utils/formValidation";

const SignIn: React.FC = () => {
  const [alertBadge, setAlertBadge] = useState<AlertBadgeProps | null>(null);

  const { loading } = useSelector((state: RootState) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues: UserSignInData = {
    email: "",
    password: "",
  };

  const validationSchema = signInValidationSchema;

  const formik = useFormik<UserSignInData>({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        await signInUser(values, dispatch);

        setAlertBadge({
          type: "success",
          title: "Authentication successful!",
          description: `Welcome back ${values.email}.`,
        });

        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      } catch (error) {
        setAlertBadge({
          type: "error",
          title: "Authentication failed!",
          description: `${error}`,
        });
      }
    },
  });

  return (
    <Layout>
      <section className="w-full h-fit lg:h-screen flex flex-col md:flex-row items-center justify-around form-padding-container bg-[#f9fafb]">
        <SignInForm formik={formik} loading={loading} />
        {alertBadge && (
          <AlertBadge
            type={alertBadge.type}
            title={alertBadge.title}
            description={alertBadge.description}
          />
        )}
      </section>
    </Layout>
  );
};

export default SignIn;
