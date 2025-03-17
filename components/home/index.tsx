"use client";
import HomeImgType from "@/type/home";
import { motion } from "framer-motion";
import { UIImageSanity } from "../ui/image/sanity";
import Link from "next/link";
import Grid from "../ui/grid";
interface HomeDataProps {
  homeData: HomeImgType[];
}

export default function homeComponent({ homeData }: HomeDataProps) {
  const imgAnimationVariant = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: { delay: i * 0.2, duration: 1 },
    }),
  };

  return (
    <div className="w-full h-dvh flex items-center">
      <Grid className="gap-6">
        {homeData.map((project: HomeImgType, i: number) => (
          <div
            key={project._id}
            className="col-start-3 col-span-2 place-items-center"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={imgAnimationVariant}
              custom={i}
            >
              <Link href={`/${project.slug.current}`}>
                <UIImageSanity
                  asset={project.thumbnail}
                  className=""
                  alt={`Link vers ${project.title}`}
                />
              </Link>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="pt-2"
            >
              {project.title}
            </motion.p>
          </div>
        ))}
      </Grid>
    </div>
  );
}
