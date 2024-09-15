import React, { memo } from "react";
import MemoOnboardingLayout from "components/Layouts/OnboardingLayout";
import MemoSideMenu from "./components/SideMenu";

const Onboarding: React.FC = () => {
  return (
    <MemoOnboardingLayout>
      <MemoSideMenu />
    </MemoOnboardingLayout>
  );
};

const MemoOnboarding = memo(Onboarding);

export default MemoOnboarding;
