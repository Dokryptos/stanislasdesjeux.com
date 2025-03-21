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
  stillLifeAllProject: StillLife[];
}

export default function StillLifeSlugComponent({
  stillLifeCurrentSlug,
  stillLifeAllProject,
}: StillLifeSlugProps) {
  const stillLifeAllProjectArray = Array.isArray(stillLifeAllProject)
    ? stillLifeAllProject
    : [stillLifeAllProject];

  const router = useRouter();
  const currentProjectIndex = stillLifeAllProjectArray.findIndex(
    (p) => p.slug.current === stillLifeCurrentSlug?.slug.current
  );

  const stillLifeCurrentProject = stillLifeAllProjectArray[currentProjectIndex];
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  console.log(stillLifeCurrentProject);
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
        stillLifeAllProjectArray[
          (currentProjectIndex + 1) % stillLifeAllProjectArray.length
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
        stillLifeAllProjectArray[
          (currentImageIndex - 1 + stillLifeAllProjectArray.length) %
            stillLifeAllProjectArray.length
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
