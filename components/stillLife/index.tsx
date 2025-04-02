"use client";
import StillLifeType from "@/type/stillLife";
import Link from "next/link";
import { useState, useEffect } from "react";
import ThumbnailGrid from "../ui/image/thumbnailRandomList";
import StillLifeList from "../ui/list/stilLifeList";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

interface StillLifeDataProps {
  stillLifeData: StillLifeType[];
}

export default function StillLifeComponent({
  stillLifeData,
}: StillLifeDataProps) {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [isMobileTablet, setIsMobileTablet] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileTablet(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (hoveredProject !== null) {
      setIsExiting(false);
    } else {
      setIsExiting(true);
      const timeout = setTimeout(() => setIsExiting(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [hoveredProject]);

  return (
    <div className="relative ">
      <div className="absolute flex flex-col justify-center items-center h-dvh w-full z-20 laptop:mix-blend-difference">
        {stillLifeData.map((data: StillLifeType, i: number) => {
          return (
            <div key={data._id}>
              <Link href={`/stillLife/${data.slug.current}`}>
                <StillLifeList
                  key={data._id}
                  data={data}
                  index={i}
                  hoveredProject={hoveredProject}
                  setHoveredProject={setHoveredProject}
                  isMobileTablet={isMobileTablet}
                />
              </Link>
            </div>
          );
        })}
      </div>
      <AnimatePresence>
        {hoveredProject !== null && (
          <motion.div
            className="hidden laptop:block fixed top-0 left-0 right-0 bottom-0 z-0"
            exit={{ opacity: 0, scale: 1.2, transition: { duration: 0.2 } }}
          >
            <ThumbnailGrid
              thumbnails={stillLifeData[hoveredProject]?.thumbnail}
              projectId={stillLifeData[hoveredProject]?._id}
              isExiting={isExiting}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
