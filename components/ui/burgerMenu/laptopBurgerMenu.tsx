"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function LaptopBurgerMenu({
  isHomepage,
  openMenu,
  setOpenMenu,
}: {
  isHomepage: boolean;
  openMenu: boolean;
  setOpenMenu: (val: boolean) => void;
}) {
  return (
    <>
      {isHomepage ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute top-0 tablet:right-[40px] right-5 text-right w-auto cursor-pointer pt-5"
          onMouseEnter={() => setOpenMenu(true)}
          onMouseLeave={() => setOpenMenu(false)}
        >
          <p className="pb-5">Menu</p>
          <motion.div
            initial={{ y: -20, opacity: 0, display: "none" }}
            animate={
              openMenu
                ? { y: 0, opacity: 1, display: "flex" }
                : { y: -20, opacity: 0, display: "none" }
            }
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className={`flex flex-col text-[#CECECE] items-end gap-2 w-auto`}
          >
            <Link
              href="/stillLife"
              className="hover:text-black"
              onClick={() => setOpenMenu(false)}
            >
              Still Life
            </Link>
            <Link
              href="/art"
              className="hover:text-black"
              onClick={() => setOpenMenu(false)}
            >
              Art
            </Link>
            <Link
              href="/films"
              className="hover:text-black"
              onClick={() => setOpenMenu(false)}
            >
              Films
            </Link>
          </motion.div>
        </motion.div>
      ) : (
        <div
          className="absolute top-0 tablet:right-[40px] right-5 text-right w-auto cursor-pointer pt-5"
          onMouseEnter={() => setOpenMenu(true)}
          onMouseLeave={() => setOpenMenu(false)}
        >
          <p className="pb-5">Menu</p>
          <motion.div
            initial={{ y: -20, opacity: 0, display: "none" }}
            animate={
              openMenu
                ? { y: 0, opacity: 1, display: "flex" }
                : { y: -20, opacity: 0, display: "none" }
            }
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className={`flex flex-col text-[#CECECE] items-end gap-2 w-auto`}
          >
            <Link
              href="/stillLife"
              className="hover:text-black"
              onClick={() => setOpenMenu(false)}
            >
              Still Life
            </Link>
            <Link
              href="/art"
              className="hover:text-black"
              onClick={() => setOpenMenu(false)}
            >
              Art
            </Link>
            <Link
              href="/films"
              className="hover:text-black"
              onClick={() => setOpenMenu(false)}
            >
              Films
            </Link>
          </motion.div>
        </div>
      )}
    </>
  );
}
