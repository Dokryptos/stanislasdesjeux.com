import type { Slug } from "@sanity/types";

export interface SanityImage {
  asset: {
    _ref: string;
    _type: "reference";
  };
}

export default interface HomeImg {
  _id: string;
  title: string;
  slug: Slug;
  thumbnail: SanityImage;
}
