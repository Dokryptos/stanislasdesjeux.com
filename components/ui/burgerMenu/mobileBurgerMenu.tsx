"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

export default function MobileBurgerMenu({
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
          onClick={() => setOpenMenu(!openMenu)}
        >
          <p className="pb-5">Menu</p>
        </motion.div>
      ) : (
        <div
          className="absolute top-0 tablet:right-[40px] right-5 text-right w-auto cursor-pointer pt-5"
          onClick={() => setOpenMenu(!openMenu)}
        >
          <p className="pb-5">Menu</p>
        </div>
      )}
      <AnimatePresence>
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={
            openMenu
              ? { height: "auto", opacity: 1 }
              : { height: 0, opacity: 0 }
          }
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className={`overflow-hidden absolute top-12 right-0 tablet:right-5 flex flex-col text-black items-end gap-2  w-dvw bg-white z-20 pr-5 pb-5 pt-5`}
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
      </AnimatePresence>
    </>
  );
}
