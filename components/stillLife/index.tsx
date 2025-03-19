"use client";
import StillLifeType from "@/type/stillLife";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
interface StillLifeDataProps {
  stillLifeData: StillLifeType[];
}

export default function StillLifeComponent({
  stillLifeData,
}: StillLifeDataProps) {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const listVariantAnimation = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: { delay: i * 0.2, duration: 0.5 },
    }),
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center h-dvh">
        {stillLifeData.map((data: StillLifeType, i: number) => {
          return (
            <motion.div
              key={data._id}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={listVariantAnimation}
              className="flex items-center"
              onMouseEnter={() => setHoveredProject(i)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {hoveredProject === i && (
                <div className="text-[7px] laptop:pr-1 desktop:pr-2">
                  {data?.categorie}
                </div>
              )}
              <Link href={`/stillLife/${data.slug.current}`}>
                <p className="text-[18px] desktop:text-[25px] laptop:text-[#CECECE] laptop:hover:text-black laptop:hover:italic">
                  {data.title}
                </p>
              </Link>
              {hoveredProject === i && (
                <div className="text-[7px] pl-1 desktop:p-2">
                  {data?.gallery && data.gallery.length ? (
                    data.gallery.length <= 10 ? (
                      <>0{data.gallery.length}</>
                    ) : (
                      <>{data.gallery.length}</>
                    )
                  ) : (
                    <>00</>
                  )}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
