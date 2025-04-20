"use client";
import FilmType from "@/type/film";
import Link from "next/link";
import { useState, useEffect } from "react";
import ThumbnailGrid from "../ui/image/thumbnailRandomList";
import FilmList from "@/components/ui/list/filmList";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

interface FilmDataProps {
  filmData: FilmType[];
}

export default function FilmComponent({ filmData }: FilmDataProps) {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [isExiting, setIsExiting] = useState(false);
  useEffect(() => {
    if (hoveredProject !== null) {
      setIsExiting(false);
    } else {
      setIsExiting(true);
      const timeout = setTimeout(() => setIsExiting(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [hoveredProject]);

  useEffect(() => {
    const disableRightClick = (e: MouseEvent) => e.preventDefault();
    document.addEventListener("contextmenu", disableRightClick);
    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
    };
  }, []);

  return (
    <div className="relative">
      <div className="absolute flex flex-col justify-center items-center h-dvh w-full z-20 laptop:mix-blend-difference">
        {filmData.map((data: FilmType, i: number) => {
          return (
            <div key={data._id}>
              <Link href={`/films/${data.slug.current}`}>
                <FilmList
                  key={data._id}
                  data={data}
                  index={i}
                  setHoveredProject={setHoveredProject}
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
              thumbnails={filmData[hoveredProject]?.thumbnail}
              projectId={filmData[hoveredProject]?._id}
              isExiting={isExiting}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
