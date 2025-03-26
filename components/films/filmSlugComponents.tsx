"use client";
import filmType from "@/type/film";
import { useMemo, useEffect, useState } from "react";
import { urlForImage } from "@/sanity/lib/image";
import Grid from "../ui/grid";
import { useRouter } from "next/navigation";
import { UIImageSanity } from "../ui/image/sanity";
import CarouselNavigation from "../carousel/navigation";

interface FilmSlugProps {
  filmCurrentSlug: filmType;
  filmAllProject: filmType[];
}

export default function FilmSlugComponent({
  filmCurrentSlug,
  filmAllProject,
}: FilmSlugProps) {
  const filmAllProjectArray = Array.isArray(filmAllProject)
    ? filmAllProject
    : [filmAllProject];
  const currentProjectIndex = filmAllProjectArray.findIndex(
    (p) => p.slug.current === filmCurrentSlug?.slug.current
  );

  const router = useRouter();
  const filmCurrentProject = filmAllProjectArray[currentProjectIndex];
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  console.log(filmCurrentProject.gallery);

  // Preloading Img

  const preloadingKey = useMemo(() => {
    if (!filmCurrentProject?.gallery) return;

    return filmCurrentProject.gallery
      .map((asset) => {
        return urlForImage(asset).url();
      })
      .join(".");
  }, [filmCurrentProject?.gallery]);

  useEffect(() => {
    if (!filmCurrentProject?.gallery) return;

    filmCurrentProject.gallery.forEach((asset) => {
      const img = new Image();
      img.src = urlForImage(asset).url();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preloadingKey]);

  const nextImage = () => {
    if (currentImageIndex === filmCurrentProject.gallery.length - 1) {
      const nextProject =
        filmAllProjectArray[
          (currentProjectIndex + 1) % filmAllProjectArray.length
        ];
      router.push(`/films/${nextProject.slug.current}`);
    } else {
      setCurrentImageIndex(
        (currentImageIndex + 1) % filmCurrentProject.gallery.length
      );
    }
  };

  const prevImage = () => {
    if (currentImageIndex === 0) {
      const prevProject =
        filmAllProjectArray[
          (currentProjectIndex - 1 + filmAllProjectArray.length) %
            filmAllProjectArray.length
        ];
      router.push(`/films/${prevProject.slug.current}`);
    } else {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <div>
      <Grid className="w-full h-full overflow-hidden flex justify-center">
        <div className="col-start-1 col-span-6 tablet:col-start-3 tablet:col-span-5 laptop:col-start-5 laptop:col-span-4 flex items-center w-full h-dvh pb-[60px] pt-[60px]">
          <UIImageSanity
            asset={filmCurrentProject.gallery[currentImageIndex].asset._ref}
            alt={`Image ${currentImageIndex} du project ${filmCurrentProject?.title}`}
            className="object-contain h-full w-full "
          />
        </div>
        <CarouselNavigation onPrev={prevImage} onNext={nextImage} />
      </Grid>
      <div className="text-[15px] absolute bottom-5 col-start-1 col-span-5 flex justify-between laptop:justify-center w-full pr-5 pl-5 tablet:pr-10 tablet:pl-10">
        <p className="block laptop:hidden">Prev</p>
        <div className="flex items-center">
          <p className="pr-1">{filmCurrentProject.title}</p>
          <p>
            {filmCurrentProject.categorie !== null &&
              `| ${filmCurrentProject.categorie}`}
          </p>

          <p className="text-[10px] pl-1">
            ({filmCurrentProject.gallery.length})
          </p>
        </div>

        <p className="block laptop:hidden">Next</p>
      </div>
    </div>
  );
}
