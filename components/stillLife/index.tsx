"use client";
import StillLifeType from "@/type/stillLife";
import Link from "next/link";
import { useState, useEffect } from "react";
import ThumbnailGrid from "../ui/grid/thumbnailGrid";
import ProjectList from "../ui/list/projectList";
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
  const [lastHoveredProject, setLastHoveredProject] = useState<number | null>(
    null
  );
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
      setLastHoveredProject(hoveredProject);
      setIsExiting(false);
    } else if (lastHoveredProject !== null) {
      setIsExiting(true);
      setTimeout(() => {
        setLastHoveredProject(null);
        setIsExiting(false);
      }, 500);
    }
  }, [hoveredProject, lastHoveredProject]);

  return (
    <div className="relative">
      <div className="absolute flex flex-col justify-center items-center h-dvh w-full z-20 ">
        {stillLifeData.map((data: StillLifeType, i: number) => {
          return (
            <div key={data._id}>
              <Link href={`/stillLife/${data.slug.current}`}>
                <ProjectList
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.2, transition: { duration: 0.3 } }}
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
