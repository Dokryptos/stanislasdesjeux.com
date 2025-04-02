import { UIImageSanity } from "@/components/ui/image/sanity";
import { SanityImage } from "@/type/art";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface artGallerySlug {
  artGallery: SanityImage[];
}

export default function ArtGallerySlug({ artGallery }: artGallerySlug) {
  return (
    <div>
      {artGallery.map((gallery: SanityImage, i: number) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const ref = useRef<HTMLDivElement>(null);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { scrollYProgress } = useScroll({
          target: ref,
          offset: ["start start", "end start"],
        });

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const scale = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

        return (
          <motion.div
            key={i}
            ref={ref}
            style={{ scale }}
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
