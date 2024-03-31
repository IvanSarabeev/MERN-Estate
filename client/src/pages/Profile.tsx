import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import Input from "components/HTML/Input";
import Button from "components/HTML/Button";
import { FaRegUserCircle } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { IoLockOpenOutline } from "react-icons/io5";

const Profile = () => {
  const { avatar } = useSelector((state: RootState) => state.user.currentUser)!;

  return (
    <section className="padding-container">
      <h1 className="text-3xl font-semibold text-center my-7 sm:text-5xl">
        Profile
      </h1>
      <form
        action=""
        method="post"
        className="gap-1 sm:gap-2 lg-gap-4 flex flex-col max-w-xl mx-auto"
      >
        <img
          src={avatar}
          alt=""
          className="size-24 self-center rounded-full mb-4 aspect-auto object-cover transition-all ease-in-out hover:scale-110 hover:cursor-pointer"
        />
        <div className="flex">
          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            <FaRegUserCircle height={16} width={16} />
            <span className="sr-only">User Icon</span>
          </span>
          <Input
            type="text"
            required
            id="username"
            name="username"
            title="Username Input"
            placeholder="Enter your username"
            className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="flex">
          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            <HiOutlineMail height={16} width={16} />
            <span className="sr-only">Email Icon</span>
          </span>
          <Input
            type="email"
            required
            id="email"
            name="email"
            title="Email Input"
            placeholder="Enter your email address"
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
            title="Password Input"
            placeholder="Enter your password"
            className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <Button
          title="Update button"
          type="submit"
          className="text-white rounded-lg p-3 uppercase bg-slate-700 transition-all ease-in-out hover:scale-110 hover:opacity-95 disabled:opacity-80"
        >
          Update
        </Button>
        <div className="flex items-center justify-between mt-5">
          <span className="text-slate-900 cursor-pointer">Delete Account</span>
          <span className="text-red-700 cursor-pointer">Logout</span>
        </div>
      </form>
    </section>
  );
};

export default Profile;
