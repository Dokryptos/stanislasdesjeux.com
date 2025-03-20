"use client";
import StillLifeType, { SanityImage } from "@/type/stillLife";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { UIImageSanity } from "../ui/image/sanity";

interface StillLifeDataProps {
  stillLifeData: StillLifeType[];
}

export default function StillLifeComponent({
  stillLifeData,
}: StillLifeDataProps) {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [positions, setPositions] = useState<{ top: string; left: string }[]>(
    []
  );

  const handleImagePosition = () => {
    const newPositions = Array.from({ length: 3 }).map(() => ({
      top: Math.random() * 100 + "%",
      left: Math.random() * 100 + "%",
    }));
    setPositions(newPositions);
  };

  const listVariantAnimation = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: { delay: i * 0.2, duration: 0.5 },
    }),
  };

  return (
    <div className="flex flex-col justify-center items-center h-dvh">
      {stillLifeData.map((data: StillLifeType, i: number) => {
        return (
          <motion.div
            key={data._id}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={listVariantAnimation}
            className="flex items-center"
            onMouseEnter={() => {
              setHoveredProject(i);
              handleImagePosition();
            }}
            onMouseLeave={() => setHoveredProject(null)}
          >
            {hoveredProject === i && (
              <div className="text-[7px] laptop:pr-1 z-20 desktop:pr-2">
                {data?.categorie}
              </div>
            )}
            <Link href={`/stillLife/${data.slug.current}`}>
              <p className="text-[18px] desktop:text-[25px] laptop:text-[#CECECE] z-20 laptop:hover:text-black laptop:hover:italic">
                {data.title}
              </p>
            </Link>
            {hoveredProject === i && (
              <div className="text-[7px] pl-1 z-20 desktop:p-2">
                {data?.gallery && data.gallery.length ? (
                  data.gallery.length <= 10 ? (
                    <>0{data.gallery.length}</>
                  ) : (
                    <>{data.gallery.length}</>
                  )
                ) : (
                  <>00</>
                )}
              </div>
            )}
            {hoveredProject === i &&
              data?.thumbnail.map((image: SanityImage, i: number) => (
                <motion.div
                  key={image.asset._ref}
                  style={{
                    left: positions[i]?.left,
                    top: positions[i].top,
                    position: "absolute",
                  }}
                  className="h-[300px] w-auto"
                >
                  <UIImageSanity
                    asset={image.asset}
                    alt={`image thumbnail ${data.title} ${i}`}
                    className="h-[300px] w-auto"
                  />
                </motion.div>
              ))}
          </motion.div>
        );
      })}
    </div>
  );
}
