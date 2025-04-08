import { UIImageSanity } from "@/components/ui/image/sanity";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ImageItemMobileProps {
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt: string;
  className?: string;
}

export default function ImageItemMobile({
  asset,
  alt,
  className = "w-full object-cover",
}: ImageItemMobileProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  return (
    <motion.div
      ref={ref}
      style={{ scale, transformOrigin: "center" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="p-5"
    >
      <UIImageSanity asset={asset} alt={alt} className={className} />
    </motion.div>
  );
}
