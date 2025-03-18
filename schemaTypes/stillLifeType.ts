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
      name: "motionContent",
      title: "Motion Content",
      type: "array",
      hidden: ({ document }) => document?.title !== "Motion", // Caché si la catégorie n'est pas "motion"
      of: [
        defineArrayMember({
          type: "object",
          name: "motionItem",
          fields: [
            // Titre spécifique pour chaque image/vidéo dans "motion"
            defineField({
              name: "motionTitle",
              title: "Motion Title",
              type: "string",
              validation: (rule) =>
                rule.required().error("Motion item title is required"),
            }),

            // Image associée (optionnelle, mais importante pour l'élément Motion)
            defineField({
              name: "Motionimage",
              title: "Motion Image",
              type: "image",
              description:
                "Select the image you want to render, in Webp for keep the place on the CMS and keep the CMS available with the free version with 1 image",
            }),
            // defineField({
            //   name: "videoMotion",
            //   title: "Video Motion",
            //   type: "mux.video",
            //   description:
            //     "Select the video you want to render, in Webp for keep the place on the CMS and keep the CMS available with the free version only 1 video",
            // }),
          ],
        }),
      ],
    }),
    defineField({
      name: "archivesContent",
      title: "Archives Content",
      type: "array",
      hidden: ({ document }) => document?.title !== "Archives", // Caché si la catégorie n'est pas "motion"
      of: [
        defineArrayMember({
          type: "object",
          name: "archives Item",
          fields: [
            // Title only for Archives
            defineField({
              name: "archivesTitle",
              title: "Archives Title",
              type: "string",
              validation: (rule) =>
                rule.required().error("Archives item title is required"),
            }),

            // Image only for Archives
            defineField({
              name: "archivesImage",
              title: "Archives Image",
              type: "image",
              description:
                "Select the image you want to render, in Webp for keep the place on the CMS and keep the CMS available with the free version with 1 image",
              validation: (rule) =>
                rule.required().error("Archives item Image is required"),
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: "gallery",
      title: "gallery",
      type: "array",
      hidden: ({ document }) =>
        document?.title == "Motion" || document?.title == "Archives", // hidden if is not archives or motion
      description:
        "Select all the image you want to render, in Webp for keep the place on the CMS and keep the CMS available with the free version (Obligation) with 1 image",
      validation: (rule) =>
        rule.required().error(`Required to generate a page on the website`),
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
  ],
});
