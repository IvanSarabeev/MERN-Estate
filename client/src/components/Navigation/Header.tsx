import { useEffect, useState } from "react";
import Button from "components/HTML/Button";
import Input from "components/HTML/Input";
import useToggle from "hooks/useToggle";
import { IoMenu } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { HiMiniXMark } from "react-icons/hi2";
import { headerLinks, userNavigation, userProfile } from "components/constants";
import { NavLink, useNavigate } from "react-router-dom";
import MobileNav from "./MobileNav";
import { motion, AnimatePresence } from "framer-motion";
import { scrollTop } from "utils/scrollTop";
import { store } from "store/store";

const Header = () => {
  const [show, setShow] = useToggle();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { currentUser } = store.getState().user;

  const navigate = useNavigate();

  const handleInputSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);

    urlParams.set("searchTerm", searchTerm);

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParam = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParam.get("searchTerm");

    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, []);

  return (
    <motion.header
      variants={{ visibility: { y: 0 }, hidden: { y: "-100%" } }}
      onClick={() => scrollTop()}
      className="fixed top-0 h-fit w-full z-50 bg-slate-200 shadow-md transition-all"
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
          onSubmit={handleSubmit}
          className="hidden md:flex items-center p-3 rounded-lg bg-slate-100"
        >
          <Input
            type="text"
            placeholder="Search..."
            aria-label="Search input"
            value={searchTerm}
            onChange={handleInputSearch}
            className="bg-transparent focus:outline-none w-20 md:w-64 lg:w-72 xl:w-80 xxl:w-96"
          />
          <Button>
            <FaSearch className="text-slate-500" />
          </Button>
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
          {currentUser
            ? userProfile.map((item) => {
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
                    <NavLink to={item.href} aria-label={"Profile"}>
                      <img
                        src={currentUser?.avatar}
                        alt={item.label}
                        className="size-7 rounded-full object-cover aspect-auto"
                      />
                    </NavLink>
                  </motion.li>
                );
              })
            : userNavigation.map((item) => {
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
                      type="button"
                      className={`${item.cssAttribute}`}
                    >
                      {item.label}
                    </NavLink>
                  </motion.li>
                );
              })}
        </menu>
        <AnimatePresence mode="wait">
          {show ? <MobileNav isOpen={show} /> : ""}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;
