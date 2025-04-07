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
}

export default function ArtGallerySlug({ artGallery }: artGallerySlug) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [floatingImages, setFloatingImages] = useState<FloatingImage[]>([]);
  const maxVisible = 4;
  const spacingY = 300;

  const columns = [15, 35, 55, 75]; // virtual columns in %

  const generateNewImage = (i: number): FloatingImage => {
    const url = artGallery[i % artGallery.length].asset._ref;
    const id = `${i}-${Date.now()}`;
    const left = columns[Math.floor(Math.random() * columns.length)];
    const top = i * spacingY;

    return { id, url, top, left };
  };

  useEffect(() => {
    const initial = Array.from({ length: maxVisible * 2 }, (_, i) =>
      generateNewImage(i)
    );
    setFloatingImages(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [artGallery]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      if (
        scrollTop + window.innerHeight >
        floatingImages.length * spacingY - 800
      ) {
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
            key={img.id}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
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
              className="w-auto h-[250px] object-cover"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
