import React from "react";
import Header from "components/Navigation/Header";
import Footer from "components/Footer/Footer.tsx";

type LayoutProp = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProp) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
