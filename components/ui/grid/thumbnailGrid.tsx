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
  const [positions, setPositions] = useState<{ row: number; col: number }[]>(
    []
  );

  const layouts = [
    [
      { row: 1, col: 2 },
      { row: 2, col: 4 },
      { row: 4, col: 3 },
    ],
    [
      { row: 2, col: 1 },
      { row: 3, col: 3 },
      { row: 4, col: 5 },
    ],
    [
      { row: 1, col: 4 },
      { row: 3, col: 2 },
      { row: 4, col: 1 },
    ],
    [
      { row: 2, col: 3 },
      { row: 3, col: 5 },
      { row: 4, col: 2 },
    ],
    [
      { row: 1, col: 1 },
      { row: 2, col: 5 },
      { row: 3, col: 4 },
    ],
    [
      { row: 1, col: 3 },
      { row: 3, col: 1 },
      { row: 4, col: 5 },
    ],
    [
      { row: 2, col: 2 },
      { row: 3, col: 4 },
      { row: 4, col: 3 },
    ],
    [
      { row: 1, col: 5 },
      { row: 2, col: 3 },
      { row: 4, col: 1 },
    ],
  ];

  useEffect(() => {
    if (thumbnails.length > 0) {
      const layout = layouts[Math.floor(Math.random() * layouts.length)];
      console.log(layout);
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
            key={i}
            style={{
              gridRow: position.row,
              gridColumn: position.col,
            }}
            initial={{ opacity: 0, scale: 0.8, x: -50, y: -50 }}
            animate={{ opacity: 1, scale: 1.1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 1.4, x: 50 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <UIImageSanity
              asset={image.asset}
              alt={`image thumbnail ${i}`}
              className="h-max-[300px] w-auto"
            />
          </motion.div>
        );
      })}
    </div>
  );
}
