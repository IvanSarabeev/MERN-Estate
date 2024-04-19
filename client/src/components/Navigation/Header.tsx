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
import Logo from "assets/images/logo.png";
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
      className="header-container"
    >
      <nav className="w-full max-container flexBetween padding-container py-3 z-20">
        <div className="relative z-10 size-fit ease-in-out transition-all">
          <NavLink to={"/"}>
            <img src={Logo} alt="logo" className="h-14 w-32 aspect-auto" />
          </NavLink>
        </div>
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
                    <NavLink
                      to={item.href}
                      aria-label={"Profile"}
                      className="relative group"
                    >
                      <img
                        src={currentUser?.avatar}
                        alt={item.label}
                        id="tooltip-bottom"
                        className="avatar-img"
                        data-tooltip-placement="bottom"
                      />
                      <div
                        id="tooltip-bottom"
                        className="hidden absolute group-hover:block"
                      >
                        {currentUser?.username}
                      </div>
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
        <div className="block md:hidden pr-2.5">
          <Button
            type="button"
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
