"use client";
import artType from "@/type/art";
import Grid from "../../ui/grid";
import ArtMobileGallerySlug from "./artMobileGallerySlug";
import { useState } from "react";
import ArtLaptopGallerySlug from "./artLaptopGallerySlug";
import { AnimatePresence, motion } from "framer-motion";
interface slugArtProps {
  artCurrentSlug: artType;
}
export default function SlugArt({ artCurrentSlug }: slugArtProps) {
  const [openInfo, setOpenInfo] = useState<boolean>(true);
  const toggleDescription = () => {
    setOpenInfo(!openInfo);
  };
  const infoButton = openInfo ? "-" : "+";
  return (
    <div className="pt-[80px] tablet:pt-[0px]">
      <Grid className="tablet:mix-blend-difference tablet:text-white tablet:fixed tablet:w-full">
        <div className="col-start-1 col-span-6 tablet:col-start-3 tablet:col-span-5 laptop:col-span-6 laptop:col-start-4 desktop:col-span-4 desktop:col-start-5 flex-col flex items-center tablet:justify-center h-auto tablet:h-dvh">
          <div className="flex items-center relative ">
            <p className="text-[18px]">{artCurrentSlug.title}</p>
            <p
              className="text-[7px] left-full absolute pl-[5px] whitespace-nowrap cursor-pointer"
              onClick={toggleDescription}
            >
              ({infoButton}info)
            </p>
          </div>
          <AnimatePresence>
            {openInfo && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <p className="text-[12px] whitespace-pre-wrap text-center pt-6 z-40">
                  {artCurrentSlug.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Grid>
      <div className="block tablet:hidden">
        <ArtMobileGallerySlug artGallery={artCurrentSlug.gallery} />
      </div>
      <div className="hidden tablet:block">
        <ArtLaptopGallerySlug artGallery={artCurrentSlug.gallery} />
      </div>
    </div>
  );
}
