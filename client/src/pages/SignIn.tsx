import { useState } from "react";
import Input from "components/HTML/Input";
import Button from "components/HTML/Button";
import { UserSignInData } from "types/user";
import { Link, useNavigate } from "react-router-dom";
import { signInUser } from "../services/apiAuth";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import GoogleAuth from "components/OAuth/GoogleAuth";
import { FaRegUserCircle } from "react-icons/fa";
import { IoLockOpenOutline } from "react-icons/io5";
import Layout from "components/Layouts/Layout";

const SignIn = () => {
  const [formData, setFormData] = useState<UserSignInData>({
    email: "",
    password: "",
  });

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
        navigate("/profile");
      }
    } catch (catchError) {
      throw new Error(`Error occur, cound't sign in ${JSON.stringify(error)}`);
    }
  };

  return (
    <Layout>
      <section className="max-w-xl padding-container mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
        <form
          action=""
          onSubmit={handleSubmit}
          method="post"
          className="gap-4 flex flex-col"
        >
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              <FaRegUserCircle height={16} width={16} />
              <span className="sr-only">User Icon</span>
            </span>
            <Input
              type="text"
              required
              id="email"
              name="email"
              onChange={handleInputChange}
              title="Username Input"
              placeholder="Enter your email"
              className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              <IoLockOpenOutline height={16} width={16} />
              <span className="sr-only">Pasword Icon</span>
            </span>
            <Input
              type="password"
              required
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              title="Password Input"
              placeholder="Enter your password"
              className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <Button
            type="submit"
            title="Sign in"
            className="px-3 py-2 2xl:p-3 rounded-lg uppercase text-white bg-slate-700 scale-105 transition-all hover:ease-out hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Loading..." : "Sign In"}
          </Button>
          <span className="relative flex justify-center">
            <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"></div>
            <span className="relative z-10 size-auto px-6 rounded-full mx-auto bg-[#f1f5f1]">
              OR
            </span>
          </span>
          <GoogleAuth />
        </form>
        <div className="flex justify-center mt-3">
          <p className="text-slate-900">Don't have an account ?</p>
          <u className="ml-1">
            <Link to={"/sign-up"} className="text-blue-700">
              Sign Up
            </Link>
          </u>
        </div>
        {error && <p className="text-red-500 mt-3"> {error} </p>}
      </section>
    </Layout>
  );
};

export default SignIn;
