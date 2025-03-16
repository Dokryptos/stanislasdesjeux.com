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
        <motion.div className="col-start-6 tablet:col-start-9 desktop:col-start-12">
          <p>Menu</p>
          <div>
            <Link href="/stillLife">Still Life</Link>
            <Link href="/art">Art</Link>
            <Link href="/films">Films</Link>
          </div>
        </motion.div>
      </Grid>
    </nav>
  );
}
