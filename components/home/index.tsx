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
      transition: { delay: 3 + i * 0.3, duration: 1 },
    }),
  };

  return (
    <div className="w-full h-dvh flex items-center justify-center pt-[50px] tablet:pt-0">
      {/* Mobile */}
      <Grid className="tablet:hidden">
        {homeData.map((homeProject: HomeImgType, i: number) => (
          <div
            key={homeProject._id}
            className="col-start-3 col-span-2 flex flex-col items-center pb-2 max-w-[110px]"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={imgAnimationVariant}
              custom={i}
            >
              <Link href={`/${homeProject.slug.current}`}>
                <UIImageSanity
                  asset={homeProject.thumbnail}
                  alt={`Link vers ${homeProject.title}`}
                />
              </Link>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4, duration: 0.5 }}
              className="pt-2 text-[10px]"
            >
              {homeProject.title}
            </motion.p>
          </div>
        ))}
      </Grid>

      {/* Desktop / laptop and tablet */}
      <div className=" hidden tablet:flex justify-center flex-wrap gap-3 w-full">
        {homeData.map((homeProject: HomeImgType, i: number) => (
          <div
            key={homeProject._id}
            className="flex flex-col items-center w-[9%]"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={imgAnimationVariant}
              custom={i}
              onMouseEnter={() => {
                setHoveredTitleProject(homeProject.title);
              }}
              onMouseLeave={() => {
                setHoveredTitleProject(null);
              }}
            >
              <Link href={`/${homeProject.slug.current}`}>
                <UIImageSanity
                  asset={homeProject.thumbnail}
                  alt={`Link vers ${homeProject.title}`}
                />
              </Link>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3, duration: 0.5 }}
              className="pt-2 text-[8px] tablet:flex laptop:hidden"
            >
              {homeProject.title}
            </motion.p>
          </div>
        ))}
      </div>
      <div className="laptop:flex hidden fixed bottom-0 w-full text-[15px] desktop:text-[20px] justify-center pb-[30px] desktop:pb-10">
        <p>{hoveredTitleProject}</p>
      </div>
    </div>
  );
}
