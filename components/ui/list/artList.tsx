"use client";
import { motion } from "framer-motion";
import ArtType from "@/type/art";

interface ArtListProps {
  data: ArtType;
  index: number;
  hoveredProject: number | null;
  setHoveredProject: (index: number | null) => void;
  isMobileTablet: boolean;
}
export default function ArtList({
  data,
  index,
  hoveredProject,
  setHoveredProject,
  isMobileTablet,
}: ArtListProps) {
  const listVariantAnimation = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: { delay: i * 0.2, duration: 0.5 },
    }),
  };

  return (
    <motion.div
      key={data._id}
      custom={index}
      initial="hidden"
      animate="visible"
      variants={listVariantAnimation}
      className="relative flex items-center"
      onMouseEnter={() => {
        setHoveredProject(index);
      }}
      onMouseLeave={() => setHoveredProject(null)}
    >
      <p className="text-[18px] desktop:text-[25px] laptop:text-[#CECECE] z-20 laptop:hover:text-black mix-blend-difference">
        {data.title}
      </p>
      {(hoveredProject === index || isMobileTablet) && (
        <div className="absolute left-full text-[10px] pl-1 z-20 desktop:p-2">
          {data?.gallery && data.gallery.length ? (
            data.gallery.length < 10 ? (
              <>(0{data.gallery.length})</>
            ) : (
              <>({data.gallery.length})</>
            )
          ) : (
            <>00</>
          )}
        </div>
      )}
    </motion.div>
  );
}
