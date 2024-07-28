import React, { useState } from "react";
import { FormikProps } from "formik";
import { UserSignUpData } from "types/user";
import { avatarList } from "components/constants";
import { Link } from "react-router-dom";
import GoogleAuth from "components/OAuth/GoogleAuth";
import GitHubAuth from "components/OAuth/GitHubAuth";
import Input from "components/HTML/Input";
import { MdErrorOutline } from "react-icons/md";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Button } from "components/ui/button";
import OtpDialog from "./OtpDialog";

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

  const email = formik.values.email;

  return (
    <>
      <div className="h-fit lg:h-screen w-full lg:w-1/2 flex flex-col justify-center form-padding-container bg-white">
        <h2 className="regular-18 xl:bold-20 font-semibold text-left drop-shadow mb-3">
          Your Best Work Starts Here
        </h2>
        <div className="gap-2 flex flex-col md:flex-row items-center justify-center lg:justify-start mt-3">
          <GoogleAuth title="Sign up with Google" />
          <GitHubAuth title="Sign up with GitHub" />
        </div>
        <span className="flex items-center my-4">
          <span className="h-px flex-1 bg-[#e5e7eb]"></span>
          <span className="shrink-0 px-5 text-slate-500">or</span>
          <span className="h-px flex-1 bg-[#e5e7eb]"></span>
        </span>
        <form
          method="post"
          onSubmit={formik.handleSubmit}
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
              <div
                onClick={handlePasswordToggle}
                className="absolute inset-y-1/3 right-5 group"
              >
                {togglePass ? (
                  <FaRegEyeSlash className="size-4 xl:size-5 group-hover:scale-105 group-hover:text-blue-600 group-hover:shadow-lg" />
                ) : (
                  <FaRegEye className="size-4 xl:size-5 group-hover:scale-105 group-hover:text-blue-600 group-hover:shadow-lg" />
                )}
              </div>
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
              onClick={() => setShowOtpDialog(true)}
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
          <OtpDialog
            open={showOtpDialog}
            onOpenChange={setShowOtpDialog}
            email={email}
            otp={otp}
            setOtp={setOtp}
            error={error}
            setError={setError}
            loading={loading}
            setLoading={setLoading}
          />
        </form>
        {/* Show error */}
        {error && (
          <p className="regular-14 md:regular-16 font-semibold text-red-500 my-2">
            {error}
          </p>
        )}
      </div>
      <div className="h-full md:h-screen w-full lg:w-1/2 flex flex-col items-start justify-center padding-container bg-[#0284c7]">
        <h1 className="text-white text-3xl lg:text-5xl font-extrabold mb-4 text-balance">
          Explore the world’s leading MERN estate application.
        </h1>
        <p className="text-[#fde6ba] regular-16 lg:regular-18 opacity-80 font-light mb-4 text-wrap max-w-3xl">
          Millions of people and agencies around the world use our work on
          MERN/Estate - the home to the world’s best real estate and
          professional employees.
        </p>
        <div className="flex items-center justify-start">
          <div className="flex -space-x-4 rtl:space-x-reverse pr-3">
            {avatarList.map((item) => {
              return (
                <img
                  key={item.id}
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  className="size-10 2xl:size-12 border-2 border-white rounded-full dark:border-gray-800 aspect-auto object-cover object-center"
                />
              );
            })}
          </div>
          <Link to={`/search`} className="border-l border-[0284c7]">
            <span className="regular-14 md:regular-16 leading-5 font-light text-white/80 md:pl-3">
              Over
              <span className="font-medium md:font-bold text-white opacity-100 px-1">
                15.7k
              </span>
              Happy Customers
            </span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
