"use client";
import { usePathname } from "next/navigation";

import NavbarDefault from "./NavbarDefault";
import NavbarHomepage from "./NavbarHomepage";

export default function LayoutNavbar() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  return isHomepage ? <NavbarHomepage /> : <NavbarDefault />;
}
