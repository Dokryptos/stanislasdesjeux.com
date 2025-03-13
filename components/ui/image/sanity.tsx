import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { urlForImage } from "../../../sanity/lib/image";
import { HTMLProps } from "react";

export type UIImageSanityProps = {
  // linked asset from sanity
  asset: SanityImageSource;
  // alt for the image
  alt: string;
  // optional className
  className?: string;
} & HTMLProps<HTMLImageElement>;

export const UIImageSanity = ({
  asset,
  alt,
  className,
  ...props
}: UIImageSanityProps) => {
  if (!asset) return null;

  const imageUrl = urlForImage(asset).url();

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={imageUrl} className={className} alt={alt} {...props} />
  );
};
