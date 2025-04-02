import { UIImageSanity } from "@/components/ui/image/sanity";
import { SanityImage } from "@/type/art";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

interface artGallerySlug {
  artGallery: SanityImage[];
}

export default function ArtGallerySlug({ artGallery }: artGallerySlug) {
  const [scales, setScales] = useState<number[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <div>
      {artGallery.map((gallery: SanityImage, i: number) => {
        return (
          <motion.div
            key={i}
            ref={(el) => {
              imageRefs.current[i] = el;
            }}
            style={{ scale: scales[i] || 1 }}
            className="p-5"
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <UIImageSanity asset={gallery.asset} alt={``} />
          </motion.div>
        );
      })}
    </div>
  );
}
