"use client";

import { motion } from "framer-motion";
import Grid from "@/components/ui/grid";

export default function LayoutNavbar() {
  return (
    <nav className="fixed">
      <Grid>
        <motion.div></motion.div>
      </Grid>
    </nav>
  );
}
