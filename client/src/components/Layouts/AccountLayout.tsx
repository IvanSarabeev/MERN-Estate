import React from "react";
import {Link, Outlet} from "react-router-dom";
import {
    CircleUser,
    Menu,
    Package2,
    Search
} from "lucide-react";
import { internalNavigation } from "../constants";
import {Sheet, SheetContent, SheetTrigger} from "components/ui/sheet.tsx";
import {Button} from "components/ui/button.tsx";
import Input from "components/HTML/Input.tsx";
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuTrigger
} from "components/ui/dropdown-menu.tsx";
import Footer from "components/Footer/Footer.tsx";


const AccountLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav
            className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
              to="#"
              className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Package2 className="size-6"/>
            <span className="sr-only">Acme Inc</span>
          </Link>
          {internalNavigation.map((item) => {
            return (
                <Link key={item.id} to={item.href}>
                  {item.label}
                </Link>
            );
          })}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                <Menu className="size-5"/>
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 regular-18">
                <Link to="#" className="flex items-center gap-2 regular-18">
                  <Package2 className="size-6"/>
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
            </SheetContent>
          </Sheet>
        </nav>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground"/>
              <Input
                  type="search"
                  placeholder="Search products..."
                  className="py-1.5 px-2 rounded-md ml-2 outline-2 outline-gray-500 pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="size-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
);
};

export default AccountLayout;
