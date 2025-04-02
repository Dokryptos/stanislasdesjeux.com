"use client";
import { usePathname } from "next/navigation";

import NavbarDefault from "./NavbarDefault";
import NavbarHomepage from "./NavbarHomepage";
import NavbarAnimation from "./NavbarAnimation";

export default function LayoutNavbar() {
  const pathname = usePathname();
  if (pathname === "/") return <NavbarHomepage />;
  if (pathname.startsWith("/art") || pathname === "/about")
    return <NavbarAnimation />;

  return <NavbarDefault />;
}
