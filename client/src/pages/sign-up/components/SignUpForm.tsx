import React, { useState } from "react";
import { FormikProps } from "formik";
import { UserSignUpData } from "types/user";
import { Link } from "react-router-dom";
import Input from "components/HTML/Input";
import { MdErrorOutline } from "react-icons/md";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Button } from "components/ui/button";
import MemoOtpModal from "./OtpModal";
import MemoAuthOptions from "./AuthOptions";
import MemoFeaturedContent from "./FeaturedContent";

interface SignUpFormProps {
  formik: FormikProps<UserSignUpData>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const SignUpForm: React.FunctionComponent<SignUpFormProps> = ({
  formik,
  loading,
  setLoading,
  error,
  setError,
}) => {
  const [togglePass, setTogglePass] = useState<boolean>(false);
  const [showOtpDialog, setShowOtpDialog] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");

  const handlePasswordToggle = () => {
    setTogglePass(!togglePass);
  };

  const { username, email, password } = formik.values;

  const isFormInvalid =
    !username || !email || !password || Object.keys(formik.errors).length > 0;

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   if (isFormInvalid) {
  //     return setShowOtpDialog(false);
  //   } else {
  //     try {
  //       await formik.handleSubmit(e);
  //       // Assume form submission triggers OTP request
  //       setShowOtpDialog(true);
  //     } catch (submitError) {
  //       const message =
  //         submitError instanceof Error
  //           ? submitError.message
  //           : "An unexpted error occurred.";

  //       setError(message);
  //       setShowOtpDialog(false);
  //     }
  //   }
  // };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isFormInvalid) {
      // Form is invalid, don't show OTP dialog
      setShowOtpDialog(false);
      return;
    }

    // Form is valid, submit the form and show OTP dialog
    formik.handleSubmit();
    setShowOtpDialog(true);
  };

  return (
    <>
      <div className="h-fit lg:h-screen w-full lg:w-1/2 flex flex-col justify-center form-padding-container bg-white">
        <h2 className="regular-18 xl:bold-20 font-semibold text-left drop-shadow mb-3">
          Your Best Work Starts Here
        </h2>
        <MemoAuthOptions />
        <form
          method="post"
          onSubmit={handleSubmit}
          className="gap-2 flex flex-col"
        >
          <div className="w-full gap-2 flex flex-col items-start justify-start">
            <label
              htmlFor="username"
              className="regular-14 xl:regular-16 font-semibold text-slate-900"
            >
              Your username
            </label>
            <Input
              required
              type="text"
              id="username"
              placeholder="e.g. Boonie Green"
              className="w-full border p-3 rounded-lg"
              {...formik.getFieldProps("username")}
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="inline-flex gap-x-2 items-center text-red-600">
                <div>
                  <span className="sr-only">Error message on username</span>
                  <MdErrorOutline className="size-4" />
                </div>
                {formik.errors.username}
              </div>
            ) : null}
          </div>
          <div className="w-full gap-2 flex flex-col items-start justify-start xl:mt-2">
            <label
              htmlFor="email"
              className="regular-14 xl:regular-16 font-semibold text-slate-900"
            >
              Your email
            </label>
            <Input
              required
              id="email"
              type="email"
              placeholder="name@company.com"
              className="w-full border p-3 rounded-lg"
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
          <div className="w-full gap-2 flex flex-col items-start justify-start xl:mt-2">
            <label
              htmlFor="password"
              className="regular-14 xl:regular-16 font-semibold text-slate-900"
            >
              Your password
            </label>
            <div className="relative w-full h-fit">
              <Input
                required
                id="password"
                type={`${togglePass ? "text" : "password"}`}
                placeholder="••••••"
                className="w-full border p-3 rounded-lg"
                {...formik.getFieldProps("password")}
              />
              <button
                onClick={handlePasswordToggle}
                className="absolute inset-y-1/3 right-5 group"
              >
                {togglePass ? (
                  <FaRegEyeSlash className="size-4 xl:size-5 group-hover:scale-105 group-hover:text-blue-600 group-hover:shadow-lg" />
                ) : (
                  <FaRegEye className="size-4 xl:size-5 group-hover:scale-105 group-hover:text-blue-600 group-hover:shadow-lg" />
                )}
              </button>
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div className="inline-flex gap-x-2 items-center text-red-600">
                <div>
                  <span className="sr-only">Error message on password</span>
                  <MdErrorOutline className="size-4" />
                </div>
                {formik.errors.password}
              </div>
            ) : null}
          </div>
          <div className="flexColStart md:flex-row md:items-center md:justify-between">
            <Button
              type="submit"
              disabled={loading}
              title="submit-button"
              className="w-fit bg-[#0284c7] font-semibold mt-3 text-white py-3 md:py-5 rounded-lg hover:opacity-95 disabled:opacity-80 xl:mt-5"
            >
              {loading ? "Creating account..." : "Create an account"}
            </Button>
            <p className="regular-14 md:regular-16 text-[#9297a2] font-light mt-2.5 md:mt-4">
              Already have an account?
              <Link
                to={`/sign-in`}
                className="text-[#319ad1] ml-1.5 font-medium hover:font-semibold hover:underline hover:underline-offset-auto"
              >
                Login here
              </Link>
            </p>
          </div>
          <MemoOtpModal
            open={showOtpDialog}
            email={email}
            otp={otp}
            setOtp={setOtp}
            error={error}
            setError={setError}
            loading={loading}
            setLoading={setLoading}
            setShowDialog={setShowOtpDialog}
          />
        </form>
        {error && (
          <p className="regular-14 md:regular-16 font-semibold text-red-500 my-2">
            {error}
          </p>
        )}
      </div>
      <MemoFeaturedContent />
    </>
  );
};

export default SignUpForm;
