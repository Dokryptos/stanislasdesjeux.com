import { UIImageSanity } from "@/components/ui/image/sanity";
import { SanityImage } from "@/type/art";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

interface artGallerySlug {
  artGallery: SanityImage[];
}

interface FloatingImage {
  id: string;
  top: number;
  left: number;
  url: string;
  width: string;
}

export default function ArtGallerySlug({ artGallery }: artGallerySlug) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [floatingImages, setFloatingImages] = useState<FloatingImage[]>([]);
  const maxVisible = 4;
  const spacingY = 300;

  const layoutTemplate = [
    { left: 10, topOffset: 100, width: "20%" },
    { left: 80, topOffset: 150, width: "90%" },
    { left: 45, topOffset: 300, width: "35%" },
    { left: 5, topOffset: 320, width: "30%" },
    { left: 65, topOffset: 400, width: "40%" },
    { left: 30, topOffset: 450, width: "40%" },
    { left: 80, topOffset: 500, width: "90%" },
    { left: 20, topOffset: 600, width: "15%" },
  ];
  const generateNewImage = (i: number): FloatingImage => {
    const url = artGallery[i % artGallery.length].asset._ref;
    const id = `${i}-${Date.now()}`;

    const template = layoutTemplate[i % layoutTemplate.length];
    const left = template.left;
    const top = i * spacingY;
    const width = template.width;
    return { id, url, top, left, width };
  };

  useEffect(() => {
    const initial = Array.from({ length: maxVisible * 50 }, (_, i) =>
      generateNewImage(i)
    );
    setFloatingImages(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [artGallery]);

  // Gestion du scroll infini
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const bottom = scrollTop + window.innerHeight; // Position du bas de la fenêtre

      if (bottom > floatingImages[floatingImages.length - 1]?.top - 500) {
        const next = Array.from({ length: maxVisible }, (_, i) =>
          generateNewImage(floatingImages.length + i)
        );
        setFloatingImages((prev) => [...prev, ...next]);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [floatingImages]);

  return (
    <div
      ref={containerRef}
      className="absolute top-0 left-0 w-full h-full overflow-visible pointer-events-none z-0"
    >
      <div
        style={{ height: `${floatingImages.length * spacingY}px` }}
        className="relative"
      >
        {floatingImages.map((img, index) => (
          <motion.div
            key={index}
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute z-0 pointer-events-none"
            style={{
              top: `${img.top}px`,
              left: `${img.left}%`,
            }}
          >
            <UIImageSanity
              asset={img.url}
              alt={`floating-${index}`}
              style={{ width: img.width }}
              className="w-auto object-cover"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
