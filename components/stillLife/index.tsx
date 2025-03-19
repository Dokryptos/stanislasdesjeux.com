"use client";
import StillLifeType from "@/type/stillLife";
import Link from "next/link";
import { motion } from "framer-motion";
interface StillLifeDataProps {
  stillLifeData: StillLifeType[];
}

export default function StillLifeComponent({
  stillLifeData,
}: StillLifeDataProps) {
  const listVariantAnimation = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: { delay: i * 0.2, duration: 0.5 },
    }),
  };
  console.log(stillLifeData);
  return (
    <div>
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
            >
              <div className="hidden text-[7px] laptop:pr-1 desktop:pr-2">
                {data?.categorie}
              </div>
              <Link href={`/stillLife/${data.slug.current}`}>
                <p className="text-[18px] desktop:text-[25px] laptop:text-[#CECECE] laptop:hover:text-black laptop:hover:italic">
                  {data.title}
                </p>
              </Link>
              <div className="text-[7px] pl-1 desktop:p-2">
                {data.gallery && data.gallery.length < 10 ? (
                  <>0{data.gallery.length}</>
                ) : (
                  <>{data.gallery.length}</>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
