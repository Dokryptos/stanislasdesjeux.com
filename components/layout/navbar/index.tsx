"use client";

import { motion } from "framer-motion";
import Grid from "@/components/ui/grid";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "@/public/image/StanDesjeuxLOGO.png";

export default function LayoutNavbar() {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [sizeLogoAnimation, setSizeLogoAnimation] = useState<number>(242);
  const [logoSize, setLogoSize] = useState<number>(92);

  useEffect(() => {
    const updateSize = () => {
      setLogoSize(window.innerWidth > 1440 ? 92 : 73);
      setSizeLogoAnimation(window.innerWidth > 1440 ? 424 : 242);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <nav className="fixed top-5 left-0 w-full text-[12px] desktop:text-[15px]">
      <Grid className="gap-[12px]">
        <motion.div
          initial={{ scaleY: 0.3, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <motion.div
            className="col-start-1 col-span-2 desktop:col-span-1 desktop:pt-[4px] pt-[3px] overflow-hidden"
            initial={{ width: sizeLogoAnimation }}
            animate={{ width: logoSize }}
            transition={{ delay: 1, duration: 1, ease: "easeInOut" }}
          >
            <Link href="/">
              <Image src={Logo} alt="Logo Name" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="col-start-3 desktop:col-start-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <Link href="/about">About</Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="col-start-6 tablet:col-start-9 laptop:col-start-12 justify-self-end"
          onMouseEnter={() => setOpenMenu(true)}
          onMouseLeave={() => setOpenMenu(false)}
        >
          <p className="pb-5 justify-self-end">Menu</p>
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={openMenu ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className={`flex flex-col text-[#CECECE] justify-self-end items-end gap-2`}
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
          </motion.div>
        </motion.div>
      </Grid>
    </nav>
  );
}
