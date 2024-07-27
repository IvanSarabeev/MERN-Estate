import React from "react";
import Button from "components/HTML/Button";
import useToggle from "hooks/useToggle";
import { IoMenu } from "react-icons/io5";
import { HiMiniXMark } from "react-icons/hi2";
import { headerLinks, userNavigation } from "components/constants";
import { Link, NavLink } from "react-router-dom";
import MobileNav from "./MobileNav";
import EstateLogo from "assets/images/estate-logo.png";
import { motion, AnimatePresence } from "framer-motion";
import { scrollTop } from "utils/scrollTop";

const Header: React.FC = () => {
  const [show, setShow] = useToggle();

  return (
    <motion.header
      variants={{ visibility: { y: 0 }, hidden: { y: "-100%" } }}
      onClick={() => scrollTop()}
      className="header-container"
    >
      <nav className="w-full max-container flexBetween padding-container py-3 z-20">
        <div className="relative inline-flex items-center z-10 size-fit ease-in-out transition-all">
          <NavLink to={"/"}>
            <img
              src={EstateLogo}
              alt="logo"
              decoding="async"
              loading="eager"
              className="h-12 w-20 aspect-auto object-cover mr-5"
            />
          </NavLink>
          <menu className="hidden gap-4 md:flex ">
            {headerLinks.map((item) => {
              return (
                <motion.li
                  initial={{ opacity: 0, translateX: -50, translateY: -50 }}
                  animate={{ opacity: 1, translateX: 0, translateY: 0 }}
                  transition={{
                    duration: 0.5,
                    type: "spring",
                    ease: "easeInOut",
                  }}
                  key={item.id}
                >
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      isActive ? "active-link" : "passive-link"
                    }
                  >
                    {item.label}
                  </NavLink>
                </motion.li>
              );
            })}
          </menu>
        </div>
        <div className="hidden md:flex gap-4 items-center justify-end">
          {userNavigation.map((item) => {
            return (
              <Link
                key={item.id}
                to={item.href}
                type="button"
                className={`${item.cssAttribute}`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
        <div className="block md:hidden pr-2.5">
          <Button
            type="button"
            title="Mobile button"
            onClick={() => setShow()}
            className="mobile-btn"
          >
            <span className="sr-only">Hamburger Icon</span>
            {show ? (
              <HiMiniXMark className="size-6 aspect-auto object-cover" />
            ) : (
              <IoMenu className="size-5 aspect-auto object-cover" />
            )}
          </Button>
          <AnimatePresence mode="wait">
            {show ? <MobileNav isOpen={show} /> : ""}
          </AnimatePresence>
        </div>
      </nav>
    </motion.header>
  );
};

export default Header;
