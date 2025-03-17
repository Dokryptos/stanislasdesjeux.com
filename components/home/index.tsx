"use client";
import Grid from "../ui/grid";
import HomeImgType from "@/type/home";
import { motion } from "framer-motion";
import { UIImageSanity } from "../ui/image/sanity";
import Link from "next/link";
interface HomeDataProps {
  homeData: HomeImgType[];
}

export default function homeComponent({ homeData }: HomeDataProps) {
  return (
    <div>
      <Grid>
        {homeData.map((project: HomeImgType) => (
          <motion.div key={project._id}>
            <Link href={`/${project.title}`}>
              <UIImageSanity
                asset={project.thumbnail}
                className=""
                alt={`Link vers ${project.title}`}
              />
            </Link>
            <p>project.title</p>
          </motion.div>
        ))}
      </Grid>
    </div>
  );
}
