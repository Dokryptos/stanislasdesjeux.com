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
  const maxVisible = artGallery.length;

  const globalIndex = useRef<number>(0);
  const imageHeights = useRef<{ [key: string]: number }>({});

  const layoutTemplate = [
    { left: 10, top: 100, width: "15%" },
    { left: 80, top: 150, width: "90%" },
    { left: 45, top: 300, width: "35%" },
    { left: 5, top: 320, width: "25%" },
    { left: 65, top: 400, width: "40%" },
    { left: 30, top: 450, width: "20%" },
    { left: 80, top: 500, width: "85%" },
    { left: 30, top: 650, width: "20%" },
  ];

  const recalcPositions = (images: FloatingImage[]) => {
    let cumulativeTop = 0;
    return images.map((img) => {
      const height = imageHeights.current[img.id] || 300;
      const newImg = { ...img, top: cumulativeTop };
      cumulativeTop += height;
      return newImg;
    });
  };

  const generateNewImage = (): FloatingImage => {
    const i = globalIndex.current;
    const url = artGallery[i % artGallery.length].asset._ref;
    const id = `${i}-${Date.now()}`;
    const template = layoutTemplate[i % layoutTemplate.length];
    const top = 0;
    const width = template.width;
    globalIndex.current += 1;
    return { id, url, top, left: template.left, width };
  };

  useEffect(() => {
    const initial = Array.from({ length: maxVisible * 5 }, () =>
      generateNewImage()
    );
    setFloatingImages(recalcPositions(initial));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [artGallery]);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const bottom = scrollTop + window.innerHeight;
    if (
      floatingImages.length &&
      bottom > floatingImages[floatingImages.length - 1].top - 800
    ) {
      const next = Array.from({ length: artGallery.length }, () =>
        generateNewImage()
      );
      setFloatingImages((prev) => recalcPositions([...prev, ...next]));
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [floatingImages]);

  const handleImageLoad = (
    id: string,
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const height = e.currentTarget.offsetHeight;
    imageHeights.current[id] = height;
    setFloatingImages((prev) => recalcPositions(prev));
  };

  return (
    <div
      ref={containerRef}
      className="absolute top-0 left-0 w-full h-full overflow-visible pointer-events-none z-0"
    >
      <div
        style={{ height: `${floatingImages.length * 300}px` }}
        className="relative"
      >
        {floatingImages.map((img, index) => {
          return (
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
                onLoad={(e) => handleImageLoad(img.id, e)}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
