"use client";
import { motion } from "framer-motion";
import FilmType from "@/type/film";

interface FilmListProps {
  data: FilmType;
  index: number;
  setHoveredProject: (index: number | null) => void;
}
export default function FilmList({
  data,
  index,
  setHoveredProject,
}: FilmListProps) {
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
    </motion.div>
  );
}
