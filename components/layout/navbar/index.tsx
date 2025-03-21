"use client";

import { motion } from "framer-motion";
import Grid from "@/components/ui/grid";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "@/public/image/StanDesjeuxLOGO.png";

export default function LayoutNavbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [logoSize, setLogoSize] = useState<{
    normal: number;
    animated: number;
  } | null>(null);

  useEffect(() => {
    const screenWidth = window.innerWidth;
    const mobile = screenWidth <= 1024;
    const desktop = screenWidth <= 1440;
    setIsMobile(mobile);
    setLogoSize(
      desktop ? { normal: 92, animated: 242 } : { normal: 92, animated: 424 }
    );
  }, []);

  if (!logoSize) return null;

  return (
    <nav className="fixed z-30 top-5 left-0 w-full text-[15px]">
      <Grid className="gap-[12px]">
        <motion.div
          initial={{ scaleY: 0.3, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <motion.div
            className="col-start-1 col-span-2 desktop:col-span-1 pt-[4px] overflow-hidden"
            initial={{ width: logoSize.animated }}
            animate={{ width: logoSize.normal }}
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
          className="col-start-6 tablet:col-start-9 laptop:col-start-12 col-span-2 border-x-yellow-100"
          onMouseEnter={!isMobile ? () => setOpenMenu(true) : undefined}
          onMouseLeave={!isMobile ? () => setOpenMenu(false) : undefined}
          onClick={isMobile ? () => setOpenMenu(!openMenu) : undefined}
        >
          <p className="pb-5 text-right w-auto bg-orange-600">Menu</p>
          <motion.div
            initial={{ y: -20, opacity: 0, display: "none" }}
            animate={
              openMenu
                ? { y: 0, opacity: 1, display: "flex" }
                : { y: -20, opacity: 0, display: "none" }
            }
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className={`flex flex-col text-[#CECECE] items-end gap-2 w-auto bg-teal-600`}
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
