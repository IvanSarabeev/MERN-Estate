import React from "react";
import Input from "components/HTML/Input.tsx";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Textarea } from "components/ui/textarea";
import Button from "components/HTML/Button";

const Settings: React.FC = () => {
  return (
    <>
      <div className="pb-6 border-b border-slate-300">
        <h3 className="regular-16 xl:regular-18 font-semibold">Profile</h3>
        <p className="regular-14 xl:regular-16 text-[#86868e]">
          This is how others will see you on the site.
        </p>
      </div>
      {/* TODO: Update the Data Model (User), to accept username and description */}
      {/* TODO: Create an service in node.js for updating the user profile */}
      {/* TODO: Add input validation and data sanitaztion, updated the data in the Database*/}
      <form
        method="post"
        className="max-w-3xl flex flex-col items-start justify-start space-y-8 mt-4 text-left"
      >
        <div className="w-full space-y-2">
          <Label className="regular-14 xl:regular-16 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Username
          </Label>
          <Input
            required
            type="text"
            name="username"
            aria-label="username"
            title="username input"
            placeholder="Ivan Sarabeev"
            className="h-9 w-full rounded-md indent-2 border border-[#86868e] shadow-sm active:shadow-md bg-transparent disabled:cursor-not-allowed disabled:opacity-50"
          />
          <p className="text-[#86868e] regular-12 lg:regular-14">
            This is your public display name. It can be your real name or a
            pseudonym. You can only change this once every 30 days.
          </p>
        </div>
        <div className="w-full space-y-2">
          <Label className="regular-14 xl:regular-16 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Email
          </Label>
          <Input
            required
            type="email"
            name="email"
            aria-label="email"
            title="email input"
            placeholder="youremail@address.com"
            className="w-full h-9 rounded-md indent-2 border border-[#86868e] bg-transparent disabled:cursor-not-allowed disabled:opacity-50"
          />
          <p className="text-[#86868e] regular-12 lg:regular-14">
            You can manage verified email addresses in your email settings.
          </p>
        </div>
        <div className="w-full space-y-2">
          <Label className="regular-14 xl:regular-16 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Bio
          </Label>
          <Textarea
            required
            name="description"
            aria-label="description"
            aria-invalid="false"
            title="description textarea"
            placeholder="Tell us a little bit about yourself"
            className="flex min-h-14 w-full rounded-md border border-[#86868e] bg-transparent disabled:cursor-not-allowed disabled:opacity-50"
          />
          <p className="text-[#86868e] regular-12 lg:regular-14">
            You can manage verified email addresses in your email settings.
          </p>
        </div>
        <Button
          type="submit"
          title="Update profile"
          aria-label="update profile"
          className="inline-flex items-center justify-center whitespace-nowrap text-slate-100 font-medium rounded-md shadow-sm px-4 py-2 bg-black transition-all ease-in-out hover:shadow-md hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Update profile
        </Button>
      </form>
    </>
  );
};

export default Settings;
