import React from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";

const Captcha: React.FC = () => {
  return <HCaptcha sitekey={`${import.meta.env.VITE_H_CAPTCHA_SITE_KEY}`} />;
};

export default Captcha;
