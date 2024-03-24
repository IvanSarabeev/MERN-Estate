import React, { ButtonHTMLAttributes } from "react";

type ButtonProp = {
  children: React.ReactNode;
};

type ButtonEventProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, ...restProps }: ButtonProp & ButtonEventProps) => {
  return <button {...restProps}>{children}</button>;
};

export default Button;
