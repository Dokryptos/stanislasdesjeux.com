"use client";

import { motion } from "framer-motion";
import Grid from "@/components/ui/grid";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "@/public/image/StanDesjeuxLOGO.png";
import { usePathname } from "next/navigation";
import BurgerMenu from "@/components/ui/burgerMenu/burgerMenu";

export default function NavbarAnimation() {
  const [openMenu, setOpenMenu] = useState(false);
  const [logoSize, setLogoSize] = useState<number>(92);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);
  const pathname = usePathname();
  const isAbout = pathname === "/about";

  useEffect(() => {
    const screenWidth = window.innerWidth;
    const desktop = screenWidth <= 1440;
    setLogoSize(desktop ? 92 : 92);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false);
        setOpenMenu(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);
  if (!logoSize) return null;

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={isAbout ? {} : { y: showNavbar ? 0 : "-100%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed z-30 top-0 pt-5 pb-5 tablet:pt-[30px] left-0 w-full text-[15px] bg-white"
    >
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
      <BurgerMenu openMenu={openMenu} setOpenMenu={setOpenMenu} />
    </motion.nav>
  );
}
