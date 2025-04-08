import { SanityImage } from "@/type/art";
import { useRef, useState, useEffect } from "react";
import ImageItemMobile from "./imageItemMobile";

interface artGallerySlug {
  artGallery: SanityImage[];
}

export default function ArtGallerySlug({ artGallery }: artGallerySlug) {
  const [imagesGallery, setImagesGallery] = useState<SanityImage[]>([]);
  // Un compteur pour parcourir la galerie en boucle (si besoin)
  const globalIndex = useRef<number>(0);
  // Ref pour détecter quand on doit charger plus d'images
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Charge un ensemble initial d'images
  useEffect(() => {
    const initialImages: SanityImage[] = [];
    // Par exemple on charge autant d'images que dans artGallery
    for (let i = 0; i < artGallery.length; i++) {
      initialImages.push(artGallery[globalIndex.current % artGallery.length]);
      globalIndex.current++;
    }
    setImagesGallery(initialImages);
  }, [artGallery]);

  // Ajoute des images au scroll via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          console.log("trigger visible");
          // On ajoute 5 images de plus dès que le bas est atteint
          const newImages: SanityImage[] = [];
          for (let i = 0; i < 5; i++) {
            newImages.push(artGallery[globalIndex.current % artGallery.length]);
            globalIndex.current++;
          }
          setImagesGallery((prev) => [...prev, ...newImages]);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px 200px 0px" }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
    return () => {
      if (loadMoreRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [artGallery]);

  return (
    <div>
      {imagesGallery.map((gallery: SanityImage, i: number) => {
        return (
          <ImageItemMobile
            key={`${i}-${gallery.asset._ref}`}
            asset={gallery.asset}
            alt={`Image ${i}`}
          />
        );
      })}
      <div ref={loadMoreRef} className="h-10" />
    </div>
  );
}
