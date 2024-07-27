import React from "react";
import Layout from "components/Layouts/Layout";
import { UserSignInData } from "types/user";
import { useNavigate } from "react-router-dom";
import { signInUser } from "services/apiAuth";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { useFormik } from "formik";
import SignInForm from "./components/SignInForm";
import { signInValidationSchema } from "utils/formValidation";
import { toast } from "components/ui/use-toast";
import { ToastAction } from "components/ui/toast";
import useToggle from "hooks/useToggle";

const SignIn: React.FC = () => {
  const { loading } = useSelector((state: RootState) => state.user);

  const [show, setShow] = useToggle();

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
        const response = await signInUser(values, dispatch);

        if (response && response.user !== null) {
          toast({
            title: "Authentication succesful",
            description: `Redirecting to your account`,
          });

          setTimeout(() => {
            navigate("/account");
          }, 800);
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
        <SignInForm
          formik={formik}
          loading={loading}
          show={show}
          handleToggle={handleToggle}
        />
      </section>
    </Layout>
  );
};

export default SignIn;
