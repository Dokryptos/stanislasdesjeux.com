import { SanityImage } from "@/type/art";

interface artGallerySlug {
  artGallery: SanityImage[];
}

export default function ArtLaptopGallerySlug({ artGallery }: artGallerySlug) {
  return (
    <div>
      {artGallery.map((gallery: SanityImage, i: number) => {
        return <div key={i}></div>;
      })}
    </div>
  );
}
