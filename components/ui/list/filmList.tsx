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
      transition: { delay: i * 0.12, duration: 0.5 },
    }),
  };

  return (
    <motion.div
      key={data._id}
      custom={index}
      initial="hidden"
      animate="visible"
      variants={listVariantAnimation}
      className="relative flex items-center group"
      onMouseEnter={() => {
        setHoveredProject(index);
      }}
      onMouseLeave={() => setHoveredProject(null)}
    >
      <p className="text-[18px] desktop:text-[25px] laptop:text-[#3A3A3A] z-20 laptop:group-hover:text-white ">
        {data.title}
      </p>
    </motion.div>
  );
}
