import React from "react";

const onboardingMenu = [
  { id: 1, title: "Personal Info" },
  { id: 2, title: "Account Info" },
  { id: 3, title: "Confirmation" },
] as const;

const EnrollMenu: React.FC = () => {
  return (
    <ol className="flexCenter text-slate-600 regular-16 lg:regular-18 mb-6 md:mb-8 lg:mb-10 xl:mb-12">
      {onboardingMenu.map((item) => {
        return (
          <li key={item.id}>
            <div>{item.title}</div>
          </li>
        );
      })}
    </ol>
  );
};

export default EnrollMenu;
