"use client";
import ArtType from "@/type/art";
import Link from "next/link";
import { useState, useEffect } from "react";
import ThumbnailGrid from "../ui/grid/thumbnailGrid";
import ArtList from "@/components/ui/list/artList";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

interface ArtDataProps {
  artData: ArtType[];
}

export default function ArtComponent({ artData }: ArtDataProps) {
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
    <div className="relative">
      <div className="absolute flex flex-col justify-center items-center h-dvh w-full z-20 ">
        {artData.map((data: ArtType, i: number) => {
          return (
            <div key={data._id}>
              <Link href={`/art/${data.slug.current}`}>
                <ArtList
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
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2, transition: { duration: 0.3 } }}
          >
            <ThumbnailGrid
              thumbnails={artData[hoveredProject]?.thumbnail}
              projectId={artData[hoveredProject]?._id}
              isExiting={isExiting}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
