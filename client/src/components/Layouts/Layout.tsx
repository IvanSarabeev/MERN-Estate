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
      <main className="h-fit lg:min-h-screen w-full overflow-x-hidden">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
