import Input from "components/HTML/Input";
import Button from "components/HTML/Button";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { UserSignUpData } from "types/user";
import { registerUser } from "services/apiAuth";
import GoogleAuth from "components/OAuth/GoogleAuth";
import GitHubAuth from "components/OAuth/GitHubAuth";
import Layout from "components/Layouts/Layout";
import { avatarList } from "components/constants";
import AlertBadge, { AlertBadgeProps } from "components/Messages/AlertBadge";

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState<UserSignUpData>({
    email: "",
    username: "",
    password: "",
  });

  const [error, setError] = useState<null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [alertBadge, setAlertBadge] = useState<AlertBadgeProps | null>(null);

  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setLoading(true);

      if (formData !== null) {
        registerUser(formData);

        setAlertBadge({
          type: "success",
          title: "Registration Successful",
          description: "Your account has been created successfully!",
        });

        setError(null);

        setTimeout(() => {
          navigate("/sign-in"); // Navigate after 2000ms
        }, 2000);
      }
    } catch (catchError) {
      setLoading(false);

      setAlertBadge({
        type: "error",
        title: "Registration Failed",
        description: error || "An error occurred while registering.",
      });
      throw new Error(`Unexpected error ${error}`);
    }
  };

  return (
    <Layout>
      <section className="w-full flex flex-col md:flex-row items-center justify-center">
        <div className="h-fit lg:h-screen w-full lg:w-1/2 form-padding-container bg-white">
          <h2 className="regular-18 lg:bold-20 font-semibold text-left drop-shadow">
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
            action=""
            onSubmit={handleFormSubmit}
            className="gap-2 flex flex-col"
          >
            <div className="w-full gap-2 flex flex-col items-start justify-start">
              <label
                htmlFor="username"
                className="regular-16 font-semibold text-slate-900"
              >
                What should we call you?
              </label>
              <Input
                id="username"
                type="text"
                name="username"
                placeholder="e.g. Boonie Green"
                className="w-full border p-3 rounded-lg"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="w-full gap-2 flex flex-col items-start justify-start">
              <label
                htmlFor="email"
                className="regular-16 font-semibold text-slate-900"
              >
                Your email
              </label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="name@company.com"
                className="w-full border p-3 rounded-lg"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="w-full gap-2 flex flex-col items-start justify-start">
              <label
                htmlFor="password"
                className="regular-16 font-semibold text-slate-900"
              >
                Your password
              </label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="••••••"
                className="w-full border p-3 rounded-lg"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              title="submit-button"
              className="bg-[#0284c7] font-semibold mt-3 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80"
            >
              {loading ? "Loading ..." : "Create an account"}
            </Button>
          </form>
          {error && (
            <p className="regular-14 font-semibold text-red-500 my-2">
              {error}
            </p>
          )}
          <p className="regular-14 text-[#9297a2] font-light mt-2.5">
            Already have an account?
            <Link to={`/sign-in`} className="text-[#319ad1] ml-1.5 font-medium">
              Login here
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
        <div className="h-full md:h-screen w-full lg:w-1/2 flex flex-col items-start justify-center padding-container bg-[#0284c7]">
          <h1 className="text-white text-3xl lg:text-5xl font-extrabold mb-4">
            Explore the world’s leading MERN estate application.
          </h1>
          <p className="text-[#fde6ba] opacity-80 font-light mb-4">
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
                    className="size-10 border-2 border-white rounded-full dark:border-gray-800"
                  />
                );
              })}
            </div>
            <Link to={`/search`} className="border-l border-[0284c7]">
              <span className="regular-14 leading-5 font-light text-white/80 pl-3">
                Over
                <span className="font-medium text-white opacity-100 px-1">
                  15.7k
                </span>
                Happy Customers
              </span>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SignUp;
