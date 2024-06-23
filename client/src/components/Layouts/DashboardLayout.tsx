import React from "react";
import { Link } from "react-router-dom";
import {
  //   Activity,
  //   ArrowUpRight,
  //   CircleUser,
  //   CreditCard,
  //   DollarSign,
  //   Menu,
  Package2,
  //   Search,
  //   Users,
} from "lucide-react";
import { internalNavigation } from "../constants";

const DashboardLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            to="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Package2 className="size-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          {internalNavigation.map((item) => {
            return (
              <Link key={item.id} to={item.href}>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>
    </div>
  );
};

export default DashboardLayout;
