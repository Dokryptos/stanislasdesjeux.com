import { defineField, defineType } from "sanity";
import {
  orderRankField,
  orderRankOrdering,
} from "@sanity/orderable-document-list";

export const homepageType = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "homepage" }),
    defineField({
      name: "artImage",
      title: "Art Theme Image Homepage",
      type: "image",
      options: { hotspot: true },
      description: "Image representing the art theme on the homepage",
    }),
    defineField({
      name: "filmImage",
      title: "Film Theme Image Homepage",
      type: "image",
      options: { hotspot: true },
      description: "Image representing the film theme on the homepage",
    }),
    defineField({
      name: "stillLifeImage",
      title: "Still Life Theme Image Homepage",
      type: "image",
      options: { hotspot: true },
      description: "Image representing the Still Life theme on the homepage",
    }),
  ],
});
