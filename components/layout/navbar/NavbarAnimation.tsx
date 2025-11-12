"use client";

import { motion } from "framer-motion";
import Grid from "@/components/ui/grid";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "@/public/image/StanDesjeuxLOGO.png";
import { usePathname } from "next/navigation";

export default function NavbarAnimation() {
  const [openMenu, setOpenMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [logoSize, setLogoSize] = useState<number>(92);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);
  const pathname = usePathname();
  const isAbout = pathname === "/about";

  useEffect(() => {
    const screenWidth = window.innerWidth;
    const mobile = screenWidth <= 1024;
    const desktop = screenWidth <= 1440;
    setIsMobile(mobile);
    setLogoSize(desktop ? 92 : 92);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false);
        setOpenMenu(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);
  if (!logoSize) return null;

  return (
    <>
      <motion.nav
        initial={{ y: 0 }}
        animate={isAbout ? {} : { y: showNavbar ? 0 : "-100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed z-30 top-0 pt-5 pb-5 tablet:pt-[30px] left-0 w-full text-[15px] bg-white"
      >
        <Grid className="gap-[12px]">
          <div
            className="col-start-1 col-span-2 desktop:col-span-1 pt-[6px] tablet:pt-[4px]"
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
          className="absolute top-0 right-0 pt-5 pr-5 tablet:pr-10 tablet:pt-[30px]  text-right w-auto cursor-pointer"
          onMouseEnter={!isMobile ? () => setOpenMenu(true) : undefined}
          onMouseLeave={!isMobile ? () => setOpenMenu(false) : undefined}
          onClick={isMobile ? () => setOpenMenu(!openMenu) : undefined}
        >
          <p className="pb-5 text-black">Menu</p>
        </div>
      </motion.nav>
      <motion.div
        initial={{ y: -20, opacity: 0, display: "none" }}
        animate={
          openMenu
            ? { y: 0, opacity: 1, display: "flex" }
            : { y: -20, opacity: 0, display: "none" }
        }
        transition={{ duration: 0.2, ease: "easeInOut" }}
        onMouseEnter={!isMobile ? () => setOpenMenu(true) : undefined}
        onMouseLeave={!isMobile ? () => setOpenMenu(false) : undefined}
        className={`fixed top-0 right-0 mt-[70px] pr-5 tablet:pr-[40px] flex flex-col text-white items-end gap-2 w-auto mix-blend-difference z-30 bg-black`}
      >
        <Link
          href="/art"
          className="hover:italic"
          onClick={() => setOpenMenu(false)}
        >
          Art
        </Link>
        <Link
          href="/stillLife"
          className="hover:italic"
          onClick={() => setOpenMenu(false)}
        >
          Still Life
        </Link>
        <Link
          href="/films"
          className="hover:italic"
          onClick={() => setOpenMenu(false)}
        >
          Films
        </Link>
      </motion.div>
    </>
  );
}
