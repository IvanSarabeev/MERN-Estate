import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Button from "components/HTML/Button.tsx";

const ProfileLayout: React.FC = () => {
  const location = useLocation();

  const asideNavigation = [
    { id: 1, title: "Profile", href: "/account/profiles" },
    { id: 2, title: "Account", href: "profile-account" },
    { id: 3, title: "Appearance", href: "appearance" },
    { id: 4, title: "Notifications", href: "/notifications" },
  ];

  return (
    <>
      <header className="pb-6 border-b border-slate-200 bg-white">
        <h2 className="bold-20 xl:bold-24 font-bold">Settings</h2>
        <p className="regular-16 xl:regular-18 font-normal mt-2 text-slate-600">
          Manage your account settings and set e-mail preferences.
        </p>
      </header>
      <div className="gap-y-6 md:gap-x-6 flex flex-col md:flex-row">
        <aside className="md:min-w-64 gap-x-4 md:gap-x-8 flex flex-row flex-wrap md:flex-col justify-around md:justify-start">
          {asideNavigation.map((item) => {
            return (
              <Link
                  key={item.id}
                  to={item.href}
                  title={item.title}
                  aria-label={item.title}
                  className="w-full h-fit"
              >
                <Button
                  type="button"
                  aria-label={item.title}
                  title={item.title}
                  className={`w-fit lg:w-64 regular-14 xl:regular-16 py-1.5 px-3 text-left font-medium text-slate-900 rounded-md cursor-pointer hover:bg-[#f4f4f5] hover:font-semibold transition-all ease-in-out duration-150 
                      ${
                        location.pathname === item.href
                          ? "font-semibold bg-[#f4f4f5]"
                          : "bg-transparent"
                      }`}
                >
                    {item.title}
                </Button>
              </Link>
            );
          })}
        </aside>
        <main className="max-w-4xl flex flex-col justify-start md:justify-center">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default ProfileLayout;
