import createImageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { dataset, projectId } from "../env";

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset });

export const urlForImage = (source: SanityImageSource) =>
  builder.image(source).width(1600).fit("max").auto("format").quality(75);
