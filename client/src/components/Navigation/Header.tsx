import { useState } from "react";
import Button from "components/HTML/Button";
import Input from "components/HTML/Input";
import useToggle from "hooks/useToggle";
import { IoMenu } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { HiMiniXMark } from "react-icons/hi2";
import { headerLinks, userNavigation, userProfile } from "components/constants";
import { NavLink } from "react-router-dom";
import MobileNav from "./MobileNav";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { scrollTop } from "utils/scrollTop";
import { store } from "store/store";

const Header = () => {
  const { scrollY } = useScroll();

  const [show, setShow] = useToggle();
  const [hidden, setHidden] = useState<boolean>(false);
  const { currentUser } = store.getState().user;
  console.log(currentUser);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();

    if (latest > previous) {
      setHidden(true);
    } else setHidden(false);
  });

  return (
    <motion.header
      variants={{ visibility: { y: 0 }, hidden: { y: "-100%" } }}
      animate={hidden ? "block" : "visible"}
      onClick={() => scrollTop()}
      className="sticky top-0 h-fit w-full bg-slate-200 shadow-md transition-all"
    >
      <nav className="max-container flexBetween padding-container py-3">
        <NavLink to={"/"}>
          <h2 className="flex flex-wrap font-bold text-sm sm:text-lg md:text-2xl lg:text-3xl">
            <span className="text-slate-500">MERN</span>
            <span className="text-slate-700">Estate</span>
          </h2>
        </NavLink>
        <form
          action=""
          method="get"
          className="hidden md:flex items-center p-3 rounded-lg bg-slate-100"
        >
          <Input
            type="text"
            placeholder="Search..."
            aria-label="Search input"
            className="bg-transparent focus:outline-none w-20 md:w-64 lg:w-72 xl:w-80 xxl:w-96"
          />
          <FaSearch className="text-slate-500" />
        </form>
        <Button
          type="button"
          onClick={() => setShow()}
          className="flex md:hidden p-1 rounded transition-all ease-in-out"
        >
          <span className="sr-only">Hamburger Icon</span>
          {show ? (
            <HiMiniXMark height={24} width={24} />
          ) : (
            <IoMenu height={24} width={24} />
          )}
        </Button>
        <menu className=" hidden gap-4 md:flex ">
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
          {currentUser ? (
            <motion.li
              initial={{ opacity: 0, translateX: -50, translateY: -50 }}
              animate={{ opacity: 1, translateX: 0, translateY: 0 }}
              transition={{
                duration: 0.5,
                type: "spring",
                ease: "easeInOut",
              }}
            >
              {userProfile.map((item) => {
                return (
                  <NavLink key={item.id} to={item.href}>
                    <span className="sr-only">User Profile Image</span>
                    {currentUser && (
                      <img
                        src={currentUser?.avatar}
                        alt={`${item.label}`}
                        className="size-7 rounded-full object-cover aspect-auto transition-all ease-in-out hover:scale-110"
                      />
                    )}
                  </NavLink>
                );
              })}
            </motion.li>
          ) : (
            <motion.li
              initial={{ opacity: 0, translateX: -50, translateY: -50 }}
              animate={{ opacity: 1, translateX: 0, translateY: 0 }}
              transition={{
                duration: 0.5,
                type: "spring",
                ease: "easeInOut",
              }}
            >
              {userNavigation.map((item) => {
                return (
                  <NavLink
                    key={item.id}
                    to={item.href}
                    className={({ isActive }) =>
                      isActive ? "active-link" : "passive-link"
                    }
                  >
                    {item.label}
                  </NavLink>
                );
              })}
            </motion.li>
          )}
        </menu>
        <AnimatePresence mode="wait">
          {show ? <MobileNav /> : hidden}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;
