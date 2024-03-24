import { InputHTMLAttributes } from "react";

interface InputProp extends InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ ...restProps }: InputProp) => {
  return (
    <>
      <input {...restProps} />
    </>
  );
};

export default Input;
