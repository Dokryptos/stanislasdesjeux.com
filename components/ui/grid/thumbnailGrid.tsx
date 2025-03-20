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

  const getRandomLayout = (length: number) => {
    const layout = [
      { row: 1, col: 1 },
      { row: 1, col: 2 },
      { row: 1, col: 3 },
      { row: 1, col: 4 },
      { row: 1, col: 5 },
      { row: 2, col: 1 },
      { row: 2, col: 2 },
      { row: 2, col: 3 },
      { row: 2, col: 4 },
      { row: 2, col: 5 },
    ];
    const shuffled = layout.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, length);
  };

  useEffect(() => {
    if (thumbnails.length > 0) {
      const layout = getRandomLayout(thumbnails.length);
      console.log(layout);
      setPositions(layout);
    }
  }, [projectId, thumbnails.length]);

  return (
    <div className="grid grid-cols-5 grid-rows-2 w-full h-full gap-20">
      {thumbnails.map((image: SanityImage, i: number) => {
        const position = positions[i] || { row: 1, col: 1 };
        return (
          <motion.div
            key={i}
            style={{
              gridRow: position.row,
              gridColumn: position.col,
            }}
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
