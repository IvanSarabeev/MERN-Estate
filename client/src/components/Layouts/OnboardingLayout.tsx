import React, { memo } from "react";
import Header from "../Navigation/Header";

type OnboardingLayoutTypes = {
  children: React.ReactNode;
};

const OnboardingLayout: React.FC<OnboardingLayoutTypes> = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

const MemoOnboardingLayout = memo(OnboardingLayout);

export default MemoOnboardingLayout;
