"use client";
import StillLifeType from "@/type/stillLife";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import ThumbnailGrid from "../ui/grid/thumbnailGrid";

interface StillLifeDataProps {
  stillLifeData: StillLifeType[];
}

export default function StillLifeComponent({
  stillLifeData,
}: StillLifeDataProps) {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [isMobileTablet, setIsMobileTablet] = useState(false);
  const listVariantAnimation = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: { delay: i * 0.2, duration: 0.5 },
    }),
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobileTablet(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative">
      <div className="absolute flex flex-col justify-center items-center h-dvh w-full z-20 ">
        {stillLifeData.map((data: StillLifeType, i: number) => {
          return (
            <motion.div
              key={data._id}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={listVariantAnimation}
              className="flex items-center  laptop:hover:text-black"
              onMouseEnter={() => {
                setHoveredProject(i);
              }}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {hoveredProject === i && (
                <div className="text-[10px] laptop:pr-1 z-20 desktop:pr-2 hidden laptop:block">
                  {data?.categorie}
                </div>
              )}
              <Link href={`/stillLife/${data.slug.current}`}>
                <p className="text-[18px] desktop:text-[25px] laptop:text-[#CECECE] z-20 laptop:hover:text-black ">
                  {data.title}
                </p>
              </Link>
              {(hoveredProject === i || isMobileTablet) && (
                <div className="text-[10px] pl-1 z-20 desktop:p-2 font-ppFragment">
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
      <div className="hidden laptop:block fixed top-0 left-0 right-0 bottom-0 z-0">
        {hoveredProject !== null && (
          <ThumbnailGrid
            thumbnails={stillLifeData[hoveredProject]?.thumbnail}
            projectId={stillLifeData[hoveredProject]?._id}
          />
        )}
      </div>
    </div>
  );
}
