"use client";
import { motion } from "framer-motion";
import { UIImageSanity } from "../image/sanity";
import { SanityImage } from "@/type/stillLife";
import { useState, useEffect } from "react";

interface StillLifeThumbnailGridProps {
  thumbnails: SanityImage[];
  projectId: string;
  isExiting: boolean;
}

export default function ThumbnailGrid({
  thumbnails,
  projectId,
  isExiting,
}: StillLifeThumbnailGridProps) {
  const [positions, setPositions] = useState<
    { top: string; left: string; height: string }[]
  >([]);

  const thumbnailVariantAnimation = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1.1,
      transition: { delay: i * 0.1, duration: 0.4 },
    }),
    exit: { opacity: 0, scale: 1.3, transition: { duration: 0.5 } },
  };

  const layouts = [
    [
      { top: "15%", left: "20%", height: "40%" },
      { top: "70%", left: "20%", height: "30%" },
      { top: "30%", left: "70%", height: "50%" },
    ],
    [
      { top: "10%", left: "70%", height: "40%" },
      { top: "20%", left: "10%", height: "55%" },
      { top: "60%", left: "80%", height: "35%" },
    ],
    [
      { top: "10%", left: "15%", height: "40%" },
      { top: "40%", left: "70%", height: "50%" },
      { top: "65%", left: "25%", height: "30%" },
    ],
    [
      { top: "50%", left: "5%", height: "40%" },
      { top: "10%", left: "40%", height: "35%" },
      { top: "40%", left: "70%", height: "50%" },
    ],
    [
      { top: "10%", left: "20%", height: "50%" },
      { top: "70%", left: "10%", height: "25%" },
      { top: "60%", left: "80%", height: "40%" },
    ],
    [
      { top: "20%", left: "80%", height: "30%" },
      { top: "70%", left: "90%", height: "20%" },
      { top: "30%", left: "10%", height: "45%" },
    ],
  ];

  const generateRandomLayout = () => {
    const randomLayout = layouts[Math.floor(Math.random() * layouts.length)];
    setPositions(randomLayout);
  };

  useEffect(() => {
    if (thumbnails.length === 3) {
      generateRandomLayout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, thumbnails.length]);
  return (
    <div className="relative w-full h-full">
      {thumbnails.map((image: SanityImage, i: number) => {
        const position = positions[i] || { top: "0%", left: "0%" };
        return (
          <motion.div
            key={image.asset._ref}
            custom={i}
            style={{
              position: "absolute",
              top: position.top,
              left: position.left,
              height: position.height,
              transform: "translate(-50%, -50%)",
            }}
            variants={thumbnailVariantAnimation}
            initial="hidden"
            animate="visible"
            exit={isExiting ? "exit" : undefined}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <UIImageSanity
              asset={image.asset}
              alt={`image thumbnail ${i}`}
              className=" w-full h-full object-contain"
            />
          </motion.div>
        );
      })}
    </div>
  );
}
