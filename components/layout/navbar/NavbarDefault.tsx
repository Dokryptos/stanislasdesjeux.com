"use client";

import { motion } from "framer-motion";
import Grid from "@/components/ui/grid";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "@/public/image/StanDesjeuxLOGO.png";

export default function NavbarDefault() {
  const [openMenu, setOpenMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [logoSize, setLogoSize] = useState<number>(92);

  useEffect(() => {
    const screenWidth = window.innerWidth;
    const mobile = screenWidth <= 1024;
    const desktop = screenWidth <= 1440;
    setIsMobile(mobile);
    setLogoSize(desktop ? 92 : 92);
  }, []);

  if (!logoSize) return null;

  return (
    <nav className="fixed z-30 top-5 tablet:top-[30px] left-0 w-full text-[15px]">
      <Grid className="gap-[12px]">
        <div
          className="col-start-1 col-span-2 desktop:col-span-1 pt-[4px]"
          style={{ width: `${logoSize}px` }}
        >
          <Link href="/">
            <Image src={Logo} alt="Logo Name" />
          </Link>
        </div>
        <div className="col-start-3 desktop:col-start-2">
          <Link href="/about">About</Link>
        </div>
      </Grid>
      <div
        className="absolute top-0 tablet:right-[40px] right-5 text-right w-auto cursor-pointer"
        onMouseEnter={!isMobile ? () => setOpenMenu(true) : undefined}
        onMouseLeave={!isMobile ? () => setOpenMenu(false) : undefined}
        onClick={isMobile ? () => setOpenMenu(!openMenu) : undefined}
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
          className={`flex flex-col text-[#CECECE] items-end gap-2 w-dvw bg-white pb-5 laptop:w-auto laptop:pb-0 laptop:bg-transparent`}
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
      </div>
    </nav>
  );
}
