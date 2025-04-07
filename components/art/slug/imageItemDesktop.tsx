import { UIImageSanity } from "@/components/ui/image/sanity";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface FloatingImage {
  id: string;
  top: number;
  left: number;
  url: string;
  width: string;
}

interface ImageItemProps {
  img: FloatingImage;
  onImageLoad: (
    id: string,
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => void;
}

const ImageItemDesktop = ({ img, onImageLoad }: ImageItemProps) => {
  const ref = useRef<HTMLDivElement>(null);

  // Utilisation de useScroll sur ce conteneur
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Transformation de la progression du scroll en échelle
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  return (
    <motion.div
      ref={ref}
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="absolute z-0 pointer-events-none"
      style={{
        top: `${img.top}px`,
        left: `${img.left}%`,
        scale,
        transformOrigin: "center center",
      }}
    >
      <UIImageSanity
        asset={img.url}
        alt={`floating-${img.id}`}
        style={{ width: img.width }}
        className="w-auto object-cover"
        onLoad={(e) => onImageLoad(img.id, e)}
      />
    </motion.div>
  );
};

export default ImageItemDesktop;
