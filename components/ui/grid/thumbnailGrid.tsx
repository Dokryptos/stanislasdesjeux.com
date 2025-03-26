"use client";
import { AnimatePresence, motion } from "framer-motion";
import { UIImageSanity } from "../image/sanity";
import { SanityImage } from "@/type/film";
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
    hidden: { opacity: 0, scale: 0.4 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1.1,
      transition: { delay: 0.3 + i * 0.1, duration: 0.4 },
    }),
    exit: { opacity: 0, scale: 1.2, transition: { duration: 0.2 } },
  };

  const layouts = [
    [
      { top: "45%", left: "10%", height: "40%" },
      { top: "0%", left: "60%", height: "30%" },
      { top: "70%", left: "75%", height: "30%" },
    ],
    [
      { top: "5%", left: "20%", height: "35%" },
      { top: "60%", left: "5%", height: "30%" },
      { top: "40%", left: "85%", height: "40%" },
    ],
    [
      { top: "10%", left: "5%", height: "35%" },
      { top: "30%", left: "70%", height: "45%" },
      { top: "70%", left: "25%", height: "25%" },
    ],
    [
      { top: "50%", left: "0%", height: "35%" },
      { top: "0%", left: "25%", height: "35%" },
      { top: "60%", left: "75%", height: "40%" },
    ],
    [
      { top: "70%", left: "2%", height: "25%" },
      { top: "0%", left: "25%", height: "40%" },
      { top: "40%", left: "70%", height: "45%" },
    ],
    [
      { top: "0%", left: "70%", height: "30%" },
      { top: "50%", left: "75%", height: "40%" },
      { top: "50%", left: "5%", height: "40%" },
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
      <AnimatePresence>
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
              exit="exit"
              transition={{ duration: 0.2, ease: "easeInOut" }}
              onAnimationComplete={() => console.log(isExiting)}
            >
              <UIImageSanity
                asset={image.asset}
                alt={`image thumbnail ${i}`}
                className=" w-full h-full object-contain"
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
