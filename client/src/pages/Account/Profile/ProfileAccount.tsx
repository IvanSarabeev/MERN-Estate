import React from "react";
import {Label} from "@radix-ui/react-dropdown-menu";
import Input from "components/HTML/Input.tsx";

const ProfileAccount: React.FC = () => {
    return (
        <>
            <div className="pb-6 border-b border-slate-300">
                <h3 className="regular-16 xl:regular-18 font-semibold">Account</h3>
                <p className="regular-14 xl:regular-16 text-[#86868e]">
                    Update your account settings. Set your preferred language and timezone.
                </p>
            </div>
            <form action="" method="post"
                  className="max-w-3xl flex flex-col items-start justify-start space-y-8 mt-4 text-left">
                <div className="w-full space-y-2">
                    <Label
                        className="regular-14 xl:regular-16 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Name
                    </Label>
                    <Input
                        required
                        type="text"
                        name="username"
                        aria-label="username"
                        title="username input"
                        placeholder="Your name"
                        className="h-9 w-full rounded-md indent-2 border border-[#86868e] shadow-sm active:shadow-md bg-transparent disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    <p className="text-[#86868e] regular-12 lg:regular-14">
                        This is the name that will be displayed on your profile and in emails.
                    </p>
                </div>
                <div className="w-full space-y-2">
                    <Label
                        className="regular-14 xl:regular-16 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Date of birth
                    </Label>
                    {/* TODO: Add React/Date-picker */}
                    <p className="regular-12 lg:regular-14 text-[#86868e]">
                        Your date of birth is used to calculate your age.
                    </p>
                </div>
                <div className="w-full space-y-2">
                    <Label
                        className="regular-14 xl:regular-16 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Where you from
                    </Label>
                    {/* TODO: Add select to the different countries */}
                    <Input
                        required
                        type="text"
                        name="country"
                        aria-label="country"
                        title="country input"
                        placeholder="Chose country"
                        className="h-9 w-full rounded-md indent-2 border border-[#86868e] shadow-sm active:shadow-md bg-transparent disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    <p className="regular-12 lg:regular-14 text-[#86868e]">
                        Let other users know where you from.
                    </p>
                </div>
            </form>
        </>
    )
};

export default ProfileAccount;