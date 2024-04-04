import Input from "components/HTML/Input";
import Button from "components/HTML/Button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserSignUpData } from "types/user";
import { registerUser } from "../services/apiAuth";
import GoogleAuth from "components/OAuth/GoogleAuth";
import Layout from "components/Layouts/Layout";

const SignUp = () => {
  const [formData, setFormData] = useState<UserSignUpData>({
    email: "",
    username: "",
    password: "",
    // TODO: add retypePassword to the DB scheme
    // repassword: "",
  });

  const [error, setError] = useState<null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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
        setError(null);
        navigate("/sign-in");
      }
    } catch (catchError) {
      setLoading(false);

      throw new Error(`Unexpected error ${error}`);
    }
  };

  return (
    <Layout>
      <section className="padding-container max-w-xl mx-auto">
        <h2 className="text-center text-3xl font-semibold my-7">
          Sign Up Page
        </h2>
        <form
          action=""
          onSubmit={handleFormSubmit}
          className="gap-4 flex flex-col"
        >
          <Input
            id="username"
            type="text"
            name="username"
            value={formData.username}
            placeholder="Username"
            className="border p-3 rounded-lg"
            onChange={handleInputChange}
            required
          />
          <Input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email"
            className="border p-3 rounded-lg"
            onChange={handleInputChange}
            required
          />
          <Input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            placeholder="Password"
            className="border p-3 rounded-lg"
            onChange={handleInputChange}
            required
          />
          {/* <Input
            id="repassword"
            type="password"
            name="repassword"
            value={formData.repassword}
            placeholder="Re-password"
            className="border p-3 rounded-lg"
            onChange={handleInputChange}
            required
          /> */}
          <Button
            type="submit"
            disabled={loading}
            title="submit-button"
            className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Loading ..." : "Sign up"}
          </Button>
          <span className="size-auto relative mx-auto">OR</span>
          <GoogleAuth />
        </form>
        <div className="flex justify-center mt-3">
          <p className="text-slate-900">Have an account ?</p>
          <u className="ml-1">
            <Link to={"/sign-in"} className="text-blue-700">
              Login
            </Link>
          </u>
        </div>
        {error && <p className="text-red-500 mt-3"> {error} </p>}
      </section>
    </Layout>
  );
};

export default SignUp;
