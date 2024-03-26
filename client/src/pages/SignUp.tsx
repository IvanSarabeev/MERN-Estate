import Layout from "components/Layouts/Layout";
import Input from "components/HTML/Input";
import Button from "components/HTML/Button";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <Layout>
      <section className="padding-container max-w-xl mx-auto">
        <h2 className="text-center text-3xl font-semibold my-7">
          Sign Up Page
        </h2>
        <form action="" className="gap-4 flex flex-col">
          <Input
            id="username"
            type="text"
            placeholder="Username"
            className="border p-3 rounded-lg"
            required
          />
          <Input
            id="email"
            type="email"
            placeholder="Email"
            className="border p-3 rounded-lg"
            required
          />
          <Input
            id="password"
            type="password"
            placeholder="Password"
            className="border p-3 rounded-lg"
            required
          />
          <Input
            id="re-password"
            type="password"
            placeholder="Re-password"
            className="border p-3 rounded-lg"
            required
          />
          <Button
            type="submit"
            className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80"
          >
            Sign up
          </Button>
        </form>
        <div className="flex justify-center mt-3">
          <p className="text-slate-900">Have an account ?</p>
          <u className="ml-1">
            <Link to={"/sign-in"} className="text-blue-700">
              Login
            </Link>
          </u>
        </div>
      </section>
    </Layout>
  );
};

export default SignUp;
