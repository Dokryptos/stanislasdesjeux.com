"use client";

import Grid from "@/components/ui/grid";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "@/public/image/StanDesjeuxLOGO.png";
import BurgerMenu from "@/components/ui/burgerMenu/burgerMenu";

export default function NavbarDefault() {
  const [openMenu, setOpenMenu] = useState(false);
  const [logoSize, setLogoSize] = useState<number>(92);

  useEffect(() => {
    const screenWidth = window.innerWidth;
    const desktop = screenWidth <= 1440;
    setLogoSize(desktop ? 92 : 92);
  }, []);

  if (!logoSize) return null;

  return (
    <nav className="fixed z-30 top-0 tablet:top-[30px] left-0 w-full text-[15px] pt-5 pb-5 bg-white">
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
    </nav>
  );
}
