import { SanityImage } from "@/type/art";
import { useEffect, useState, useRef } from "react";
import ImageItemDesktop from "./imageItemDesktop";

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
    { left: 10, width: "15%" },
    { left: 76, width: "20%" },
    { left: 36, width: "25%" },
    { left: 2, width: "25%" },
    { left: 65, width: "20%" },
    { left: 30, width: "20%" },
    { left: 70, width: "15%" },
    { left: 30, width: "20%" },
  ];

  const recalcPositions = (images: FloatingImage[]) => {
    let cumulativeTop = 0;
    return images.map((img) => {
      const height = 350;
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
        {floatingImages.map((img) => (
          <ImageItemDesktop
            key={img.id}
            img={img}
            onImageLoad={handleImageLoad}
          />
        ))}
      </div>
    </div>
  );
}
