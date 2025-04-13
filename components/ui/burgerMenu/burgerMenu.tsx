"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import LaptopBurgerMenu from "./laptopBurgerMenu";
import MobileBurgerMenu from "./mobileBurgerMenu";

export default function BurgerMenu({
  openMenu,
  setOpenMenu,
}: {
  openMenu: boolean;
  setOpenMenu: (val: boolean) => void;
}) {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isHomepage = pathname === "/";

  return (
    <div>
      {isMobile ? (
        <MobileBurgerMenu
          isHomepage={isHomepage}
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
        />
      ) : (
        <LaptopBurgerMenu
          isHomepage={isHomepage}
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
        />
      )}
    </div>
  );
}
