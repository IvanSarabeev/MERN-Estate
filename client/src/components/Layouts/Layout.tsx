import React from "react";
import Header from "components/Navigation/Header";

type LayoutProp = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProp) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default Layout;
