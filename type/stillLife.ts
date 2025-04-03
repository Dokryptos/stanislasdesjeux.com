import type { Slug } from "@sanity/types";

export interface SanityImage {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _upload: any;
  asset: {
    _ref: string;
    _type: "reference";
  };
}
export interface SanityVideo {
  asset: {
    _ref: string;
    _type: "reference";
  };
  playbackId?: string;
}
export interface SanityGallery {
  image: SanityImage;
  imageTitle: string;
  video: SanityVideo;
}

export default interface StillLife {
  _id: string;
  title: string;
  shortTitle?: string;
  slug: Slug;
  categorie?: string;
  thumbnail: SanityImage[];
  gallery: SanityGallery[];
}
