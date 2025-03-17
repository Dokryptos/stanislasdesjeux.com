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
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 200,
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
      },
      validation: (rule) =>
        rule.required().error(`Required to generate a page on the website`),
      description: `The slug is the url path of the project, Can use Generate button but try to keep it clean Without ponctuation(, . ; : ! ?) and Without (&é"'(-è_çà)=) (Obligation)`,
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      validation: (rule) =>
        rule.required().error(`Required to generate a page on the website`),
      description: "Image representing the Still Life theme on the homepage",
    }),
  ],
});
