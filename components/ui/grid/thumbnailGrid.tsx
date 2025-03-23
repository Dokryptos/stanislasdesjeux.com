"use client";
import { motion } from "framer-motion";
import { UIImageSanity } from "../image/sanity";
import { SanityImage } from "@/type/stillLife";
import { useState, useEffect } from "react";

interface StillLifeThumbnailGridProps {
  thumbnails: SanityImage[];
  projectId: string;
}

export default function ThumbnailGrid({
  thumbnails,
  projectId,
}: StillLifeThumbnailGridProps) {
  const [positions, setPositions] = useState<
    { row: number; col: number; height: number }[]
  >([]);

  const layouts = [
    [
      { row: 1, col: 2, height: 300 },
      { row: 2, col: 4, height: 220 },
      { row: 4, col: 3, height: 150 },
    ],
    [
      { row: 2, col: 1, height: 300 },
      { row: 3, col: 3, height: 300 },
      { row: 4, col: 5, height: 300 },
    ],
    [
      { row: 1, col: 4, height: 300 },
      { row: 3, col: 2, height: 300 },
      { row: 4, col: 1, height: 300 },
    ],
    [
      { row: 2, col: 3, height: 300 },
      { row: 3, col: 5, height: 300 },
      { row: 4, col: 2, height: 300 },
    ],
    [
      { row: 1, col: 1, height: 300 },
      { row: 2, col: 5, height: 300 },
      { row: 3, col: 4, height: 300 },
    ],
    [
      { row: 1, col: 3, height: 300 },
      { row: 3, col: 1, height: 300 },
      { row: 4, col: 5, height: 300 },
    ],
    [
      { row: 2, col: 2, height: 300 },
      { row: 3, col: 4, height: 300 },
      { row: 4, col: 3, height: 300 },
    ],
    [
      { row: 1, col: 5, height: 300 },
      { row: 2, col: 3, height: 300 },
      { row: 4, col: 1, height: 300 },
    ],
  ];

  const thumbnailVariantAnimation = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1.1,
      transition: { delay: i * 0.1, duration: 0.4 },
    }),
    exit: { opacity: 0, scale: 1.3 },
  };

  useEffect(() => {
    if (thumbnails.length > 0) {
      const layout = layouts[Math.floor(Math.random() * layouts.length)];
      setPositions(layout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, thumbnails.length]);

  return (
    <div className="grid grid-cols-5 grid-rows-4 w-full h-full gap-20">
      {thumbnails.map((image: SanityImage, i: number) => {
        const position = positions[i] || { row: 1, col: 1 };
        return (
          <motion.div
            key={image.asset._ref}
            custom={i}
            style={{
              gridRow: position.row,
              gridColumn: position.col,
              height: `${position.height}px`,
              width: `auto`,
            }}
            variants={thumbnailVariantAnimation}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <UIImageSanity
              asset={image.asset}
              alt={`image thumbnail ${i}`}
              className="h-full w-auto"
            />
          </motion.div>
        );
      })}
    </div>
  );
}
