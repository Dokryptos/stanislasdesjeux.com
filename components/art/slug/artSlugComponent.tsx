"use client";
import artType from "@/type/art";
import Grid from "../../ui/grid";
import ArtMobileGallerySlug from "./artMobileGallerySlug";
import { useState } from "react";
import ArtLaptopGallerySlug from "./artLaptopGallerySlug";
interface slugArtProps {
  artCurrentSlug: artType;
}
export default function SlugArt({ artCurrentSlug }: slugArtProps) {
  const [openInfo, setOpenInfo] = useState<boolean>(true);

  return (
    <div className="pt-[80px] ">
      <Grid className="">
        <div className="col-start-1 col-span-6 tablet:col-start-3 tablet:col-span-5 laptop:col-span-6  laptop:col-start-4 desktop:col-span-4 desktop:col-start-5 flex-col flex items-center">
          <div className="flex items-center relative">
            <p className="text-[18px]">{artCurrentSlug.title}</p>
            <p
              className="text-[7px] left-full absolute pl-[5px]"
              onClick={() => setOpenInfo(!openInfo)}
            >
              ({}info)
            </p>
          </div>
          <p className="text-[10px] whitespace-pre-wrap text-center pt-6">
            {artCurrentSlug.description}
          </p>
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
