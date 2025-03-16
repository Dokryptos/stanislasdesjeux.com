"use client";

import { motion } from "framer-motion";
import Grid from "@/components/ui/grid";
import Link from "next/link";
import { useState } from "react";

export default function LayoutNavbar() {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  return (
    <nav className="fixed top-5 left-0 w-full text-[12px]">
      <Grid className="gap-[12px]">
        <motion.div className="col-start-1 col-span-2 desktop:col-span-1 ">
          <Link href="/">Stan Desjeux</Link>
        </motion.div>
        <motion.div className="col-start-3 desktop:col-start-2 ">
          <Link href="/about">About</Link>
        </motion.div>
        <motion.div
          className="col-start-6 tablet:col-start-9 laptop:col-start-12 justify-self-end"
          onMouseEnter={() => setOpenMenu(true)}
          onMouseLeave={() => setOpenMenu(false)}
        >
          <p className="pb-5 justify-self-end">Menu</p>
          <div
            className={`${openMenu ? "flex" : "hidden"} flex-col text-[#CECECE] justify-self-end items-end gap-2`}
          >
            <Link href="/stillLife" className="hover:text-black">
              Still Life
            </Link>
            <Link href="/art" className="hover:text-black">
              Art
            </Link>
            <Link href="/films" className="hover:text-black">
              Films
            </Link>
          </div>
        </motion.div>
      </Grid>
    </nav>
  );
}
