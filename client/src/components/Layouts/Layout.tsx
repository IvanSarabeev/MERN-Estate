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
      <main className="min-h-screen w-full overflow-x-auto">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
