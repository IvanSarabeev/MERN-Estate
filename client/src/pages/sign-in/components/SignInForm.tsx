import React from "react";
import { loginList } from "components/constants";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdErrorOutline } from "react-icons/md";
import { FormikProps } from "formik";
import { UserSignInData } from "types/user";
import { Link } from "react-router-dom";
import Input from "components/HTML/Input";
import Button from "components/HTML/Button";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import GoogleAuth from "auth/GoogleAuth";
import GitHubAuth from "auth/GitHubAuth";

interface SignInFormProps {
  formik: FormikProps<UserSignInData>;
  loading: boolean | undefined;
  show: boolean;
  handleToggle: () => void;
}

const SignInForm: React.FunctionComponent<SignInFormProps> = ({
  formik,
  loading,
  show,
  handleToggle,
}) => {
  return (
    <>
      <div className="hidden lg:flex flex-col items-start justify-start">
        <img
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
          alt="logo"
          loading="lazy"
          decoding="async"
          className="size-8 lg:size-10 xl:size-12 2xl:size-14 mb-6 aspect-auto object-contain object-center"
        />
        {loginList.map((item) => {
          return (
            <div key={item.id} className="group gap-x-2 flex items-center">
              <IoIosCheckmarkCircle className="size-5 sm:size-6 md:size-7 xl:size-8 fill-[#0284c7]" />
              <div className="flex flex-col items-start justify-start pt-6">
                <h3 className="regular-18 xl:bold-20 font-bold">
                  {item.title}
                </h3>
                <p className="max-w-md regular-14 lg:regular-16 font-light mb-2 opacity-60">
                  {item.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-full max-w-xl xl:max-w-2xl 2xl:max-w-3xl flex flex-col justify-center rounded-lg shadow md:shadow-xl form-container bg-transparent md:bg-white">
        <h1 className="regular-18 lg:bold-20 font-semibold text-left mb-4 drop-shadow">
          Welcome back
        </h1>
        <form
          action=""
          method="post"
          onSubmit={formik.handleSubmit}
          className="gap-2 flex flex-col"
        >
          <div className="gap-2 md:gap-x-4 flex flex-col md:flex-row items-center justify-center">
            <GoogleAuth title="Log in with Google" />
            <GitHubAuth title="Log in via GitHub" />
          </div>
          <span className="flex items-center mt-4 mb-2">
            <span className="h-px flex-1 bg-[#e5e7eb]"></span>
            <span className="shrink-0 px-5 text-slate-500">or</span>
            <span className="h-px flex-1 bg-[#e5e7eb]"></span>
          </span>
          <div className="w-full gap-2 flex flex-col items-start justify-start">
            <label
              htmlFor="email"
              className="regular-14 lg:regular-16 2xl:regular-18 font-semibold text-slate-900"
            >
              Email
            </label>
            <Input
              type="email"
              id="email"
              required
              title="User email"
              {...formik.getFieldProps("email")}
              placeholder="Enter your email"
              className="w-full border p-3 rounded-lg"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="inline-flex gap-x-2 items-center text-red-600">
                <div>
                  <span className="sr-only">Error message</span>
                  <MdErrorOutline className="size-4" />
                </div>
                {formik.errors.email}
              </div>
            ) : null}
          </div>
          <div className="w-full gap-2 flex flex-col items-start justify-start">
            <label
              htmlFor="password"
              className="regular-14 lg:regular-16 2xl:regular-18 font-semibold text-slate-900"
            >
              Password
            </label>
            <div className="relative w-full h-fit">
              <Input
                type={show ? "text" : "password"}
                required
                id="password"
                title="User password"
                placeholder="••••••"
                {...formik.getFieldProps("password")}
                className="w-full border p-3 rounded-lg"
              />
              <div
                title="check password"
                aria-label="password visibility"
                onClick={() => handleToggle()}
                className="absolute inset-y-1/3 right-5 group"
              >
                {show ? (
                  <FaRegEyeSlash className="size-4 xl:size-5 group-hover:scale-105 group-hover:text-blue-600 group-hover:shadow-lg" />
                ) : (
                  <FaRegEye className="size-4 xl:size-5 group-hover:scale-105 group-hover:text-blue-600 group-hover:shadow-lg" />
                )}
              </div>
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div className="inline-flex gap-x-2 items-center text-red-600">
                <div>
                  <span className="sr-only">Error message</span>
                  <MdErrorOutline className="size-4" />
                </div>
                {formik.errors.password}
              </div>
            ) : null}
          </div>
          <div className="flex items-center justify-between mt-3 mb-1.5">
            <span className="flex gap-1 items-center justify-start">
              <Input
                type="checkbox"
                id="checkbox"
                name="checkbox"
                className="size-4 lg:size-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="checkbox"
                className="regular-14 lg:regular-16 font-medium"
              >
                Remember me
              </label>
            </span>
            <Link
              to={"/forgot-password"}
              className="regular-14 lg:regular-16 font-medium text-[#0284c7] transition-colors ease-in hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <Button
            type="submit"
            title="submit-button"
            className="bg-[#0284c7] font-semibold mt-3 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Loading.." : "Sign in to your account"}
          </Button>
        </form>
        <p className="regular-14 lg:regular-16 text-[#9297a2] font-light mt-4">
          Don't have an account yet?
          <Link to={`/sign-up`} className="text-[#319ad1] ml-1.5 font-medium">
            Sign up here
          </Link>
        </p>
      </div>
    </>
  );
};

export default SignInForm;
