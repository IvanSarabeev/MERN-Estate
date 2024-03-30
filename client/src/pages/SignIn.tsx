import { useState } from "react";
import Input from "components/HTML/Input";
import Button from "components/HTML/Button";
import { UserSignInData } from "types/user";
import { Link, useNavigate } from "react-router-dom";
import { signInUser } from "../services/apiUser";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import GoogleAuth from "components/OAuth/GoogleAuth";

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
        navigate("/");
      }
    } catch (catchError) {
      throw new Error(`Error occur, cound't sign in ${error}`);
    }
  };

  return (
    <section className="max-w-xl padding-container mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form
        action=""
        onSubmit={handleSubmit}
        method="post"
        className="gap-4 flex flex-col"
      >
        <Input
          type="email"
          id="email"
          name="email"
          onChange={handleInputChange}
          required
          placeholder="Enter your email"
          className="border p-3 rounded-lg"
        />
        <Input
          type="password"
          id="password"
          name="password"
          onChange={handleInputChange}
          required
          placeholder="Enter your password"
          className="border p-3 rounded-lg"
        />
        <Button
          type="submit"
          title="Sign in"
          className="p-3 rounded-lg uppercase text-white bg-slate-700 scale-105 transition-all hover:ease-out hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign In"}
        </Button>
        <span className="size-auto relative mx-auto">OR</span>
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
  );
};

export default SignIn;
