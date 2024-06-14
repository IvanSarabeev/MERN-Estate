import React, { useState } from "react";
import Input from "components/HTML/Input";
import Button from "components/HTML/Button";
import Layout from "components/Layouts/Layout";
import { UserSignInData } from "types/user";
import GoogleAuth from "components/OAuth/GoogleAuth";
import GitHubAuth from "components/OAuth/GitHubAuth";
import { Link, useNavigate } from "react-router-dom";
import { signInUser } from "services/apiAuth";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { loginList } from "components/constants";
import { IoIosCheckmarkCircle } from "react-icons/io";
import AlertBadge, { AlertBadgeProps } from "components/Messages/AlertBadge";

const SignIn: React.FC = () => {
  const [formData, setFormData] = useState<UserSignInData>({
    email: "",
    password: "",
  });
  const [alertBadge, setAlertBadge] = useState<AlertBadgeProps | null>(null);

  const { loading, error } = useSelector((state: RootState) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (formData) {
        await signInUser(formData, dispatch);

        setAlertBadge({
          type: "success",
          title: "Authentication successful!",
          description: `Welcome back ${formData.email}.`,
        });

        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      }
    } catch (catchError) {
      setAlertBadge({
        type: "warning",
        title: "Unauthorized access",
        description: "Can't authenticate!",
      });

      throw new Error(`Error occur, couldn't sign in ${JSON.stringify(error)}`);
    }
  };

  return (
    <Layout>
      <section className="w-full h-fit lg:h-screen flex flex-col md:flex-row items-center justify-around form-padding-container bg-[#f9fafb]">
        <div className="hidden lg:flex flex-col items-start justify-start">
          <img
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
            className="size-8 lg:size-10 xl:size-12 2xl:size-16 mb-6 aspect-auto object-contain object-center"
          />
          {loginList.map((item) => {
            return (
              <div key={item.id} className="group gap-x-2 flex items-center">
                <IoIosCheckmarkCircle className="size-5 md:size-7 xl:size-9 fill-[#0284c7]" />
                <div className="flex flex-col items-start justify-start pt-6">
                  <h3 className="regular-18 lg:bold-20 xl:bold-24 font-bold">
                    {item.title}
                  </h3>
                  <p className="max-w-md regular-14 lg:regular-16 xl:regular-18 font-light mb-2 opacity-60">
                    {item.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="w-full max-w-xl xl:max-w-2xl 2xl:max-w-3xl flex flex-col justify-center rounded-lg shadow md:shadow-xl form-container bg-transparent md:bg-white">
          <h1 className="regular-18 lg:bold-20 xl:bold-24 font-semibold text-left mb-4 drop-shadow">
            Welcome back
          </h1>
          <form
            action=""
            method="post"
            onSubmit={handleSubmit}
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
                required
                id="email"
                name="email"
                title="User email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full border p-3 rounded-lg"
              />
            </div>
            <div className="w-full gap-2 flex flex-col items-start justify-start">
              <label
                htmlFor="password"
                className="regular-14 lg:regular-16 2xl:regular-18 font-semibold text-slate-900"
              >
                Password
              </label>
              <Input
                type="password"
                required
                id="password"
                name="password"
                title="User password"
                placeholder="••••••"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full border p-3 rounded-lg"
              />
            </div>
            <div className="flex items-center justify-between mt-3 mb-1.5">
              <span className="flex gap-1 items-center justify-start">
                <Input
                  type="checkbox"
                  id="checkbox"
                  name="checkbox"
                  className="size-4 lg:size-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="checkbox" className="regular-14 lg:regular-16 font-medium">
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
