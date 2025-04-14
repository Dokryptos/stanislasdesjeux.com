"use client";

import { motion } from "framer-motion";
import Grid from "@/components/ui/grid";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "@/public/image/StanDesjeuxLOGO.png";

export default function NavbarHomepage() {
  const [openMenu, setOpenMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [topDivLogo, setTopDivLogo] = useState<number>(64);
  const [widthDivLogo, setWidthDivLogo] = useState<number>(250);
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
    setTopDivLogo(desktop ? 64 : 80);
    setWidthDivLogo(desktop ? 250 : 450);
  }, []);

  if (!logoSize || !widthDivLogo || !topDivLogo) return null;

  return (
    <nav className="fixed z-30 top-5 tablet:top-[30px] left-0 w-full text-[15px]">
      <Grid className="gap-[12px]">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="relative"
          >
            <motion.div
              className="col-start-1 col-span-2 desktop:col-span-1 pt-[4px]"
              initial={{ width: logoSize.animated }}
              animate={{ width: logoSize.normal }}
              transition={{
                delay: 1,
                duration: 0.8,
                ease: [0.41, 0.01, 0.2, 1],
              }}
            >
              <Link href="/">
                <Image src={Logo} alt="Logo Name" priority />
              </Link>
            </motion.div>
          </motion.div>
        </div>
        <motion.div
          className="col-start-3 desktop:col-start-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <Link href="/about">About</Link>
        </motion.div>
      </Grid>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
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
    </nav>
  );
}
