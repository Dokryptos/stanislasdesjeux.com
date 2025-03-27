import { UIImageSanity } from "../ui/image/sanity";

interface ImageDisplayProps {
  imageRef: string;
  alt: string;
}

export default function ImageDisplay({ imageRef, alt }: ImageDisplayProps) {
  return (
    <div className="col-start-1 col-span-6 tablet:col-start-3 tablet:col-span-5 laptop:col-start-5 laptop:col-span-4 flex items-center w-full h-dvh pb-[60px] pt-[60px] laptop:pb-[150px] laptop:pt-[150px]">
      <UIImageSanity
        asset={imageRef}
        alt={alt}
        className="object-contain h-full w-full"
      />
    </div>
  );
}
