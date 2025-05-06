"use client";
import { useMemo, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { urlForImage } from "@/sanity/lib/image";
import Grid from "../ui/grid";
import CarouselNavigation from "../carousel/navigation";
import ImageDisplay from "./imageDisplay";
import VideoDisplay from "./videoDisplay";

interface ProjectType {
  _id: string;
  title: string;
  slug: { current: string };
  gallery: {
    video?: {
      asset: {
        playbackId: string;
        data: object;
      };
    };
    image?: { asset: { _ref: string } };
    imageTitle?: string;
  }[];
  categorie?: string;
}

interface ProjectComponentProps {
  projectCurrent: ProjectType;
  projectAll: ProjectType[];
  typeList: "stillLife" | "films";
}

export default function ProjectSlugComponent({
  projectCurrent,
  projectAll,
  typeList,
}: ProjectComponentProps) {
  const router = useRouter();

  useEffect(() => {
    const disableRightClick = (e: MouseEvent) => e.preventDefault();
    document.addEventListener("contextmenu", disableRightClick);
    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
    };
  }, []);

  const currentIndex = projectAll.findIndex(
    (p) => p.slug.current === projectCurrent.slug.current
  );

  const [currentMediaIndex, setCurrentMediaIndex] = useState<number>(0);

  const preloadingKey = useMemo(() => {
    if (!projectCurrent?.gallery) return;

    return projectCurrent.gallery
      .map((asset) => {
        if (asset.image) {
          return urlForImage(asset.image.asset._ref).url();
        }
        return asset.video;
      })
      .join(".");
  }, [projectCurrent?.gallery]);

  useEffect(() => {
    if (!projectCurrent?.gallery) return;

    projectCurrent.gallery.forEach((asset) => {
      if (asset.image) {
        const img = new Image();
        img.src = urlForImage(asset.image.asset._ref).url();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preloadingKey]);

  const nextMedia = () => {
    if (currentMediaIndex === projectCurrent.gallery.length - 1) {
      const nextProject = projectAll[(currentIndex + 1) % projectAll.length];
      router.push(`/${typeList}/${nextProject.slug.current}`);
    } else {
      setCurrentMediaIndex(
        (currentMediaIndex + 1) % projectCurrent.gallery.length
      );
    }
  };

  const prevMedia = () => {
    if (currentMediaIndex === 0) {
      const prevProject =
        projectAll[(currentIndex - 1 + projectAll.length) % projectAll.length];

      router.push(`/${typeList}/${prevProject.slug.current}`);
    } else {
      setCurrentMediaIndex(currentMediaIndex - 1);
    }
  };

  const currentMedia = projectCurrent.gallery[currentMediaIndex];

  return (
    <div>
      <Grid className="w-full h-full overflow-hidden flex justify-center">
        {currentMedia?.image ? (
          <ImageDisplay
            imageRef={currentMedia.image.asset._ref}
            alt={`Image ${currentMediaIndex} du projet ${projectCurrent.title}`}
          />
        ) : (
          currentMedia?.video && (
            <VideoDisplay
              video={currentMedia?.video}
              key={currentMedia?.video.asset.playbackId}
              title={`Vidéo ${currentMediaIndex} du projet ${projectCurrent.title}`}
            />
          )
        )}
        <CarouselNavigation onPrev={prevMedia} onNext={nextMedia} />
      </Grid>

      <div className="text-[15px] absolute bottom-5 col-start-1 col-span-5 flex justify-between laptop:justify-center w-full pr-5 pl-5 tablet:pr-10 tablet:pl-10">
        <p className="block laptop:hidden">Prev</p>
        <div className="flex items-center">
          <p className="pr-1">{projectCurrent.title}</p>
          {projectCurrent.title === "Motion" ||
          projectCurrent.title === "Archives" ? (
            <p>{`| ${projectCurrent.gallery[currentMediaIndex]?.imageTitle}`}</p>
          ) : (
            <p>
              {projectCurrent.categorie ? `| ${projectCurrent.categorie}` : ""}
            </p>
          )}
          <p className="text-[10px] pl-1">({projectCurrent.gallery.length})</p>
        </div>

        <p className="block laptop:hidden">Next</p>
      </div>
    </div>
  );
}
