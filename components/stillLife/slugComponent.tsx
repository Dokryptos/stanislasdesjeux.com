"use client";
import StillLife from "@/type/stillLife";
import { useMemo, useEffect, useState } from "react";
import { urlForImage } from "@/sanity/lib/image";
import Grid from "../ui/grid";
import { useRouter } from "next/navigation";
import { UIImageSanity } from "../ui/image/sanity";
import CarouselNavigation from "../carousel/navigation";

interface StillLifeSlugProps {
  stillLifeCurrentSlug: StillLife;
  stillLifeProjectArray: StillLife[];
}

export default function StillLifeSlugComponent({
  stillLifeCurrentSlug,
  stillLifeProjectArray,
}: StillLifeSlugProps) {
  //   const projectsArray = Array.isArray(stillLifeProjectArray)
  //     ? stillLifeProjectArray
  //     : [stillLifeProjectArray];

  const router = useRouter();
  const currentProjectIndex = stillLifeProjectArray.findIndex(
    (p) => p.slug.current === stillLifeCurrentSlug?.slug.current
  );

  const stillLifeCurrentProject = stillLifeProjectArray[currentProjectIndex];
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  // Preloading Img
  const preloadingKey = useMemo(() => {
    if (!stillLifeCurrentProject?.gallery) return;

    return stillLifeCurrentProject.gallery
      .map((asset) => {
        return urlForImage(asset).url();
      })
      .join(".");
  }, [stillLifeCurrentProject?.gallery]);

  useEffect(() => {
    if (!stillLifeCurrentProject?.gallery) return;

    stillLifeCurrentProject.gallery.forEach((asset) => {
      const img = new Image();
      img.src = urlForImage(asset).url();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preloadingKey]);

  const nextImage = () => {
    if (currentImageIndex === stillLifeCurrentProject.gallery.length - 1) {
      const nextProject =
        stillLifeProjectArray[
          (currentProjectIndex + 1) % stillLifeProjectArray.length
        ];
      router.push(`/stillLife/${nextProject.slug.current}`);
    } else {
      setCurrentImageIndex(
        (currentImageIndex + 1) % stillLifeCurrentProject.gallery.length
      );
    }
  };

  const prevImage = () => {
    if (currentImageIndex === 0) {
      const prevProject =
        stillLifeProjectArray[
          (currentImageIndex - 1 + stillLifeProjectArray.length) %
            stillLifeProjectArray.length
        ];
      router.push(`/stillLife/${prevProject.slug.current}`);
    } else {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <div>
      <Grid className="w-full h-dvh overflow-hidden">
        <div>
          <UIImageSanity
            asset={stillLifeCurrentProject?.gallery[currentImageIndex].asset}
            alt={`Image ${currentImageIndex} du project ${stillLifeCurrentProject?.title}`}
          />
        </div>
        <CarouselNavigation onPrev={prevImage} onNext={nextImage} />
        <div></div>
      </Grid>
    </div>
  );
}
