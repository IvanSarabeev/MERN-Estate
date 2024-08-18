import React from "react";
import Layout from "components/Layouts/Layout";
import { SignInCredentials } from "types/user";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import SignInForm from "./components/SignInForm";
import { signInValidationSchema } from "utils/formValidation";
import { toast } from "components/ui/use-toast";
import { ToastAction } from "components/ui/toast";
import useToggle from "hooks/useToggle";
import { authStore } from "stores/authStore";

const SignIn: React.FC = () => {
  const [show, setShow] = useToggle();

  const navigate = useNavigate();

  const initialValues: SignInCredentials = {
    email: "",
    password: "",
  };

  const validationSchema = signInValidationSchema;

  const formik = useFormik<SignInCredentials>({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await authStore.loadUserAuthentication(values);

        if (response.success) {
          toast({
            title: "Authentication succesful",
            description: `Redirecting to your account`,
          });

          setTimeout(() => {
            navigate("/account");
          }, 800);
        } else {
          return false;
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Invalid credentials",
          description: "Uh oh! Something went wrong.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });

        if (error instanceof TypeError) {
          console.error(`Type error occur: ${error.message}`);
        } else if (error instanceof ReferenceError) {
          console.error(`Reference error occur: ${error.message}`);
        }
      }
    },
  });

  const handleToggle = () => {
    setShow();
  };

  return (
    <Layout>
      <section className="w-full h-fit lg:h-screen flex flex-col md:flex-row items-center justify-around form-padding-container bg-[#f9fafb]">
        <SignInForm formik={formik} show={show} handleToggle={handleToggle} />
      </section>
    </Layout>
  );
};

export default SignIn;
