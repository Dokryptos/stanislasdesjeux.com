import { defineField, defineType, defineArrayMember } from "sanity";
import {
  orderRankField,
  orderRankOrdering,
} from "@sanity/orderable-document-list";

export const stillLifeType = defineType({
  name: "stillLife",
  title: "StillLife",
  type: "document",
  orderings: [orderRankOrdering],
  fieldsets: [
    {
      name: "misc",
      title: "Misc",
      options: {
        columns: 3,
      },
    },
  ],
  fields: [
    orderRankField({ type: "stillLife" }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) =>
        rule.required().error(`Required to generate a page on the website`),
      description: "The title of the project (Obligation)",
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
      name: "categorie",
      title: "Categorie",
      type: "string",
      description: "The categorie of the project if you want use one",
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "array",
      description:
        "Select all the image you want to render in the random list composition, in Webp for keep the place on the CMS and keep the CMS available with the free version (Obligation) with 1 image",
      validation: (rule) =>
        rule
          .required()
          .max(3)
          .error(
            `Required to generate a page on the website and maximum 3 image allowed for Thumnail`
          ),
      of: [
        defineArrayMember({
          type: "image",
          name: "image",
          options: {
            hotspot: true,
          },
        }),
      ],
    }),
    defineField({
      name: "gallery",
      title: "gallery",
      type: "array",
      description:
        "Select all the image you want to render, in Webp for keep the place on the CMS and keep the CMS available with the free version (Obligation) with 1 image",
      validation: (rule) =>
        rule.required().error(`Required to generate a page on the website`),
      of: [
        defineArrayMember({
          type: "object",
          name: "galleryItem",
          fields: [
            defineField({
              name: "media",
              title: "Image or Video",
              type: "array", // array pour contenir soit des images soit des vidéos
              of: [
                defineArrayMember({
                  type: "image",
                  name: "image",
                  options: { hotspot: true },
                }),
                // defineArrayMember({
                //   type: "mux.video",
                //   name: "video",
                // }),
              ],
            }),
            defineField({
              name: "imageTitle",
              title: "Title of the Image or Video",
              type: "string",
              description:
                "Title related to the media (Visible only for Motion & Archives).",
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const { document } = context;
                  if (
                    document?.title === "Motion" ||
                    document?.title === "Archives"
                  ) {
                    return value
                      ? true
                      : "Title is required for Motion and Archives.";
                  }
                  return true;
                }),
            }),
          ],
        }),
      ],
    }),
  ],
});
