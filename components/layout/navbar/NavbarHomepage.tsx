"use client";

import { motion } from "framer-motion";
import Grid from "@/components/ui/grid";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "@/public/image/StanDesjeuxLOGO.png";
import BurgerMenu from "@/components/ui/burgerMenu/burgerMenu";

export default function NavbarHomepage() {
  const [openMenu, setOpenMenu] = useState(false);
  const [topDivLogo, setTopDivLogo] = useState<number>(64);
  const [widthDivLogo, setWidthDivLogo] = useState<number>(250);
  const [logoSize, setLogoSize] = useState<{
    normal: number;
    animated: number;
  } | null>(null);

  useEffect(() => {
    const screenWidth = window.innerWidth;
    const desktop = screenWidth <= 1440;
    setLogoSize(
      desktop ? { normal: 92, animated: 242 } : { normal: 92, animated: 424 }
    );
    setTopDivLogo(desktop ? 64 : 80);
    setWidthDivLogo(desktop ? 250 : 450);
  }, []);

  if (!logoSize || !widthDivLogo || !topDivLogo) return null;

  return (
    <nav className="fixed z-30 top-0 tablet:top-[30px] left-0 w-full text-[15px] bg-white pt-5 pb-5">
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
      <BurgerMenu openMenu={openMenu} setOpenMenu={setOpenMenu} />
    </nav>
  );
}
