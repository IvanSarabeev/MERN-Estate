import { FunctionComponent } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { mobileNavigation } from "components/constants";

type MobileProps = {
  isOpen: boolean;
};

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
  closed: {
    opacity: 0,
    y: 20,
  },
};

const MobileNav: FunctionComponent<MobileProps> = ({ isOpen }: MobileProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          aria-hidden="false"
          className="mobile-menu"
        >
          <motion.ul
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            variants={{
              open: {
                clipPath: "inset(0% 0% 0% 0% round 10px)",
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 24,
                  duration: 0.7,
                  delayChildren: 0.8,
                  staggerChildren: 0.15,
                },
              },
              closed: {
                clipPath: "inset(10% 50% 90% 50% round 10px)",
                transition: {
                  type: "spring",
                  bounce: 0,
                  duration: 0.3,
                },
              },
            }}
            className="mobile-nav"
          >
            <ol className="w-full flex flex-col items-center justify-between text-center">
              {mobileNavigation.map((item) => {
                return (
                  <motion.li
                    key={item.id}
                    variants={itemVariants}
                    className="flex flex-col items-center mx-auto mt-0 mb-5"
                  >
                    <Link
                      to={item.link}
                      className="inline-block relative p-2 cursor-pointer hover:text-green"
                    >
                      {item.text}
                    </Link>
                  </motion.li>
                );
              })}
            </ol>
          </motion.ul>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default MobileNav;
