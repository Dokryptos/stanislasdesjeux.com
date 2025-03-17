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
      name: "title",
      title: "Title",
      type: "string",
      description: "Title representing the art theme on the homepage",
    }),
    defineField({
      name: "Thumbnail",
      title: "Thumbnail",
      type: "image",
      options: { hotspot: true },
      description: "Image representing the Still Life theme on the homepage",
    }),
  ],
});
