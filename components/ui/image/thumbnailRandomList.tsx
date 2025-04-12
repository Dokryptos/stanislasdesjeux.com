"use client";
import { AnimatePresence, motion } from "framer-motion";
import { UIImageSanity } from "./sanity";
import { SanityImage } from "@/type/film";
import { useState, useEffect, useMemo } from "react";
import { urlForImage } from "@/sanity/lib/image";
import { getImageDimensions } from "@sanity/asset-utils";
interface StillLifeThumbnailGridProps {
  thumbnails: SanityImage[];
  projectId: string;
  isExiting: boolean;
}
interface Layout {
  top: string;
  left: string;
  height: string;
  width: string;
}

const getAdjustedLayout = (ref: string, layout: Layout): Layout => {
  const dims = getImageDimensions({ _ref: ref });
  const isLandscape = dims.width >= dims.height;

  return {
    ...layout,
    top: layout.top,
    left: layout.left,
    width: isLandscape ? layout.width : "auto",
    height: isLandscape ? "auto" : layout.height,
  };
};

export default function ThumbnailGrid({
  thumbnails,
  projectId,
  isExiting,
}: StillLifeThumbnailGridProps) {
  const [positions, setPositions] = useState<Layout[]>([]);
  const [lastLayoutIndex, setLastLayoutIndex] = useState<number | null>(null);

  const thumbnailVariantAnimation = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1.1,
      transition: { delay: 0.1 + i * 0.1, duration: 0.4 },
    }),
    exit: { opacity: 0, scale: 1.2, transition: { duration: 0.2 } },
  };

  const layouts: Layout[][] = [
    [
      { top: "45%", left: "10%", height: "40%", width: "30%" },
      { top: "0%", left: "60%", height: "30%", width: "20%" },
      { top: "70%", left: "75%", height: "30%", width: "22%" },
    ],
    [
      { top: "5%", left: "20%", height: "35%", width: "20%" },
      { top: "60%", left: "5%", height: "30%", width: "25%" },
      { top: "40%", left: "85%", height: "40%", width: "14%" },
    ],
    [
      { top: "10%", left: "5%", height: "35%", width: "25%" },
      { top: "30%", left: "70%", height: "45%", width: "18%" },
      { top: "70%", left: "25%", height: "25%", width: "22%" },
    ],
    [
      { top: "50%", left: "0%", height: "35%", width: "25%" },
      { top: "0%", left: "25%", height: "35%", width: "20%" },
      { top: "60%", left: "75%", height: "40%", width: "23%" },
    ],
    [
      { top: "70%", left: "2%", height: "25%", width: "20%" },
      { top: "0%", left: "25%", height: "40%", width: "20%" },
      { top: "40%", left: "70%", height: "45%", width: "22%" },
    ],
    [
      { top: "0%", left: "70%", height: "30%", width: "21%" },
      { top: "50%", left: "75%", height: "40%", width: "22%" },
      { top: "50%", left: "5%", height: "40%", width: "15%" },
    ],
  ];
  const generateRandomLayout = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * layouts.length);
    } while (newIndex === lastLayoutIndex);
    setLastLayoutIndex(newIndex);

    const newLayout = layouts[newIndex].map((layout, i) => {
      const ref = thumbnails[i]?.asset._ref;
      if (!ref) return layout;
      return getAdjustedLayout(ref, layout);
    });

    setPositions(newLayout);
  };

  useEffect(() => {
    if (thumbnails.length === 3) {
      generateRandomLayout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, thumbnails.length]);
  // Preloading Img
  const preloadingKey = useMemo(() => {
    if (!thumbnails) return;

    return thumbnails
      .map((asset) => {
        return urlForImage(asset).url();
      })
      .join(".");
  }, [thumbnails]);

  useEffect(() => {
    if (!thumbnails) return;

    thumbnails.forEach((asset) => {
      const img = new Image();
      img.src = urlForImage(asset).url();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preloadingKey]);
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
                width: position.width,
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
                className=" w-full h-full object-cover"
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
