"use client";
import HomeImgType from "@/type/home";
import { motion } from "framer-motion";
import { UIImageSanity } from "../ui/image/sanity";
import Link from "next/link";
import Grid from "../ui/grid";
import { useState } from "react";
interface HomeDataProps {
  homeData: HomeImgType[];
}

export default function HomeComponent({ homeData }: HomeDataProps) {
  const [hoveredTitleProject, setHoveredTitleProject] = useState<string | null>(
    null
  );
  const imgAnimationVariant = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: { delay: i * 0.2, duration: 1 },
    }),
  };

  return (
    <div className="w-full h-dvh flex items-center justify-center">
      {/* Mobile */}
      <Grid className="tablet:hidden">
        {homeData.map((project: HomeImgType, i: number) => (
          <div
            key={project._id}
            className="col-start-3 col-span-2 place-items-center pb-6 max-w-[120px]"
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
                  alt={`Link vers ${project.title}`}
                />
              </Link>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="pt-2 text-[8px]"
            >
              {project.title}
            </motion.p>
          </div>
        ))}
      </Grid>

      {/* Desktop / laptop and tablet */}
      <div className=" hidden tablet:flex justify-center flex-wrap gap-3 w-full">
        {homeData.map((project: HomeImgType, i: number) => (
          <div key={project._id} className="flex flex-col items-center w-[9%]">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={imgAnimationVariant}
              custom={i}
              onMouseEnter={() => {
                setHoveredTitleProject(project.title);
              }}
              onMouseLeave={() => {
                setHoveredTitleProject(null);
              }}
            >
              <Link href={`/${project.slug.current}`}>
                <UIImageSanity
                  asset={project.thumbnail}
                  alt={`Link vers ${project.title}`}
                />
              </Link>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="pt-2 text-[8px] tablet:flex laptop:hidden"
            >
              {project.title}
            </motion.p>
          </div>
        ))}
      </div>
      <div className="laptop:flex hidden fixed bottom-0 w-full text-[15px] desktop:text-[24px] justify-center pb-8 desktop:pb-10">
        <p>{hoveredTitleProject}</p>
      </div>
    </div>
  );
}
