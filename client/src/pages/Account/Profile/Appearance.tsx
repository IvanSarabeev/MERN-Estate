import React from "react";
import {Label} from "@radix-ui/react-dropdown-menu";
import Input from "components/HTML/Input.tsx";
import Button from "components/HTML/Button.tsx";

const Appearance: React.FC = () => {
    return (
        <>
            <div className="pb-6 border-b border-slate-300">
                <h3 className="regular-16 xl:regular-18 font-semibold">Appearance</h3>
                <p className="regular-14 xl:regular-16 text-[#86868e]">
                    Customize the appearance of the app. Automatically switch between day and night themes.
                </p>
            </div>
            <form action="" method="post" className="max-w-3xl flex flex-col items-start justify-start space-y-8 mt-4 text-left">
                <div className="w-full space-y-2">
                    <Label
                        className="regular-14 xl:regular-16 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Font
                    </Label>
                    {/* TODO: Add Select to chose font*/}
                    <p className="text-[#86868e] regular-12 lg:regular-14">
                        Set the font you want to use in the dashboard.
                    </p>
                </div>
                <div className="w-full space-y-2">
                    <Label
                        className="regular-14 xl:regular-16 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Theme
                    </Label>
                    <p className="text-[#86868e] regular-12 lg:regular-14">
                        Select the theme for the dashboard.
                    </p>
                    {/* TODO: Add the Light / Dark Theme */}
                    <Input
                        required
                        type="text"
                        name="username"
                        aria-label="username"
                        title="username input"
                        placeholder="Ivan Sarabeev"
                        className="h-9 w-full rounded-md indent-2 border border-[#86868e] shadow-sm active:shadow-md bg-transparent disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>
                <Button
                    type="submit"
                    title="Update profile appearance"
                    aria-label="update appearance"
                    className="inline-flex items-center justify-center whitespace-nowrap text-slate-100 font-medium rounded-md shadow-sm px-4 py-2 bg-black transition-all ease-in-out hover:shadow-md hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Update profile
                </Button>
            </form>
        </>
    )
};

export default Appearance;