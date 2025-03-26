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
  console.log(stillLifeCurrentProject.gallery);
  // Preloading Img
  const preloadingKey = useMemo(() => {
    if (!stillLifeCurrentProject?.gallery) return;

    return stillLifeCurrentProject.gallery
      .map((asset) => {
        return urlForImage(asset.image.asset).url();
      })
      .join(".");
  }, [stillLifeCurrentProject?.gallery]);

  useEffect(() => {
    if (!stillLifeCurrentProject?.gallery) return;

    stillLifeCurrentProject.gallery.forEach((asset) => {
      const img = new Image();
      img.src = urlForImage(asset.image.asset).url();
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
          (currentProjectIndex - 1 + stillLifeAllProjectArray.length) %
            stillLifeAllProjectArray.length
        ];
      router.push(`/stillLife/${prevProject.slug.current}`);
    } else {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <div>
      <Grid className="w-full h-full overflow-hidden flex justify-center">
        <div className="col-start-1 col-span-6 tablet:col-start-3 tablet:col-span-5 laptop:col-start-5 laptop:col-span-4 flex items-center w-full h-dvh pb-[60px] pt-[60px]">
          <UIImageSanity
            asset={
              stillLifeCurrentProject.gallery[currentImageIndex].image.asset
                ._ref
            }
            alt={`Image ${currentImageIndex} du project ${stillLifeCurrentProject?.title}`}
            className="object-contain h-full w-full "
          />
        </div>
        <CarouselNavigation onPrev={prevImage} onNext={nextImage} />
      </Grid>
      <div className="text-[15px] absolute bottom-5 col-start-1 col-span-5 flex justify-between laptop:justify-center w-full pr-5 pl-5 tablet:pr-10 tablet:pl-10">
        <p className="block laptop:hidden">Prev</p>
        {stillLifeCurrentProject.title === "Motion" ||
        stillLifeCurrentProject.title === "Archives" ? (
          <p>
            {stillLifeCurrentProject.title} |{" "}
            {stillLifeCurrentProject.gallery[currentImageIndex].imageTitle}
          </p>
        ) : (
          <div className="flex items-center">
            {stillLifeCurrentProject.title} |{" "}
            {stillLifeCurrentProject.categorie}
            <p className="text-[10px] pl-1">
              ({stillLifeCurrentProject.gallery.length})
            </p>
          </div>
        )}
        <p className="block laptop:hidden">Next</p>
      </div>
    </div>
  );
}
