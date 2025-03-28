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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setScales(() =>
          entries.map((entry) => (entry.boundingClientRect.top <= 0 ? 0.6 : 1))
        );
      },
      { threshold: 0 } // Déclenchement dès que l'image touche le haut
    );

    imageRefs.current.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect(); // Nettoyage
  }, []);

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
            className="pl-5 pr-5 pt-10"
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <UIImageSanity asset={gallery.asset} alt={``} />
          </motion.div>
        );
      })}
    </div>
  );
}
